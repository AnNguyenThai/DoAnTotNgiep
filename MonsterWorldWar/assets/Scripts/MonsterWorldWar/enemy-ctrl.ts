import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";
import Global from "../Manager/global";
import { TypePool } from "../Manager/pooling-manager";

export enum TypeE {
    E1,
    E2,
    E3,
    E4,
    Boss
}
const { ccclass, property, menu } = cc._decorator;

@ccclass @menu("MonsterWorldWar/Enemy")
export default class Enemy extends cc.Component {
    @property({
        type: cc.Enum(TypeE)
    })
    typeEnemy: TypeE = TypeE.E1;
    @property(cc.Animation)
    anim: cc.Animation = null;
    @property(cc.RigidBody)
    rig: cc.RigidBody = null;
    @property(cc.PhysicsBoxCollider)
    physicBox: cc.PhysicsBoxCollider = null;
    @property()
    speed = 100;
    @property(cc.Node)
    hp: cc.Node = null;

    protected update(dt: number): void {
        if (this.isDie) return;
        if (Singleton.GAME_MANAGER_MONSTER.isPause) {
            this.animIdle();
            return;
        }
        if (this.isAttack) return;

        this.moveEnemy();
    }

    lastName: string;
    // Set các hành động cho nhân vật.
    setAnim(name: string) {
        if (name == this.lastName) return;
        this.lastName = name;
        this.anim.play(name);
    }
    animIdle() {
        this.setAnim("idle");
    }
    animAttack() {
        this.setAnim("attack")
    }
    animRun() {
        this.setAnim("run")
    }
    animHurt() {
        this.setAnim("hurt")
    }
    animDie() {
        this.setAnim("die")

    }
    isAttack = false;
    isDie = false;
    // hàm di chuyển cho enemy
    moveEnemy() {
        this.animRun();
        // set cho anim đi về bên trái
        this.rig.linearVelocity = cc.v2(-this.speed, this.rig.linearVelocity.y);
    }
    onBeginContact(contact, self, other) {
        if (Singleton.GAME_MANAGER_MONSTER.isPause || this.isDie) return;
        if (other.node.group == "Player") {
            // khi quái vật chạm vào người chơi thì sẽ set lose game
            Singleton.LEVEL_MANAGER.loseGame();
            Singleton.GAME_MANAGER_MONSTER.player.isLose = true;
        }
        if (other.node.group == "Wall" || other.node.group == "Player") {
            // Khi chạm vào tường thành hoặc người chơi sẽ thực hiện hành động tấn công
            this.isAttack = true;
            this.animAttack();
        }
        // Khi trúng đạn sẽ trừ máu tag =0,1,2,3,4,5 tương đương vs các loại đạn và số máu quái bị trừ
        if (other.node.group == "Bullet" && other.tag == 0) {
            if (this.hp.width > 10) {
                this.hp.width -= 40;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        else if (other.node.group == "Bullet" && other.tag == 1) {
            if (this.hp.width > 10) {
                this.hp.width -= 80;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        else if (other.node.group == "Bullet" && other.tag == 2) {
            if (this.hp.width > 10) {
                this.hp.width -= 120;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        else if (other.node.group == "Bullet" && other.tag == 3) {
            if (this.hp.width > 10) {
                this.hp.width -= 200;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        else if (other.node.group == "Bullet" && other.tag == 4) {
            if (this.hp.width > 10) {
                this.hp.width -= 300;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        else if (other.node.group == "Bullet" && other.tag == 5) {
            if (this.hp.width > 10) {
                this.hp.width -= 500;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }

    }
    onEndContact(contact, self, other) {
        if (Singleton.GAME_MANAGER_MONSTER.isPause || this.isDie) return;
        if (other.node.group == "Wall" || other.node.group == "Player") {
            this.isAttack = false;
        }
    }
    onCollisionEnter(other, self) {

        // Set khi quái dính cá kỹ năng và bị trừ máu
        if (other.node.name == "FireSkill") {

            if (this.hp.width > 10) {
                this.hp.width -= 300;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        if (other.node.name == "EDame") {

            if (this.hp.width > 10) {
                this.hp.width -= 80;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        if (other.node.name == "DameMeteo") {

            if (this.hp.width > 10) {
                this.hp.width -= 400;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
        if (other.node.name == "DameLazer") {

            if (this.hp.width > 10) {
                this.hp.width -= 600;
                if (this.hp.width < 0) {
                    this.hp.width = 0;
                    this.die();
                }
            }
            else {
                this.die();
            }
        }
    }
    die() {
        if (this.isDie) return;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Hurt);
        // tính số điểm khi diệt quái nhận được
        if (this.typeEnemy == TypeE.E1) {
            Singleton.GAME_MANAGER_MONSTER.numscore += 500;
        }
        else if (this.typeEnemy == TypeE.E2) {
            Singleton.GAME_MANAGER_MONSTER.numscore += 1000;
        }
        else if (this.typeEnemy == TypeE.E3) {
            Singleton.GAME_MANAGER_MONSTER.numscore += 1500;
        }
        else if (this.typeEnemy == TypeE.E4) {
            Singleton.GAME_MANAGER_MONSTER.numscore += 2000;
        }
        else if (this.typeEnemy == TypeE.Boss) {
            Singleton.GAME_MANAGER_MONSTER.numscore += 1000000;
        }
        Singleton.GAME_MANAGER_MONSTER.score.string = ": " + Singleton.GAME_MANAGER_MONSTER.numscore.toString();

        this.isDie = true;
        this.animDie();
        this.physicBox.enabled = false;
        this.scheduleOnce(() => {
            this.isDie = false;
            // quái chết sẽ đưa vào pool để tái sử dụng
            this.physicBox.enabled = true;
            if (this.typeEnemy == TypeE.E1) {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Enemy1, this.node);
                this.hp.width = 200;
            }
            else if (this.typeEnemy == TypeE.E2) {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Enemy2, this.node);
                this.hp.width = 400;

            }
            else if (this.typeEnemy == TypeE.E3) {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Enemy3, this.node);
                this.hp.width = 1000;

            }
            else if (this.typeEnemy == TypeE.E4) {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Enemy4, this.node);
                this.hp.width = 2000;

            }
            else if (this.typeEnemy == TypeE.Boss) {
                Singleton.POOLING_MANAGER.poolPut(TypePool.Boss, this.node);


            }
            Singleton.LEVEL_MANAGER.numBotall -= 1;
            console.log(Singleton.LEVEL_MANAGER.numBotall
            );

            if (Singleton.LEVEL_MANAGER.numBotall == 0) {
                Singleton.LEVEL_MANAGER.winGame();
            }
        }, 1);

        // if (Singleton.LEVEL_MANAGER.Lv == "LV1") {
        //     if (Singleton.LEVEL_MANAGER.numberBot1 == 0) {
        //         console.log("Win");

        //         this.scheduleOnce(() => {
        //             Singleton.LEVEL_MANAGER.winGame();
        //         }, 5)
        //     }
        // }
        // else if (Singleton.LEVEL_MANAGER.Lv == "LV2") {
        //     if (Singleton.LEVEL_MANAGER.numberBot1 == 0 && Singleton.LEVEL_MANAGER.numberBot2 == 0) {
        //         this.scheduleOnce(() => {
        //             Singleton.LEVEL_MANAGER.winGame();
        //         }, 5)
        //     }
        // }
        // else if (Singleton.LEVEL_MANAGER.Lv == "LV3") {
        //     if (Singleton.LEVEL_MANAGER.numberBot1 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot2 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot3 == 0) {
        //         this.scheduleOnce(() => {
        //             Singleton.LEVEL_MANAGER.winGame();
        //         }, 5)
        //     }
        // }
        // else if (Singleton.LEVEL_MANAGER.Lv == "LV4") {
        //     if (Singleton.LEVEL_MANAGER.numberBot1 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot2 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot3 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot4 == 0) {
        //         this.scheduleOnce(() => {
        //             Singleton.LEVEL_MANAGER.winGame();
        //         }, 5)
        //     }
        // }

        // else if (Singleton.LEVEL_MANAGER.Lv == "LV5") {
        //     if (Singleton.LEVEL_MANAGER.numberBot1 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot2 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot3 == 0
        //         && Singleton.LEVEL_MANAGER.numberBot4 == 0 &&
        //         Singleton.LEVEL_MANAGER.numBoss == 0) {
        //         this.scheduleOnce(() => {
        //             Singleton.LEVEL_MANAGER.winGame();
        //         }, 5)
        //     }
        // }


    }



}
