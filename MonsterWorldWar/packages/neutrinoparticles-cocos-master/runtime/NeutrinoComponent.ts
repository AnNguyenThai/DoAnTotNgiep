import NeutrinoSettings from './NeutrinoSettings';
import NeutrinoContext from './NeutrinoContext';

const {ccclass, property} = cc._decorator;

// Cached temporary values.
const _gnwprMat0 = new cc.Mat4();
const _gnwprMat1 = new cc.Mat4();
const _gnwprQuat0 = new cc.Quat();
const _gnwprVec0 = new cc.Vec3();
const _uWPM = new cc.Mat4();
const _nwpos = [0, 0, 0, 0];
const _nwrot = [0, 0, 0, 0];

function propertyValueToNpValue(value: number | cc.Vec2 | cc.Vec3) {
    if (value instanceof cc.Vec2) {
        return [value.x, value.y];
    } else if (value instanceof cc.Vec3) {
        return [value.x, value.y, value.z];
    } else {
        return value;
    }
}

@ccclass
export default abstract class NeutrinoComponent extends cc.RenderComponent {
    context: NeutrinoContext = null;

    private _neutrinoEffectModel = null;
    private _neutrinoEffect = null;
    private _spriteFrames: cc.SpriteFrame[] = null;
    private _emitterPropsOnStart = {};
    private _texturesRemap = null;
    private _waitingForContext = false;

    private _resetInProgress = false;
    private _numTexturesLoading: number = 0;
    private _errorOnLoad = false;

    private _worldScale = new cc.Vec3();
    private _destructed = false;

    private _settings: NeutrinoSettings = null;

    @property
    private _serialized = false;

    @property
    private _worldParent: cc.Node = null;

    @property({
        type: cc.Node,
        tooltip: `This object defines world coordinate system for the effect. If null, the value is taken from NeutrinoSettings component of 'Canvas' object in the root of the scene. To avoid unexpected behavior, it has to be one of parent objects of the effect in scene hierarchy.`
    })
    get worldParent() {
        return this._worldParent;
    }

    set worldParent(value) {
        this._worldParent = value;
        this._waitForContextAndReset();
    }

    @property
    private _texturesPrefixPath = '';

    @property({
        tooltip: `The prefix is added to the textures' paths of the effect.`
    })
    get texturesPrefixPath() {
        return this._texturesPrefixPath;
    }

    set texturesPrefixPath(value) {
        this._texturesPrefixPath = value;
        this._waitForContextAndReset();

        if (CC_EDITOR) {
            const settings = NeutrinoSettings.instance();
            if (settings) {
                settings.defaultTexturesPrefixPath = value;
            }
        }
    }

    @property(cc.SpriteAtlas)
    private _spriteAtlas: cc.SpriteAtlas =  null;

    @property({
        type: cc.SpriteAtlas,
        tooltip: `A custom atlas for textures. Use this property if you want to use textures from manually created atlas.`
    })
    get spriteAtlas() {
        return this._spriteAtlas;
    }

    set spriteAtlas(value) {
        this._spriteAtlas = value;
        this._waitForContextAndReset();

        if (CC_EDITOR) {
            const settings = NeutrinoSettings.instance();
            if (settings) {
                settings.defaultSpriteAtlas = value;
            }
        }
    }

    @property
    private _pausedOnStart = false;

    @property({
        tooltip: `Effect is paused after created. Presimulated particles are fozen. Nothing is simulated, nothing is generated.`   
    })
    get pausedOnStart() {
        return this._pausedOnStart;
    }
    
    set pausedOnStart(value) {
        this._pausedOnStart = value;
        this._waitForContextAndReset();
    }

    @property
    _pausedGeneratorsOnStart = false;

    @property({
        tooltip:`Generating of new particles is paused on the start. Presimulated particles are simulated, nothing new is generated.`
    })
    get pausedGeneratorsOnStart() {
        return this._pausedGeneratorsOnStart;
    }

    set pausedGeneratorsOnStart(value) {
        this._pausedGeneratorsOnStart = value;
        this._waitForContextAndReset();
    }

    // If true, the component will be destroyed when the effect is empty.
    @property({
        tooltip: `Destroys the component when no active particles left.`
    })
    destroyWhenEmpty = false;

    // If true, the node of the component will be destroyed when the effect is empty.
    @property({
        tooltip: `Destroys the node of the component when no active particles left.`
    })
    destroyNodeWhenEmpty = false;

    get worldScale() {
        return this._worldScale;
    }

