import Singleton from "../Manager/a-singleton";


const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/UpdateWall")
export default class UpdateWall extends cc.Component {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    btnUpdate: cc.Node = null;

    @property(cc.Node)
    wall1: cc.Node = null;
    @property(cc.Node)
    wall2: cc.Node = null;
    @property(cc.Node)
    wall3: cc.Node = null;
    @property(cc.Prefab)
    efUpdateWall: cc.Prefab = null;
    hpWall = 100;
    onLoad() {
        this.btnUpdate.on(cc.Node.EventType.TOUCH_START, this.updateWall, this);
        this.btnClose.on(cc.Node.EventType.TOUCH_START,(()=>{
            Singleton.UI_MANAGER.wallPop.active=false;
        }),this)
    }

    isUpdate = false;
    updateWall() {
        if (this.isUpdate) return;
        this.isUpdate = true;
        let t1 = cc.tween;
        t1(this.wall1)
            // Execute two cc.tween at the same time
            .parallel(
                t1().to(0.5, { scale: 0.4 }),
                t1().to(0.5, { position: cc.v2(-300, 0) })
            )
            .start()


        let t2 = cc.tween;
        t2(this.wall2)
            // Execute two cc.tween at the same time
            .parallel(
                t2().to(0.5, { scale: 0.6 }),
                t2().to(0.5, { position: cc.v2(0, 0) })
            )
            .call(() => {
                this.wall3.active = true;
                let ef = cc.instantiate(this.efUpdateWall);
                ef.setParent(this.wall1.parent);
                ef.setPosition(cc.v3(0, -100, 0))
            })
            .start()
    }


}
