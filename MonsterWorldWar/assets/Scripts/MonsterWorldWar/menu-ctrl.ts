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


    protected onLoad(): void {
        Singleton.MENU_CTRL = this;

    }
    protected start(): void {
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMmenu);
        for (let i = 0; i < Singleton.GAME_DATA.currentLevel; i++) {

            Singleton.AVTIVE_NODE.ativeFalse(this.listLevel[i]);
        }

        // this.listLevel[0].on(cc.Node.EventType.TOUCH_START, (() => {

        // }), this);
        // this.listLevel[1].on(cc.Node.EventType.TOUCH_START, (() => {
        //     Singleton.LOADSCENES.LoadScenes("level-2");

        // }), this);
        // this.listLevel[2].on(cc.Node.EventType.TOUCH_START, (() => {
        //     Singleton.LOADSCENES.LoadScenes("level-3");

        // }), this);
        // this.listLevel[3].on(cc.Node.EventType.TOUCH_START, (() => {
        //     Singleton.LOADSCENES.LoadScenes("level-4");

        // }), this);
        // this.listLevel[4].on(cc.Node.EventType.TOUCH_START, (() => {
        //     Singleton.LOADSCENES.LoadScenes("level-5");

        // }), this);
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
