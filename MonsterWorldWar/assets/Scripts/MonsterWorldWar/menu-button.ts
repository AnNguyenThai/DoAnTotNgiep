import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/MenuBTN")
export default class MenuBTN extends cc.Component {
// hiệu ứng khi click vào button zoom ra
    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, (() => {
            Singleton.MENU_CTRL.loadScenes(this.node.name);
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
            cc.tween(this.node)
            .to(0.5,{scale:1.1})
            .to(0.5,{scale:1})
            .start();
        }), this);
    }
}
