import Singleton from "../Manager/a-singleton";
import Global from "../Manager/global";
import { TypePool } from "../Manager/pooling-manager";
import Player from "./Player";


const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/TelePlayer")
export default class TelePlayer extends cc.Component {

    @property(Player)
    player: Player = null;
    @property([cc.Node])
    listTele: cc.Node[] = [];


    @property([cc.Node])
    listBtnTele: cc.Node[] = [];


    start() {
        Global.tele = this;
        this.listBtnTele[0].on(cc.Node.EventType.TOUCH_START, this.Tele1, this);
        this.listBtnTele[1].on(cc.Node.EventType.TOUCH_START, this.Tele2, this);
        this.listBtnTele[2].on(cc.Node.EventType.TOUCH_START, this.Tele3, this);

    }
    Tele1() {
        let ef = Singleton.POOLING_MANAGER.poolGet(TypePool.PlayerTele, this.listTele[0].parent, this.listTele[0].position);
        // ef.opacity = 255;
        ef;
        setTimeout(() => {
            // ef.opacity = 0;
            Singleton.POOLING_MANAGER.poolPut(TypePool.PlayerTele, ef);
        }, 500);
        this.player.node.setPosition(this.listTele[0].position);
        if (!this.player.isFaceRight) {
            // this.player.flip();
            this.player.isFaceRight = true;


        }
        setTimeout(() => {
            this.listBtnTele[0].active = false;
            this.listBtnTele[1].active = true;
            this.listBtnTele[2].active = true;
        }, 100);
    }
    Tele2() {

        let ef = Singleton.POOLING_MANAGER.poolGet(TypePool.PlayerTele, this.listTele[1].parent, this.listTele[1].position);
        // ef.opacity=255;
        ef;

        setTimeout(() => {
            // ef.opacity = 0;
            Singleton.POOLING_MANAGER.poolPut(TypePool.PlayerTele, ef);
        }, 500);
        this.player.node.setPosition(this.listTele[1].position);
        if (!this.player.isFaceRight) {
            // this.player.flip();
            this.player.isFaceRight = true;

        }
        setTimeout(() => {
            this.listBtnTele[0].active = true;
            this.listBtnTele[1].active = false;
            this.listBtnTele[2].active = true;
        }, 100);
    }
    Tele3() {
        let ef = Singleton.POOLING_MANAGER.poolGet(TypePool.PlayerTele, this.listTele[2].parent, this.listTele[2].position);
        // ef.opacity=255;
        if (Singleton.LEVEL_MANAGER.Lv == "LV1" && Singleton.GAME_MANAGER_MONSTER.handTUT.active) {
            Singleton.GAME_MANAGER_MONSTER.handTUT.active = false;
            Singleton.GAME_MANAGER_MONSTER.isPause = false;

            if (Singleton.LEVEL_MANAGER.Lv == "LV1") {
                this.scheduleOnce(() => {
                    Singleton.LEVEL_MANAGER.level1BotSpawn();
                    this.scheduleOnce(() => {
                        Singleton.GAME_MANAGER_MONSTER.tutGun.active = true;
                    }, 2);
                }, 2);
            }
        }
        ef;
        setTimeout(() => {
            // ef.opacity = 0;
            Singleton.POOLING_MANAGER.poolPut(TypePool.PlayerTele, ef);
        }, 500);
        this.player.node.setPosition(this.listTele[2].position);
        if (!this.player.isFaceRight) {
            // this.player.flip();
            this.player.isFaceRight = true;
        }
        setTimeout(() => {
            this.listBtnTele[0].active = true;
            this.listBtnTele[1].active = true;
            this.listBtnTele[2].active = false;
        }, 100);

    }
}
