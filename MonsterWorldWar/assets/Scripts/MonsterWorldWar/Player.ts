import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";
import Global from "../Manager/global";
import { TypePool } from "../Manager/pooling-manager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(sp.Skeleton)
    body: sp.Skeleton = null;
    @property(cc.RigidBody)
    rig: cc.RigidBody = null;
    @property(cc.Node)
    posBullet: cc.Node = null;
    @property
    speed = 100;
    @property
    jumpPow = 100;
    @property
    powJumpDouble = 80;

    moveLeft = false;

    moveRight = false;

    isGround = false;

    doubleJump = true;
    isChangBullet = false;

    @property(cc.Node)
    arow: cc.Node = null;





    onLoad() {
        this.body.setStartListener((trackEntry, event: sp.spine.Event) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
        });
        this.body.setCompleteListener((trackEntry, event: sp.spine.Event) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            // console.log("anim name: " + animationName);
            if (animationName == "jump_down") {
                this.animIdle();
            }
            // if (animationName == this.idle_attack) {
            //     this.animIdle();
            // }
        });
        this.body.setEventListener((trackEntry, event: sp.spine.Event) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            if (event.data.name == "attack") {
                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.gunshort);
                if (this.isChangBullet || this.isLose) return;
                this.instantBullet();
            }
        });
    }



    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ((event) => {
            var macro = cc.macro;
            switch (event.keyCode) {
                case macro.KEY.a:
                case macro.KEY.left:
                    this.onMoveLeft();
                    break;
                case macro.KEY.d:
                case macro.KEY.right:
                    this.onMoveRight();
                    break;
                case macro.KEY.w:
                case macro.KEY.up:
                    this.onJump();
                    break;
                case macro.KEY.space:
                case macro.KEY.f:
                    this.onAttack();
                    break;

                // case macro.KEY.t:
                //     this.switchCharacter();
                //     Global.input.switchBtn.switchButton();
                //     break;
            }
        }));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            var macro = cc.macro;
            switch (event.keyCode) {
                case macro.KEY.a:
                case macro.KEY.left:
                    this.onStop();
                    break;
                case macro.KEY.d:
                case macro.KEY.right:
                    this.onStop();
                    break;
                case macro.KEY.space:
                case macro.KEY.f:
                    this.stopAttack();
                    break;


            }
        });


    }



    protected update(dt: number): void {
        if (!Singleton.GAME_MANAGER_MONSTER.canMove) return;
        this.checkGround();
        if (this.moveLeft && !this.moveRight) {
            this.rig.applyForceToCenter(new cc.Vec2(-this.speed * 1000, this.rig.linearVelocity.y), true);
            this.animRun(2);
        }
        if (!this.moveLeft && this.moveRight) {
            this.rig.applyForceToCenter(new cc.Vec2(this.speed * 1000, this.rig.linearVelocity.y), true);
            this.animRun(1);
        }
        if (this.moveLeft && this.moveRight) {
            this.onStop();
        }
    }



    onBeginContact(contact, self, other) {
        if (other.node.name == "Wall" && other.tag == 10) {
            Singleton.GAME_MANAGER_MONSTER.canInstanceWall = false;

        }
        if (other.node.name == "Tele1") {
            Global.tele.listBtnTele[0].active = false;
            Global.tele.listBtnTele[1].active = true;
            Global.tele.listBtnTele[2].active = true;

        }
        if (other.node.name == "Tele2") {
            if (Singleton.LEVEL_MANAGER.Lv == "LV1" && this.arow.active) {
                Singleton.GAME_MANAGER_MONSTER.handTUT.active = true;
                if (this.arow.active) {
                    this.arow.active = false;
                    Singleton.LEVEL_MANAGER.hand.active = false;
                }
            }
            Global.tele.listBtnTele[0].active = true;
            Global.tele.listBtnTele[1].active = false;
            Global.tele.listBtnTele[2].active = true;

        }
        if (other.node.name == "Tele3") {
            Global.tele.listBtnTele[0].active = true;
            Global.tele.listBtnTele[1].active = true;
            Global.tele.listBtnTele[2].active = false;
        }


    }
    isLose = false;
    onEndContact(contact, self, other) {
        if (other.node.name == "Wall" && other.tag == 10) {
            Singleton.GAME_MANAGER_MONSTER.canInstanceWall = true;
        }
        if (other.node.name == "Tele3" || other.node.name == "Tele2" || other.node.name == "Tele1") {
            Global.tele.listBtnTele[0].active = false;
            Global.tele.listBtnTele[1].active = false;
            Global.tele.listBtnTele[2].active = false;
        }

    }



    //Animation Spine Name
    idle = 'idle';
    run = 'run';
    runback = "run_back";
    jump = 'aim';
    idle_attack = 'idle_attack';
    run_attack = 'run_aim_attack2';


    //Set Animation
    lastAnim: string = '';
    setAnimation(name: string, loop: boolean, timeScaleNumber: number) {
        if (name == this.lastAnim) return;
        this.lastAnim = name;
        this.body.timeScale = timeScaleNumber;
        this.body.setAnimation(0, name, loop);
    }



    pos1: cc.Vec2;
    pos2: cc.Vec2;
    @property(cc.Node)
    imagePos1: cc.Node = null;
    @property(cc.Node)
    imagePos2: cc.Node = null;
    checkGround() {
        var playerPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        this.pos1 = cc.v2(playerPos.x, playerPos.y);
        this.pos2 = cc.v2(this.pos1.x, this.pos1.y - 30);
        this.imagePos1.setPosition(this.imagePos1.parent.convertToNodeSpaceAR(this.pos1));
        this.imagePos2.setPosition(this.imagePos2.parent.convertToNodeSpaceAR(this.pos2));

        var results = cc.director.getPhysicsManager().rayCast(this.pos1, this.pos2, cc.RayCastType.All)
        for (var i = 0; i < results.length; i++) {
            const result = results[i];
            const collider = result.collider;
            if (collider.node.group == "Ground") {
                // this.isGround = true;
                this.doubleJump = false;
                if (!this.isGround) {
                    this.setAnimation("jump_down", false, 1);
                    this.isGround = true;
                }
                return;
            }

        }
        this.animJump();
        this.isGround = false;

    }


    isFaceRight = true;
    onMoveLeft() {
        if (this.isFaceRight) {
            // this.flip();
        }
        this.isFaceRight = false;
        this.moveLeft = true;
    }
    onMoveRight() {
        if (!this.isFaceRight) {
            // this.flip();
        }
        this.isFaceRight = true;
        this.moveRight = true;
    }
    flip() {
        this.node.scaleX *= -1;
    }
    onStop() {

        this.moveLeft = false;
        this.moveRight = false;
        this.animIdle();
    }
    onJump() {
        if (this.isGround) {
            this.rig.linearVelocity = cc.v2(this.rig.linearVelocity.x, this.jumpPow);
            this.doubleJump = false;
        }
        else if (!this.isGround && !this.doubleJump) {
            this.doubleJump = true;
            this.rig.linearVelocity = cc.v2(this.rig.linearVelocity.x, this.powJumpDouble);
        }
    }
    isAttack = false;
    onAttack() {
        if (this.isChangBullet) return;
        this.isAttack = true;
        this.animAttack();
    }
    stopAttack() {
        this.isAttack = false;
        this.animIdle();
    }

    instantBullet() {
        var posBullet = Global.changePosition(this.posBullet, this.node.parent);
        Singleton.POOLING_MANAGER.poolGet(TypePool.Bullet, this.node.parent, posBullet);
    }


    animRun(x: number) {
        if (!this.isGround) return;
        if (x == 1) {
            this.setAnimation(this.run, true, 1);
        }
        else {
            this.setAnimation(this.runback, true, 1);
        }
    }
    animIdle() {
        if (!this.isGround || this.isLose) return;
        if (this.isChangBullet) {
            this.setAnimation(this.idle, true, 1);

        }
        else {
            this.setAnimation(this.idle_attack, true, 1.5);
        }
    }
    animJump() {
        this.setAnimation(this.jump, false, 1);
    }
    animAttack() {
        this.setAnimation(this.idle_attack, true, 0.1);
    }


}
