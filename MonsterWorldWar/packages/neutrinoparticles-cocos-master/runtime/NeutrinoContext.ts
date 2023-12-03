import * as Neutrino from './neutrinoparticles.js/neutrinoparticles.umd';

const {ccclass, mixins} = cc._decorator;

const materialDescs = [
    { uuid: '97KN8e0flOjpWQPC0zIOoR', name: 'NeutrinoNormal' },
    { uuid: 'c5T9A8r8FHY5DeeJSjTP0k', name: 'NeutrinoNormalPremul' },
    { uuid: '369MNzEcVL3Jj5UF9gvCfR', name: 'NeutrinoAdd' },
    { uuid: 'baTMgpxLlFqrJF04VcDxPF', name: 'NeutrinoAddPremul' },
    { uuid: 'a74/Nyb0dDYrv5zAZoAlVP', name: 'NeutrinoMultiply' },
    { uuid: '04mmqJExZKjqgZH4ovqGK7', name: 'NeutrinoMultiplyPremul' },
];

const materialsBundleName = 'neutrinoparticles-materials';

@ccclass('NeutrinoContext')
@mixins(cc.EventTarget)
export default class NeutrinoContext {
    neutrinoContext = new Neutrino.Context();
    materials = new Array(materialDescs.length);

    private static _singleInstance: NeutrinoContext;
    private _materialsLeftToLoad = this.materials.length;
    private _bundlesLeftToLoad = 0;
    private _noiseGenerationStep = null;
    private _noiseGenerated = false;
    private _texturesBundle = null;

    constructor () {
        cc.EventTarget.call(this);

        if (CC_DEV) {
            this._startLoadingForDev();
        } else {
            this._startLoadingForBuild();
        }
    }

    static instance() : NeutrinoContext {
        if (!this._singleInstance) {
            this._singleInstance = new NeutrinoContext();
        }
        return this._singleInstance;
    }

    loaded() {
        return this._materialsLeftToLoad === 0 && this._bundlesLeftToLoad === 0;
    }

    startNoiseTextureGeneration() {
        if (this._noiseGenerated) {
            return;
        }

        const _this = this;

        let noiseGenerator = new this.neutrinoContext.NoiseGenerator();
        let timerId;
        
        this._noiseGenerationStep = () => {
            for (let i = 0; i < 100; ++i) {
                if (noiseGenerator.step()) {
                    clearInterval(timerId);
                    _this._noiseGenerationStep = null;
                    _this._noiseGenerated = true;
                    noiseGenerator = null;
                    break;
                }
            }
        };

        timerId = setInterval(this._noiseGenerationStep, 0);
    }

    ensureNoiseTextureIsGenerated() {
        if (this._noiseGenerated) {
            return;
        }

        if (!this._noiseGenerationStep) {
            this.startNoiseTextureGeneration();
        }
        
        while (this._noiseGenerationStep) {
            this._noiseGenerationStep();
        }
    }

    texturesBundle() {
        return this._texturesBundle;
    }

    private _startLoadingForDev() {
        let _this = this;        

        for (let matIndex = 0; matIndex < this.materials.length; ++matIndex) {
            let _matIndex = matIndex;

            cc.assetManager.loadAny(materialDescs[matIndex].uuid, (err, material) => {
                if (err) {
                    cc.error(`NeutrinoContext: can't load material with UUID='${materialDescs[_matIndex].uuid}'. ${err}`);
                    return;
                }
                _this._materialLoaded(material, _matIndex);
            });   
        }
    }

    private _startLoadingForBuild() {
        let _this = this;  

        ++this._bundlesLeftToLoad;
        cc.assetManager.loadBundle(materialsBundleName, (err, bundle) => {
            if (err) {
                cc.error(`NeutrinoContext: failed to load bundle '${materialsBundleName}'. ${err}`);
                return;
            }

            --this._bundlesLeftToLoad;

            for (let matIndex = 0; matIndex < this.materials.length; ++matIndex) {
                let _matIndex = matIndex;
    
                bundle.load(materialDescs[matIndex].name, (err, material) => {
                    if (err) {
                        cc.error(`NeutrinoContext: can't load material '${materialDescs[_matIndex].name}'. ${err}`);
                        return;
                    }
                    _this._materialLoaded(material, _matIndex);
                });   
            }
        });

        ++this._bundlesLeftToLoad;
        const texturesBundleName = 'neutrinoparticles-textures';
        cc.assetManager.loadBundle(texturesBundleName, (err, bundle) => {
            if (err) {
                cc.error(`NeutrinoContext: failed to load bundle '${texturesBundleName}'`);
                return;
            }

            cc.log(`NeutrinoContext: Loaded bundle ${texturesBundleName}`);

            --this._bundlesLeftToLoad;
            this._texturesBundle = bundle;
            this._checkAndEmitLoadedStatus();
        });
    }

    private _materialLoaded(material, index) {
        this.materials[index] = material;
        --this._materialsLeftToLoad;
        this._checkAndEmitLoadedStatus();       
    }

    private _checkAndEmitLoadedStatus() {
        if (this.loaded()) {
            this.emit('loaded');
        }
    }
}

cc.game.once(cc.game.EVENT_GAME_INITED, () => {
    NeutrinoContext.instance().startNoiseTextureGeneration();
});