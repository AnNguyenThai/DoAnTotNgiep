import Singleton from "../Manager/a-singleton";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/UpdateGun")
export default class UpdateGun extends cc.Component {

    @property(cc.Prefab)
    efUpdate: cc.Prefab = null;
    @property(cc.Node)
    btnUpdate: cc.Node = null;
    @property(cc.Node)
    gun: cc.Node = null;
    @property([cc.Node])
    listDotUpdate: cc.Node[] = [];
    numDot = 0;
    @property
    giatienStart = 1000;
    @property(cc.Label)
    giatienTxt: cc.Label = null;
    @property(cc.Node)
    sung2: cc.Node = null;
    @property(cc.Node)
    btnClose: cc.Node = null;
    onLoad() {
        this.btnUpdate.on(cc.Node.EventType.TOUCH_START, this.updateGun, this);
        this.btnClose.on(cc.Node.EventType.TOUCH_START, this.closePop, this);

    }
    // nâg cấp cho súng đạn
    updateGun() {
        if (Singleton.GAME_MANAGER_MONSTER.numscore < this.giatienStart) return;
        let ef = cc.instantiate(this.efUpdate);
        ef.setParent(this.gun);
        ef.setPosition(cc.v3(0, 0, 0));
        this.listDotUpdate[this.numDot].active = true;
        this.numDot += 1;
        Singleton.GAME_MANAGER_MONSTER.changeBulletLv(this.numDot);
        Singleton.GAME_MANAGER_MONSTER.numscore -= this.giatienStart;
        Singleton.GAME_MANAGER_MONSTER.score.string = ": " + Singleton.GAME_MANAGER_MONSTER.numscore.toString();
        // Tăng giá tiền mỗi lần nâng cấo
        this.giatienStart += 2000 * this.numDot * 2;
        this.giatienTxt.string = this.giatienStart.toString();
        if (this.numDot == 5) {
            this.btnUpdate.active = false;
            this.sung2.active = true;
        }
    }
    closePop() {
        Singleton.UI_MANAGER.gunPop.active = false;
        Singleton.GAME_MANAGER_MONSTER.player.isChangBullet = false;
        Singleton.GAME_MANAGER_MONSTER.isPause = false;
        Singleton.LEVEL_MANAGER.spawnBot();
        Singleton.GAME_MANAGER_MONSTER.player.onStop();
    }


}