    get neutrinoEffect() {
        return this._neutrinoEffect;
    }

    resetInEditor() {
        this._waitForContextAndReset();
    }

    onLoad() {
        this.context = NeutrinoContext.instance();
        this.context.ensureNoiseTextureIsGenerated();

        if (!this._serialized) {
            this._serialized = true;
            const settings = this._getSettings();

            if (settings) {
                this._texturesPrefixPath = settings.defaultTexturesPrefixPath;
                this._spriteAtlas = settings.defaultSpriteAtlas;
            }
        }

        this._waitForContextAndReset();
    }

    onDestroy() {
        if (this._spriteFrames) {
            this._spriteFrames.forEach((spriteFrame) => {
                if (spriteFrame) {
                    spriteFrame.decRef();
                }
            });
            
            this._spriteFrames.length = 0;
        }

        if (this._waitingForContext) {
            this.context.off('loaded', this._reset, this);
        }

        this._destructed = true;
    }

    update(dt: number) {
        if (!this._neutrinoEffect) {
            return;
        }

        this._getNeutrinoWorldPositionRotation(_nwpos, _nwrot);
        this._neutrinoEffect.update(dt, _nwpos, _nwrot);

        const worldParent = this._getWorldParent();
        if (worldParent) {
            worldParent.getWorldMatrix(_uWPM);

            this.materials.forEach((material) => {
                material.setProperty('worldParentMat', _uWPM);
            });
        } else {
            this.materials.forEach((material) => {
                material.setProperty('worldParentMat', cc.Mat4.IDENTITY);
            });
        }

        if (!CC_EDITOR && !this.paused()) {
            if (this.destroyWhenEmpty || this.destroyNodeWhenEmpty) {
                const empty = (this.getNumParticles() === 0);
                if (empty) {
                    if (this.destroyNodeWhenEmpty) {
                        this.node.destroy();
                    } else {
                        this.destroy();
                    }
                }
            }
        }
    }

    /**
     * The component is fully loaded and ready to render.
     * @method ready
     * @return {Boolean} - true if the component is ready to render.
     */
    ready() : boolean {
        return this._neutrinoEffect !== null;
    }

    /**
     * Restarts the effect. Current position and rotation of the node is used
     * to start simulating the effect. You can provide pause options for generators and the effect itself.
     * @param {Object} [options={}] Options
     * @param {boolean} [options.generatorsPaused] Effect is restarted with paused generators. By
     * default result of 'generatorsPaused()' used.
     * @param {boolean} [options.paused = false] Effect is restarted and paused. Non of particles is generated
     * or simulated. By default result of 'paused()' used.
     * @method restart
     */   
    restart(options: {generatorsPaused:boolean, paused: boolean} | null = null) {
        options = Object.assign({
			generatorsPaused: this.generatorsPaused(),
			paused: this.paused()
		}, options ? options : {});

        if (this.ready()) {
            this._getNeutrinoWorldPositionRotation(_nwpos, _nwrot);
            this._neutrinoEffect.restart(_nwpos, _nwrot, options);
        } else {
            this._pausedGeneratorsOnStart = options.generatorsPaused;
            this._pausedOnStart = options.paused;
        }
    }

    /**
     * Effect jumps to the current position and rotation of the node without trail
     * effect. Usually used as subsequent call of changing position and rotation.
     * In other words teleports the effect to current position of the node.
     * @method resetPositionRotation
     */
    resetPositionRotation() {
        if (!this.ready()) {
            return;
        }

        this._getNeutrinoWorldPositionRotation(_nwpos, _nwrot);
        this._neutrinoEffect.resetPosition(_nwpos, _nwrot);
    }

    /**
     * Pauses the effect. If effect is not loaded yet, it will be started paused.
     * All particles are frozen when the effect is paused.
     * @method pause
     */
    pause() {
        if (this.ready()) {
            this._neutrinoEffect.pauseAllEmitters();
        }
        this._pausedOnStart = true;
    }

    /**
     * Unpauses the effect. If the effect is not loaded yet, is will be started unpaused.
     * All particles continues to simulate when the effect is unpaused.
     * @method unpause
     */
    unpause() {
        if (this.ready()) {
            this._neutrinoEffect.unpauseAllEmitters();
        }
        this._pausedOnStart = false;
    }

    /**
     * Returns true if the effect is paused.
     * @method paused
     * @return {Boolean} - true, if the effect is paused.
     */
    paused() : boolean {
        if (this.ready()) {
            return this._neutrinoEffect.areAllEmittersPaused();
        } else {
            return this._pausedOnStart;
        }
    }

