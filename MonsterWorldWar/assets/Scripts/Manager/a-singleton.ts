import GameManagerMonster from "../MonsterWorldWar/GameManagerMonster";
import AvtiveNode from "../MonsterWorldWar/avtive-node";
import GameData from "../MonsterWorldWar/game-data";
import LevelCtrl from "../MonsterWorldWar/level-ctrl";
import LoadScenes from "../MonsterWorldWar/loadscenes-manager";
import MenuCtrl from "../MonsterWorldWar/menu-ctrl";
import UIManager from "../MonsterWorldWar/ui-manager";
import AudioManager from "./audio-manager";
import PoolingManager from "./pooling-manager";



export default class Singleton {
    public static AUDIO_MANAGER: AudioManager = null;
    public static POOLING_MANAGER: PoolingManager = null;
    public static GAME_MANAGER_MONSTER: GameManagerMonster = null;
    public static UI_MANAGER: UIManager = null;
    public static LEVEL_MANAGER: LevelCtrl = null;
    public static LOADSCENES: LoadScenes = null;
    public static MENU_CTRL: MenuCtrl = null;
    public static GAME_DATA: GameData = null;
    public static AVTIVE_NODE: AvtiveNode = null;
}
export enum JoyStickController {
    JOYSTICK_PLAYER = 0,
    JOYSTICK_Camera = 1
}