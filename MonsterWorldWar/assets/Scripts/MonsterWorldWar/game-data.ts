import Singleton from "../Manager/a-singleton";


const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/GameData")
export default class GameData extends cc.Component {

    @property(cc.Label)
    score: cc.Label = null;
    @property()
    currentLevel = 1;
    @property()
    unlockLevel = 1;
    @property(cc.Node)
    parent: cc.Node = null;
    @property(cc.Node)
    menu: cc.Node = null;


    protected onLoad(): void {

        // if (Singleton.GAME_DATA) {
        //     console.log("destroy");
        //     this.destroy();
        // }
        // else {
        console.log("not destroy");
        Singleton.GAME_DATA = this;
        // }

    }
    protected start(): void {
        if (this.currentLevel == 1) {
            console.log("curentlv"+this.currentLevel);
            
            Singleton.MENU_CTRL.hand.active = true;
        }
        // cc.game.addPersistRootNode(this.menu);
        // // cc.game.addPersistRootNode(this.parent);
        // cc.game.addPersistRootNode(this.node);
    }

}