    /**
     * Pauses generators. If the effect is not loaded yet, it will be started with paused
     * generators. When generators are paused, no new particles are created, however
     * all created particles continue to simulate.
     * @method pauseGenerators
     */
    pauseGenerators() {
        if (this.ready()) {
            this._neutrinoEffect.pauseGeneratorsInAllEmitters();
        }
        this._pausedGeneratorsOnStart = true;
    }

    /**
     * Unpauses generators. If the effect is not loaded yet, it will be started with unpaused
     * generators. When generators are unpaused, they generate new particles when
     * necessary. 
     * @method unpauseGenerators
     */
    unpauseGenerators() {
        if (this.ready()) {
            this._neutrinoEffect.unpauseGeneratorsInAllEmitters();
        }
        this._pausedGeneratorsOnStart = false;
    }

    /**
     * Returns true, if generators in the effect are paused.
     * @method generatorsPaused
     * @return {Boolean} - true, if generators are paused
     */
    generatorsPaused() : boolean {
        if (this.ready()) {
            return this._neutrinoEffect.areGeneratorsInAllEmittersPaused();
        } else {
            return this._pausedGeneratorsOnStart;
        }
    }

    /**
     * Sets emitter property in all standalone emitters in the effect.
     * @method setPropertyInAllEmitters
     * @param {string} name Name of the property to change.
     * @param {Number | cc.Vec2 | cc.Vec3} value Value of the property.
     * @example
     * effect.setPropertyInAllEmitters('Color', new cc.Vec3(1, 0, 0));
     */
    setPropertyInAllEmitters(name: string, value: number | cc.Vec2 | cc.Vec3) {
        const npValue = propertyValueToNpValue(value);

        if (this.ready()) {
            this._neutrinoEffect.setPropertyInAllEmitters(name, npValue);
        } else {
            this._emitterPropsOnStart[name] = npValue;
        }
	}

    /**
     * Returns a number of active particles in the effect. You can use it to find out if the
     * effect is finished playing.
     * @return {Number} Number of active particles in the effect.
     */
    getNumParticles() : number {
        return this.ready() ? this._neutrinoEffect.getNumParticles() : 0;
	}

    hasZeroWorldScale() : boolean {
        const worldScale = this._worldScale;

        return (worldScale.x < Number.EPSILON && worldScale.x > -Number.EPSILON) || 
            (worldScale.y < Number.EPSILON && worldScale.y > -Number.EPSILON) ||
            (worldScale.z < Number.EPSILON && worldScale.z > -Number.EPSILON); 
    }

    /**
     * This method is an override of RenderComponent._checkBacth (thank you guys for great spelling!)
     * Here we ignore materials and just check cullingMask. The rest of materials
     * check will be in NeutrinoAssembler.fillBuffers().
     */
    _checkBacth (renderer, cullingMask) {
        if (renderer.cullingMask !== cullingMask) {
            renderer._flush();
            renderer.cullingMask = cullingMask;
        }

        // NeutrinoComponent don't use renderer.node and it can be unchanged.
        // Setting up this property should be done due to consistency with
        // other components and their behavior. However, it will break Spine
        // integration which doesn't expect that attached components will change
        // the renderer.node.
        
        //renderer.node = renderer._dummyNode;
    }

    private _waitForContextAndReset() {
        if (!this.context) {
            return;
        }

        if (!this.context.loaded()) {
            this._waitingForContext = true;
            this.context.once('loaded', this._reset, this);
            return;
        }

        this._reset();
    }

