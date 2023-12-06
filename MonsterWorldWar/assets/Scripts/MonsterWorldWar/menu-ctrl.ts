import Singleton from "../Manager/a-singleton";
import { TypeAudio } from "../Manager/audio-manager";
import GameData from "./game-data";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/MenuCtrl")
export default class MenuCtrl extends cc.Component {

    @property([cc.Node])
    listLevel: cc.Node[] = [];

    @property(cc.Node)
    hand: cc.Node = null;

    dataLV = JSON.parse(localStorage.getItem("Level"));
    protected onLoad(): void {
        Singleton.MENU_CTRL = this;
        this.dataLV.curentLV = 5;
    }
    protected start(): void {
        console.log(this.dataLV.curentLV);

        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMmenu);
        for (let i = 0; i < this.dataLV.curentLV; i++) {
            Singleton.AVTIVE_NODE.ativeFalse(this.listLevel[i]);
        }

    }
    loadScenes(x: string) {
        switch (x) {
            case "1":
                Singleton.LOADSCENES.LoadScenes("level-1");
                break;
            case "2":
                Singleton.LOADSCENES.LoadScenes("level-2");
                break;
            case "3":
                Singleton.LOADSCENES.LoadScenes("level-3");
                break;
            case "4":
                Singleton.LOADSCENES.LoadScenes("level-4");
                break;
            case "5":
                Singleton.LOADSCENES.LoadScenes("level-5");
                break;
            default:
                break;
        }
    }

}
