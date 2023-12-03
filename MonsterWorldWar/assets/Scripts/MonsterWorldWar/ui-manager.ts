import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";
import Player from "./Player";
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("Manager/UIManager")
export default class UIManager extends cc.Component {

    @property(Player)
    player: Player = null;

    @property(cc.Node)
    leftBtn: cc.Node = null;

    @property(cc.Node)
    rightBtn: cc.Node = null;

    @property(cc.Node)
    jumpBtn: cc.Node = null;

    @property(cc.Node)
    attackBtn: cc.Node = null;
    @property(cc.Node)
    gunPop: cc.Node = null;
    @property(cc.Node)
    wallPop: cc.Node = null;
    @property(cc.Node)
    btnGunSet: cc.Node = null;



    onLoad() {
        // if (Singleton.UI_MANAGER) {
        //     this.destroy();
        // }
        // else {
            Singleton.UI_MANAGER = this;
        // }
        this.leftBtn.on("touchstart", this.moveLeft, this);
        this.rightBtn.on("touchstart", this.moveRight, this);
        this.jumpBtn.on("touchstart", this.onJump, this);
        this.attackBtn.on("touchstart", this.onAttack, this);

        this.leftBtn.on("touchcancel", this.onStop, this);
        this.rightBtn.on("touchcancel", this.onStop, this);
        this.leftBtn.on("touchend", this.onStop, this);
        this.rightBtn.on("touchend", this.onStop, this);
        this.attackBtn.on("touchcancel", this.stopAttack, this);
        this.attackBtn.on("touchend", this.stopAttack, this);
        this.btnGunSet.on(cc.Node.EventType.TOUCH_START, (() => {
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
            this.gunPop.active = true;
            Singleton.GAME_MANAGER_MONSTER.player.isChangBullet = true;
            Singleton.GAME_MANAGER_MONSTER.isPause = true;
            Singleton.GAME_MANAGER_MONSTER.player.onStop();
            if (Singleton.LEVEL_MANAGER.Lv == "LV1") {
                if (Singleton.GAME_MANAGER_MONSTER.tutGun.active) {
                    Singleton.GAME_MANAGER_MONSTER.tutGun.active = false;
                }
            }
        }), this)

    }
    start() {

    }
    moveLeft() {
        this.player.onMoveLeft();
    }
    moveRight() {
        this.player.onMoveRight();
    }
    onJump() {
        this.player.onJump();
    }
    onStop() {
        this.player.onStop();
    }
    onAttack() {
        this.player.onAttack();
    }
    stopAttack() {
        this.player.stopAttack();
    }

}
