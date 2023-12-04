import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";
import { TypePool } from "../Manager/pooling-manager";

const { ccclass, property, menu } = cc._decorator;

@ccclass @menu("MonsterWorldWar/LevelCtrl")
export default class LevelCtrl extends cc.Component {
    @property()
    Lv: string = "LV1"
    @property(cc.Node)
    posE1: cc.Node = null;
    @property(cc.Node)
    posE2: cc.Node = null;
    @property(cc.Node)
    posE3: cc.Node = null;
    @property(cc.Node)
    parentE: cc.Node = null;
    @property(cc.Prefab)
    arow: cc.Prefab = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property()
    numberBot1 = 15;
    @property()
    numberBot2 = 15;
    @property()
    numberBot3 = 15;
    @property()
    numberBot4 = 15;
    numBoss = 1;
    bossDie = false;
    @property(cc.Node)
    youWon: cc.Node = null;
    @property(cc.Node)
    youLose: cc.Node = null;
    @property()
    numBotall = 100;
    isEnd = false;
    dataLV = JSON.parse(localStorage.getItem("Level"));
    onLoad() {

        // if (Singleton.LEVEL_MANAGER) {
        //     this.destroy();
        // }
        // else {
        Singleton.LEVEL_MANAGER = this;
        // }
    }
    winGame() {
        if (this.isEnd) return;
        this.isEnd = true;
        this.youWon.active = true;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.win);
        Singleton.GAME_MANAGER_MONSTER.canMove = false;
        Singleton.GAME_MANAGER_MONSTER.player.animJump();
        this.dataLV.curentLV+=1;
        localStorage.setItem("Level",JSON.stringify(this.dataLV));
        this.scheduleOnce(() => {
            Singleton.GAME_MANAGER_MONSTER.isPause = true;
                cc.director.loadScene("menu");
        }, 2);
    }
    loseGame() {
        if (this.isEnd) return;
        this.isEnd = true;
        Singleton.GAME_MANAGER_MONSTER.canMove = false;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.lose);
        Singleton.GAME_MANAGER_MONSTER.player.animJump();
        this.youLose.active = true;
        this.scheduleOnce(() => {
            Singleton.GAME_MANAGER_MONSTER.isPause = true;
            Singleton.LOADSCENES.loadLv("menu");

        }, 2);


    }
    start() {
        if (this.Lv == "LV1") {
            this.level1();
        }
        else {
            Singleton.GAME_MANAGER_MONSTER.canMove = true;
            this.spawnBot();
        }
    }
    level1() {
        Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE2.position);
        this.scheduleOnce(() => {
            Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE3.position);

            this.scheduleOnce(() => {
                let arow = cc.instantiate(this.arow);
                arow.setParent(Singleton.GAME_MANAGER_MONSTER.player.arow);
                arow.setPosition(cc.v3(0, 0, 0));
                this.hand.active = true;
                Singleton.GAME_MANAGER_MONSTER.isPause = true;
                Singleton.GAME_MANAGER_MONSTER.canMove = true;
            }, 1);
        }, 3);
    }
    level1BotSpawn() {

        if (this.numberBot1 > 1) {
            this.numberBot1 -= 1;
            console.log("numberbot1:" + this.numberBot1);

            let posrandom = Math.round(Math.random() * 2);
            if (posrandom == 0) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE1.position);
            }
            else if (posrandom == 1) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE2.position);
            }
            else {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE3.position);

            }
            var timeRandom = Math.random() * 2 + 1;
            this.scheduleOnce(() => {
                if (this.numberBot1 > 0) {
                    this.level1BotSpawn();
                }
            }, timeRandom);
        }

    }
    isBot2 = false;
    isBot3 = false;
    isBot4 = false;
    boss = false;
    spawnBot() {
        if (Singleton.GAME_MANAGER_MONSTER.isPause) return;
        if (this.numberBot1 > 0) {
            this.numberBot1 -= 1;
            let posrandom = Math.round(Math.random() * 2);
            if (posrandom == 0) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE1.position);
            }
            else if (posrandom == 1) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE2.position);
            }
            else {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy1, this.parentE, this.posE3.position);

            }


        }
        this.scheduleOnce(() => {
            if (!this.isBot2) {

                this.isBot2 = true
            }
        }, 10);
        if (this.numberBot2 > 0 && this.isBot2) {
            this.numberBot2 -= 1;
            let posrandom = Math.round(Math.random() * 2);
            if (posrandom == 0) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy2, this.parentE, this.posE1.position);
            }
            else if (posrandom == 1) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy2, this.parentE, this.posE2.position);
            }
            else {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy2, this.parentE, this.posE3.position);

            }

        }
        if (this.Lv == "LV2") {
            let timeRandom = Math.random() * 3 + 2;
            this.scheduleOnce(() => {
                if (Singleton.GAME_MANAGER_MONSTER.isPause) return;
                this.spawnBot();
            }, timeRandom);
        }
        //level2 dung o day
        if (this.Lv == "LV2") return;
        //level 3
        this.scheduleOnce(() => {
            if (!this.isBot3) {

                this.isBot3 = true
            }
        }, 20);
        if (this.numberBot3 > 0 && this.isBot3) {
            this.numberBot3 -= 1;
            let posrandom = Math.round(Math.random() * 2);
            if (posrandom == 0) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy3, this.parentE, this.posE1.position);
            }
            else if (posrandom == 1) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy3, this.parentE, this.posE2.position);
            }
            else {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy3, this.parentE, this.posE3.position);

            }

        }
        if (this.Lv == "LV3") {
            let timeRandom = Math.random() * 2;
            this.scheduleOnce(() => {
                if (Singleton.GAME_MANAGER_MONSTER.isPause) return;
                this.spawnBot();
            }, timeRandom);
        }
        //level3 dung o day
        if (this.Lv == "LV3") return;
        //level 4
        this.scheduleOnce(() => {
            if (!this.isBot4) {

                this.isBot4 = true
            }
        }, 40);
        if (this.numberBot4 > 0 && this.isBot4) {
            this.numberBot4 -= 1;
            let posrandom = Math.round(Math.random() * 2);
            if (posrandom == 0) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy4, this.parentE, this.posE1.position);
            }
            else if (posrandom == 1) {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy4, this.parentE, this.posE2.position);
            }
            else {
                Singleton.POOLING_MANAGER.poolGet(TypePool.Enemy4, this.parentE, this.posE3.position);

            }

        }
        if (this.Lv == "LV4") {
            let timeRandom = Math.random() * 2;
            this.scheduleOnce(() => {
                if (Singleton.GAME_MANAGER_MONSTER.isPause) return;
                this.spawnBot();
            }, timeRandom);
        }
        //level4 dung o day
        if (this.Lv == "LV4") return;
        //level5

        this.scheduleOnce(() => {
            if (!this.boss) {

                this.boss = true
            }
        }, 150);
        if (this.boss && this.numBoss != 0) {
            this.numBoss = 0;
            Singleton.POOLING_MANAGER.poolGet(TypePool.Boss, this.parentE, this.posE2.position);
        }
        if (this.Lv == "LV5") {
            let timeRandom = Math.random() * 2 + 1;
            this.scheduleOnce(() => {
                if (Singleton.GAME_MANAGER_MONSTER.isPause) return;
                this.spawnBot();
            }, timeRandom);
        }
    }
}
