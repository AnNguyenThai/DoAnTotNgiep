const {
    ccclass,
    property
} = cc._decorator;
@ccclass
export default class JoystickHandler extends cc.Component {
    @property(cc.Node)
    root: cc.Node = null;
    @property(cc.Node)
    handle: cc.Node = null;
    direction: cc.Vec2 = cc.v2(0, 0);
    isUsed: boolean = false;
    radious: number = 1;
    onMoveCallBack: voidFunc[] = [];
    onStopMoveCallBack: voidFunc[] = [];
    protected onLoad(): void {
        this.handle.on('touchstart', this.onTouchStart, this);
        this.handle.on('touchmove', this.onTouchMove, this);
        this.handle.on('touchend', this.onTouchEnd, this);
        this.handle.on('touchcancel', this.onTouchCancel, this);
        this.radious = Math.max(this.root.width * 0.5, this.root.height * 0.5);
    }
    protected onDestroy(): void {
        this.handle.off('touchstart', this.onTouchStart, this);
        this.handle.off('touchmove', this.onTouchMove, this);
        this.handle.off('touchend', this.onTouchEnd, this);
        this.handle.off('touchcancel', this.onTouchCancel, this);

    }

    protected update(dt: number): void {
        if (this.isUsed) {
            this.onMoveCallBack.forEach(callback => {
                callback(cc.v2(this.direction.x * dt, this.direction.y * dt));
            });
        }
    }

    onTouchStart() {
        this.isUsed = true;
    }

    onTouchMove(dt: cc.Event.EventTouch) {
        let x = this.handle.x + dt.getDeltaX();
        let y = this.handle.y + dt.getDeltaY();
        let distant = Math.sqrt(x * x + y * y);
        if (distant <= this.radious) {
            this.handle.x = x;
            this.handle.y = y;
        }
        x = x / this.radious;
        y = y / this.radious;

        this.direction.x = x;
        this.direction.y = y;

    }

    onTouchEnd() {
        this.isUsed = false;
        this.handle.x = 0;
        this.handle.y = 0;
        this.direction = cc.v2(0, 0);
        this.onStopMoveCallBack.forEach(callback => {
            callback();
        });
    }

    onTouchCancel() {
        this.isUsed = false;
        this.handle.x = 0;
        this.handle.y = 0;
        this.direction = cc.v2(0, 0);
        this.onStopMoveCallBack.forEach(callback => {
            callback();
        });
    }
}