    /**
     * Resets the component: tries to recreate NeutrinoEffect and reload all resources.
     */
    private _reset() {
        if (this._resetInProgress || this._destructed) {
            return;
        }

        this._waitingForContext = false;

        let EffectClass = this.getEffectClass();

        if (!EffectClass) {
            cc.error(`${this.__classname__}: you shouldn't use NeutrinoComponent by itself. Use generated effect classes instead.`);
            return;
        }

        this._resetInProgress = true;
        this._errorOnLoad = false;

        this._neutrinoEffectModel = new EffectClass(this.context.neutrinoContext);
        this._neutrinoEffect = null;
        
        // Load textures.
        const numTextures = this._neutrinoEffectModel.textures.length;
        this._spriteFrames = new Array(numTextures);
        this._numTexturesLoading = this._spriteFrames.length;

        for (let texIndex = 0; texIndex < numTextures; ++texIndex) {
            const texturePath = this._texturesPrefixPath + this._neutrinoEffectModel.textures[texIndex];
            const texturePathNoExt = texturePath.replace(/\.[^/.]+$/, "");

            if (this.spriteAtlas) {
                const spriteFrame = this.spriteAtlas.getSpriteFrame(texturePathNoExt);
                if (spriteFrame) {
                    spriteFrame.addRef();
                    this._spriteFrames[texIndex] = spriteFrame;
                    --this._numTexturesLoading;    
                } else {
                    cc.warn(`${this.__classname__}: Can't load sprite '${texturePathNoExt}' from sprite atlas. Will try to load single texture.`);
                    this._loadTexture(texIndex, texturePathNoExt);
                }
            } else {
                this._loadTexture(texIndex, texturePathNoExt);
            }
        }

        if (this._numTexturesLoading === 0) {
            // TODO: deffer this to the end of the frame
            this._onTexturesLoaded();
        }
    }

    /**
     * Requests standalone texture for load.
     */
    private _loadTexture(texIndex: number, texturePath: string) {
        const _this = this;

        const texturesDb = this.getTexturesDatabase();
        const textureDesc = texturesDb.find(tex => tex.path === texturePath);

        const textureLoadFinished = () => {
            --_this._numTexturesLoading;
            
            if (_this._numTexturesLoading === 0) {
                _this._onTexturesLoaded();
            }
        };

        if (!textureDesc) {
            cc.error(`${this.__classname__}: Can't find texture '${texturePath}.`);
            this._errorOnLoad = true;
            textureLoadFinished();
            return;
        }

        if (CC_DEV) {
            cc.assetManager.loadAny(textureDesc.uuid, (err, spriteFrame) => {
                if (this._destructed) {
                    return;
                }

                if (err) {
                    cc.error(`${_this.__classname__}: Can't load texture '${texturePath}'. ${err}`);
                    _this._errorOnLoad = true;
                } else if (!spriteFrame) {
                    // Redundant check to remove error on multiple reloading in row.
                    cc.warn(`${_this.__classname__}: Loading flow wrong behavior found #1 (don't worry about it)`);
                    _this._errorOnLoad = true;
                } else {
                    if (spriteFrame instanceof cc.Texture2D) {
                        spriteFrame = new cc.SpriteFrame(spriteFrame);
                    }
                    spriteFrame.addRef();

                    if (!_this._spriteFrames) {
                        // Redundant check to remove error on multiple reloading in row.
                        cc.warn(`${_this.__classname__}: Loading flow wrong behavior found #2 (don't worry about it)`);
                        _this._errorOnLoad = true;
                    } else {
                        _this._spriteFrames[texIndex] = spriteFrame;
                    }
                }
    
                textureLoadFinished();
            });
        } else {
            this.context.texturesBundle().load(textureDesc.path, cc.SpriteFrame, (err, spriteFrame) => {
                if (this._destructed) {
                    return;
                }

                if (err) {
                    cc.error(`${_this.__classname__}: Can't load sprite frame '${texturePath}'. ${err}`);
                    _this._errorOnLoad = true;
                } else {
                    spriteFrame.addRef();
                    _this._spriteFrames[texIndex] = spriteFrame;
                }
    
                textureLoadFinished();
            });
        }
    }

