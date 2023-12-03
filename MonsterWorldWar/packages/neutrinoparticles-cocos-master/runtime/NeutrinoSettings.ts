const {ccclass, property} = cc._decorator;

/**
 * NeutrinoSettings component is a container for default values of NeutrinoComponent
 * properties. Instance of this class should be a singleton in the scope of a scene
 * and has to be accessed only via cc.NeutrinoSettings.instance() static method. This
 * method attaches NeutrinoSettings component to the 'Canvas' node in the root of the scene
 * if such node presents.
 */

 @ccclass
export default class NeutrinoSettings extends cc.Component {
    /**
     * If NeutrinoComponent.worldParent property is null, this value is taken.
     */
    @property(cc.Node)
    defaultWorldParent = null;

    /**
     * This property is copied to the NeutrinoComponent.texturesPrefixPath when it's created.
     */
    @property
    defaultTexturesPrefixPath = '';

    /**
     * This property is copied to the NeutrinoComponent.spriteAtlas when it's created.
     */
    @property(cc.SpriteAtlas)
    defaultSpriteAtlas = null;

    /**
     * Returns a singleton instance of the NeutrinoSettings. This object is unique in a scope of
     * the scene.
     * @returns NeutrinoSettings instance.
     */
    static instance() : NeutrinoSettings {
        const canvas = cc.find('Canvas');
        if (!canvas) {
            return null;
        }

        let settings = canvas.getComponent(NeutrinoSettings);
        if (!settings) {
            settings = canvas.addComponent(NeutrinoSettings);
            settings.defaultWorldParent = canvas;
        }

        return settings;
    }
}

cc.NeutrinoSettings = NeutrinoSettings;