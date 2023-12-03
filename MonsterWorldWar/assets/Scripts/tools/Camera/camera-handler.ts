import Global from "../../Manager/global";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraHandler extends cc.Component {
    @property(cc.Node)
    left: cc.Node = null;

    @property(cc.Node)
    right: cc.Node = null;

    @property(cc.Node)
    top: cc.Node = null;

    @property(cc.Node)
    bottom: cc.Node = null;

    target: cc.Vec3 = null;

    leftPos: cc.Vec3 = null;
    rightPos: cc.Vec3 = null;
    topPos: cc.Vec3 = null;
    bottomPos: cc.Vec3 = null;

    oldTarget: cc.Vec3 = null;
    heightRecWindow = 100;
    widthRecWindow = 50;
    cam: cc.Camera = null;
    anim: cc.Animation = null;
    cameraWidth = 0;
    cameraHeight = 0;


    protected start(): void {
        Global.mainCam = this;
        this.oldTarget = this.node.position;
        this.cam = this.getComponent(cc.Camera);
        this.anim = this.getComponent(cc.Animation);
        this.leftPos = Global.changePosition(this.left, this.node);
        this.rightPos = Global.changePosition(this.right, this.node);
        this.topPos = Global.changePosition(this.top, this.node);
        this.bottomPos = Global.changePosition(this.bottom, this.node);
    }

    moveForX() {
        var newTarget = new cc.Vec3(this.target.x, this.node.y, this.target.z);
        var currentPositon = this.node.position;
        currentPositon.lerp(newTarget, 0.05, currentPositon);
        this.node.setPosition(currentPositon);
        this.oldTarget = currentPositon;
    }

    moveForY() {
        var newTarget = new cc.Vec3(this.node.x, this.target.y, this.target.z);
        var currentPositon = this.node.position;
        currentPositon.lerp(newTarget, 0.01, currentPositon);
        this.node.setPosition(currentPositon);
        this.oldTarget = currentPositon;
    }

    update(dt) {
        // console.log('camposition'+this.node.position);
        
        this.target = Global.changePosition(Global.gameManager.player, this.node);
        this.checkBoundCamera();
        if (Math.abs(this.oldTarget.y - this.target.y) > this.heightRecWindow) {
            this.moveForY();
        }
        if (Math.abs(this.oldTarget.x - this.target.x) > this.widthRecWindow) {
            this.moveForX();
        }
    }

    checkBoundCamera() {
        this.cameraWidth = cc.winSize.width / (2 * this.cam.zoomRatio);
        this.cameraHeight = cc.winSize.height / (2 * this.cam.zoomRatio);

        if (this.target.x - this.cameraWidth < this.leftPos.x) {
            this.target.x = this.leftPos.x + this.cameraWidth;
        }
        if (this.target.x + this.cameraWidth > this.rightPos.x) {
            this.target.x = this.rightPos.x - this.cameraWidth;
        }
        if (this.target.y + this.cameraHeight > this.topPos.y) {
            this.target.y = this.topPos.y - this.cameraHeight;
        }
        if (this.target.y - this.cameraHeight < this.bottomPos.y) {
            this.target.y = this.bottomPos.y + this.cameraHeight;
        }
    }
    shake() {
        // this.anim.play('camShake');
    }
}