    /**
     * When everything is loaded - create neutrino effect.
     */
    private _onTexturesLoaded() {
        if (this._errorOnLoad) {
            this._resetInProgress = false;
            return;
        }

        this.materials.length = 0;
        
        let materialsSetupError = false;
        
        this._neutrinoEffectModel.renderStyles.forEach((renderStyle, renderStyleIndex) => {
            const texIndex = renderStyle.textureIndices[0];
            const spriteFrame = this._spriteFrames[texIndex];
            if (!spriteFrame) {
                // Redundant check to remove error on multiple reloading in row.
                cc.warn(`${this.__classname__}: Loading flow wrong behavior found #3 (don't worry about it)`);
                materialsSetupError = true;
                return;
            }
            const texture = spriteFrame.getTexture();
            if (!texture) {
                // Redundant check to remove error on multiple reloading in row.
                cc.warn(`${this.__classname__}: Loading flow wrong behavior found #4 (don't worry about it)`);
                materialsSetupError = true;
                return;
            }

            const materialIndex = this._neutrinoEffectModel.materials[renderStyle.materialIndex];
            const material = this.context.materials[materialIndex * 2 +
                (texture.hasPremultipliedAlpha() ? 1 : 0)];
            if (!material) {
                // Redundant check to remove error on multiple reloading in row.
                cc.warn(`${this.__classname__}: Loading flow wrong behavior found #5 (don't worry about it)`);
                materialsSetupError = true;
                return;
            }
            const matVar = this.setMaterial(renderStyleIndex, material);
            matVar.setProperty('texture', texture);
        }, this);

        if (materialsSetupError) {
            this._resetInProgress = false;
            return;
        }

        this._initTexturesRemap();

        this._getNeutrinoWorldPositionRotation(_nwpos, _nwrot);
        this._neutrinoEffect = this._neutrinoEffectModel.createWGLInstance(
            _nwpos, _nwrot, this._assembler,
            {
                paused: this._pausedOnStart,
                generatorsPaused: this._pausedGeneratorsOnStart
            });

        this._neutrinoEffect.texturesRemap = this._texturesRemap;

        for (let prop in this._emitterPropsOnStart) {
            this._neutrinoEffect.setPropertyInAllEmitters(prop, 
                this._emitterPropsOnStart[prop]);
        }

        this._emitterPropsOnStart = {};

        this._resetInProgress = false;
    }

    /**
     * In case some of textures are placed on atlases we need to prepare remapping structure for
     * neutrinoparticles.js.
     */
    private _initTexturesRemap() {
        let remapNeeded = false;
        for (let texIndex = 0; texIndex < this._spriteFrames.length; ++texIndex) {
            const spriteFrame = this._spriteFrames[texIndex];
            if (spriteFrame.uv[6] !== 1 ||
                spriteFrame.uv[0] !== 0 ||
                spriteFrame.uv[7] !== 0 ||
                spriteFrame.uv[1] !== 1) {
                    remapNeeded = true;
                    break;
                }
        }

        if (!remapNeeded) {
            this._texturesRemap = [];
            return;
        }

        this._texturesRemap = new Array(this._spriteFrames.length);

        for (let texIndex = 0; texIndex < this._spriteFrames.length; ++texIndex) 
		{
			let spriteFrame = this._spriteFrames[texIndex];

			this._texturesRemap[texIndex] = new this.context.neutrinoContext.SubRect(
                spriteFrame.uv[0], 1 - spriteFrame.uv[1],
                spriteFrame.uv[6] - spriteFrame.uv[0],
                spriteFrame.uv[1] - spriteFrame.uv[7]);
		}
    }

    private _getNeutrinoWorldPositionRotation(position: number[], rotation: number[]) {
        const worldMatrix = _gnwprMat0;
        const worldRotation =_gnwprQuat0;
        const worldPosition = _gnwprVec0;
        const worldScale = this._worldScale;

        this.node.getWorldMatrix(worldMatrix);

        const worldParent = this._getWorldParent();
        if (worldParent) {
            const worldParentMatrix = _gnwprMat1;
            worldParent.getWorldMatrix(worldParentMatrix);
            cc.Mat4.invert(worldParentMatrix, worldParentMatrix);
            cc.Mat4.multiply(worldMatrix, worldParentMatrix, worldMatrix);
        }

        cc.Mat4.getRotation(worldRotation, worldMatrix);
        worldMatrix.getTranslation(worldPosition);
        worldMatrix.getScale(worldScale);

        if (this.hasZeroWorldScale()) {
            position[0] = worldPosition.x;
            position[1] = worldPosition.y;
            position[2] = worldPosition.z;
        } else {
            position[0] = worldPosition.x / worldScale.x;
            position[1] = worldPosition.y / worldScale.y;
            position[2] = worldPosition.z / worldScale.z;
        }
        
        rotation[0] = worldRotation.x;
        rotation[1] = worldRotation.y;
        rotation[2] = worldRotation.z;
        rotation[3] = worldRotation.w;
    }

    private _getWorldParent() {
        if (this._worldParent) {
            return this._worldParent;
        } else {
            const settings = this._getSettings();
            if (settings) {
                return settings.defaultWorldParent;
            } else {
                return null;
            }
        }
    }

    private _getSettings() {
        if (CC_EDITOR) {
            return NeutrinoSettings.instance();
        } else {
            if (!this._settings) {
                this._settings = NeutrinoSettings.instance();
            }
            return this._settings;
        }
    }

    abstract getEffectClass(): any;
    abstract getTexturesDatabase() : any;
}

