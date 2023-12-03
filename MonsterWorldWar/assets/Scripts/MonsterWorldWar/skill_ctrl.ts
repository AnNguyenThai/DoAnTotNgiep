import Singleton from "../Manager/a-singleton";
import { TypePool } from "../Manager/pooling-manager";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/SkillCtrl")
export default class SkillCtrl extends cc.Component {

    @property(cc.Node)
    electronic: cc.Node = null;
    @property(cc.Node)
    fire: cc.Node = null;
    @property(cc.Node)
    meteorite: cc.Node = null;
    @property(cc.Node)
    lazer: cc.Node = null;
    @property(cc.Node)
    wall: cc.Node = null;

    @property(cc.Node)
    fill1: cc.Node = null;
    @property(cc.Node)
    fill2: cc.Node = null;
    @property(cc.Node)
    fill3: cc.Node = null;
    @property(cc.Node)
    fill4: cc.Node = null;
    @property(cc.Node)
    posMeteoInstance: cc.Node = null;
    @property([cc.Node])
    lisPosMeteo: cc.Node[] = [];
    @property([cc.Node])
    lisPosElectronic: cc.Node[] = [];


   
    @property([cc.ParticleSystem])
    listFire: cc.ParticleSystem[] = [];
    @property(cc.Prefab)
    efMeteoBomb: cc.Prefab = null;
    @property(cc.Node)
    boxSkillFire: cc.Node = null;
    onLoad() {
        this.electronic.on(cc.Node.EventType.TOUCH_START, this.skillElectronic, this);
        this.fire.on(cc.Node.EventType.TOUCH_START, this.skillFire, this);
        this.meteorite.on(cc.Node.EventType.TOUCH_START, this.skillMeteorite, this);
        this.lazer.on(cc.Node.EventType.TOUCH_START, this.skillLazer, this);
        this.wall.on(cc.Node.EventType.TOUCH_START, this.createWall, this);
    }
    protected start(): void {
     

    }
    createWall() {
        if (Singleton.GAME_MANAGER_MONSTER.canInstanceWall == false) return;
        let wall = Singleton.POOLING_MANAGER.poolGet(TypePool.Wall, this.node.parent, Singleton.GAME_MANAGER_MONSTER.player.node.position.add(cc.v3(200, 120, 0)));
        wall;
    }
    skillElectronic() {
        if (this.fill1.height != 0 || Singleton.GAME_MANAGER_MONSTER.numscore < 1000) return;
        Singleton.GAME_MANAGER_MONSTER.numscore -= 1000;
        Singleton.GAME_MANAGER_MONSTER.score.string = ": " + Singleton.GAME_MANAGER_MONSTER.numscore.toString();
        this.fill1.height = 85;
        cc.tween(this.fill1)
            .to(3, { height: 0 })
            .call(() => {
            })
            .start();


        let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Electronic, this.node.parent, this.lisPosElectronic[0].position);
        let x2 = Singleton.POOLING_MANAGER.poolGet(TypePool.Electronic, this.node.parent, this.lisPosElectronic[1].position);
        let x3 = Singleton.POOLING_MANAGER.poolGet(TypePool.Electronic, this.node.parent, this.lisPosElectronic[2].position);

