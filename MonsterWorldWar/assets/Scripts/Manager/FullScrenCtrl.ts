

const { ccclass, property } = cc._decorator;

@ccclass
export default class FullScrenCtrl extends cc.Component {

    @property(cc.Node)
    btnEnterFullScreen: cc.Node = null;

    @property(cc.Node)
    btnExitFullScreen: cc.Node = null;
    onEnterFullScreen() {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        cc.view.enableAutoFullScreen(true);
        this.btnEnterFullScreen.active = false;
        this.btnExitFullScreen.active = true;
    }

    onExitFullScreen() {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        this.btnEnterFullScreen.active = true;
        this.btnExitFullScreen.active = false;
        cc.view.enableAutoFullScreen(false);
    }


    back() {
        cc.director.loadScene("menu");
    }

}
