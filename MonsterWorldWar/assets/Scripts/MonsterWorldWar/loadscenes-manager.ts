import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/LoadScenes")
export default class LoadScenes extends cc.Component {

    protected start(): void {
        Singleton.LOADSCENES = this;
    }
    LoadScenes(name: string) {
        cc.director.loadScene(name, function () {
            console.log("load lv: " + name);
            if (name == "menu") {
                console.log("menu game");
            }
        });
    }
    loadLv(name: string) {
        cc.director.loadScene(name);
    }
}