        cc.tween(x1)
            .to(3, { position: cc.v3(this.lisPosElectronic[0].x + 4000, this.lisPosElectronic[0].y) })
            .call(() => {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Electronic, x1);
            })
            .start();
        cc.tween(x2)
            .to(3, { position: cc.v3(this.lisPosElectronic[0].x + 4000, this.lisPosElectronic[1].y) })
            .call(() => {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Electronic, x2);
            })
            .start();
        cc.tween(x3)
            .to(3, { position: cc.v3(this.lisPosElectronic[0].x + 4000, this.lisPosElectronic[2].y) })
            .call(() => {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Electronic, x3);
            })
            .start();

    }
    skillFire() {
        if (this.fill2.height != 0 || Singleton.GAME_MANAGER_MONSTER.numscore < 5000) return;
        Singleton.GAME_MANAGER_MONSTER.numscore -= 5000;
        Singleton.GAME_MANAGER_MONSTER.score.string = ": " + Singleton.GAME_MANAGER_MONSTER.numscore.toString();
        this.boxSkillFire.active = true;
        this.fill2.height = 85;
        cc.tween(this.fill2)
            .to(10, { height: 0 })
            .call(() => {

            })
            .start();

        //Fire instance
        this.listFire[0].enabled = true;
        this.listFire[1].enabled = true;
        this.listFire[2].enabled = true;
        this.scheduleOnce(() => {
            this.listFire[0].enabled = false;
            this.listFire[1].enabled = false;
            this.listFire[2].enabled = false;
            this.boxSkillFire.active = false;

        }, 2);

    }
    skillMeteorite() {
        if (this.fill3.height != 0 || Singleton.GAME_MANAGER_MONSTER.numscore < 10000) return;
        Singleton.GAME_MANAGER_MONSTER.numscore -= 10000;
        Singleton.GAME_MANAGER_MONSTER.score.string = ": " + Singleton.GAME_MANAGER_MONSTER.numscore.toString();
        this.fill3.height = 85;
        cc.tween(this.fill3)
            .to(20, { height: 0 })
            .call(() => {
                console.log("done");

            })
            .start();

        //Meteo Instance
        this.lisPosMeteo[0].setPosition(cc.v3(1700, 1480, 0));
        this.lisPosMeteo[1].setPosition(cc.v3(1700, 900, 0));
        this.lisPosMeteo[2].setPosition(cc.v3(1700, 330, 0));

        let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
        cc.tween(x1)
            .to(1.5, { position: this.lisPosMeteo[2].position })
            .call(() => {
                let ef = cc.instantiate(this.efMeteoBomb);
                ef.setParent(x1.parent);
                ef.setPosition(x1.position);
                Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);

            })
            .start();
        this.scheduleOnce(() => {
            let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
            cc.tween(x1)
                .to(1, { position: this.lisPosMeteo[1].position })
                .call(() => {
                    let ef = cc.instantiate(this.efMeteoBomb);
                    ef.setParent(x1.parent);
                    ef.setPosition(x1.position);
                    Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                })
                .start();
        }, 0.5)
        this.scheduleOnce(() => {
            let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
            cc.tween(x1)
                .to(0.5, { position: this.lisPosMeteo[0].position })
                .call(() => {
                    let ef = cc.instantiate(this.efMeteoBomb);
                    ef.setParent(x1.parent);
                    ef.setPosition(x1.position);
                    Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                })
                .start();
        }, 1)
        //meteo lần 2
        this.scheduleOnce(() => {
            this.lisPosMeteo[0].setPosition(cc.v3(2600, 1480, 0));
            this.lisPosMeteo[1].setPosition(cc.v3(2600, 900, 0));
            this.lisPosMeteo[2].setPosition(cc.v3(2600, 330, 0));
            let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
            cc.tween(x1)
                .to(1.5, { position: this.lisPosMeteo[2].position })
                .call(() => {
                    let ef = cc.instantiate(this.efMeteoBomb);
                    ef.setParent(x1.parent);
                    ef.setPosition(x1.position);
                    Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                })
                .start();
            this.scheduleOnce(() => {
                let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
                cc.tween(x1)
                    .to(1, { position: this.lisPosMeteo[1].position })
                    .call(() => {
                        let ef = cc.instantiate(this.efMeteoBomb);
                        ef.setParent(x1.parent);
                        ef.setPosition(x1.position);
                        Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                    })
                    .start();
            }, 0.5)
            this.scheduleOnce(() => {
                let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
                cc.tween(x1)
                    .to(0.5, { position: this.lisPosMeteo[0].position })
                    .call(() => {
                        let ef = cc.instantiate(this.efMeteoBomb);
                        ef.setParent(x1.parent);
                        ef.setPosition(x1.position);
                        Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                    })
                    .start();
            }, 1)
        }, 1.5);
        //meoteo lần 3
        this.scheduleOnce(() => {
            this.lisPosMeteo[0].setPosition(cc.v3(3500, 1480, 0));
            this.lisPosMeteo[1].setPosition(cc.v3(3500, 900, 0));
            this.lisPosMeteo[2].setPosition(cc.v3(3500, 330, 0));
            let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
            cc.tween(x1)
                .to(1.5, { position: this.lisPosMeteo[2].position })
                .call(() => {
                    let ef = cc.instantiate(this.efMeteoBomb);
                    ef.setParent(x1.parent);
                    ef.setPosition(x1.position);
                    Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                })
                .start();
            this.scheduleOnce(() => {
                let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
                cc.tween(x1)
                    .to(1, { position: this.lisPosMeteo[1].position })
                    .call(() => {
                        let ef = cc.instantiate(this.efMeteoBomb);
                        ef.setParent(x1.parent);
                        ef.setPosition(x1.position);
                        Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                    })
                    .start();
            }, 0.5)
            this.scheduleOnce(() => {
                let x1 = Singleton.POOLING_MANAGER.poolGet(TypePool.Meoteo, this.node.parent, this.posMeteoInstance.position);
                cc.tween(x1)
                    .to(0.5, { position: this.lisPosMeteo[0].position })
                    .call(() => {
                        let ef = cc.instantiate(this.efMeteoBomb);
                        ef.setParent(x1.parent);
                        ef.setPosition(x1.position);
                        Singleton.POOLING_MANAGER.poolPut(TypePool.Meoteo, x1);
                    })
                    .start();
            }, 1)
        }, 3)

    }
    skillLazer() {
        if (this.fill4.height != 0 || Singleton.GAME_MANAGER_MONSTER.numscore < 30000) return;
        Singleton.GAME_MANAGER_MONSTER.numscore -= 30000;
        Singleton.GAME_MANAGER_MONSTER.score.string = ": " + Singleton.GAME_MANAGER_MONSTER.numscore.toString();

        this.fill4.height = 85;
        cc.tween(this.fill4)
            .to(30, { height: 0 })
            .call(() => {

            })
            .start();

        //Lazer instance
        // this.listLazer[0].enabled = true;
        // this.listLazer[1].enabled = true;
        // this.listLazer[2].enabled = true;
        var x = Singleton.POOLING_MANAGER.poolGet(TypePool.Lazer, this.node, cc.v3(0, 0, 0));
        x;


        this.scheduleOnce(() => {
            Singleton.POOLING_MANAGER.poolPut(TypePool.Lazer, x);
            // this.listLazer[0].speed = 0;
            // this.listLazer[1].speed = 0;
            // this.listLazer[2].speed = 0;

            // this.scheduleOnce(() => {
            //     this.listLazer[0].speed = 5000;
            //     this.listLazer[1].speed = 5000;
            //     this.listLazer[2].speed = 5000;

            //     this.listLazer[0].enabled = false;
            //     this.listLazer[1].enabled = false;
            //     this.listLazer[2].enabled = false;

            // }, 1);

        }, 2);
    }


}
