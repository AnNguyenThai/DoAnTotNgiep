import APILib from "../../API/apiLib";


const { ccclass, property } = cc._decorator;

@ccclass

export default class InputHandler extends cc.Component {

    //Custom Input handler
    @property
    canInterable = true;
    @property({
        visible: function () { return this.canInterable; },
    })
    canClick = false;
    @property({
        visible: function () { return this.canClick; },
    })
    useAudio = false;
    @property({
        visible: function () { return this.canInterable; },
    })
    canSwipe = false;
    @property({
        visible: function () { return this.canSwipe; },
    })
    threadHold: number = 100;
    @property({
        visible: function () { return this.canSwipe; },
    })
    threahHoldTime: number = 0.5;
    @property({
        visible: function () { return this.canInterable; },
    })
    canHold = false;
    @property
    canScale: boolean = false;
    @property({
        visible: function () { return this.canScale; },
    })
    toScale = cc.v2(1.1, 1.1);
    @property({
        visible: function () { return this.canScale; },
    })
    timeScale: number = 0.5;
    @property({
        visible: function () { return this.canScale; },
    })
    flicker = false;


    //Call back
    onHoldCallBack: voidFunc[] = [];
    onSwipeCallBack: voidFunc[] = [];
    onEndCallBack: voidFunc[] = [];
    onStopHoldCallBack: voidFunc[] = [];
    onStartCallBack: voidFunc[] = [];
    onCancelCallBack: voidFunc[] = [];

    //Properties
    deltaMove: cc.Vec2 = cc.v2(0, 0);
    doTween: cc.Tween;
    isClicked: boolean = false;

    onLoad() {
        if (this.canScale && this.flicker) {
            let scaleup = cc.tween(this.node).to(this.timeScale, { scaleX: this.toScale.x, scaleY: this.toScale.y });
            let scaledown = cc.tween(this.node).to(this.timeScale, { scaleX: 1, scaleY: 1 });
            if (APILib.APINetwork() == 'googleads') {
                this.doTween = cc.tween(this.node)
                    .repeat(3,
                        (scaleup)
                            .then(scaledown))
                    .start();
            }
            else {
                this.doTween = cc.tween(this.node)
                    .repeatForever(
                        (scaleup)
                            .then(scaledown))
                    .start();
            }
        }

        this.node.on('touchstart', () => {
            this.isClicked = true;
            this.onStartCallBack.forEach(callback => {
                callback();
            });
            if (this.flicker) this.doTween.stop();
            if (this.canSwipe)
                this.deltaMove = cc.v2(0, 0);
            if (this.canScale)
                cc.tween(this.node).to(this.timeScale, { scaleX: this.toScale.x, scaleY: this.toScale.y })
                    .call(
                        () => {
                            if (this.flicker) this.doTween.start();
                        })
                    .start();
        }, this);

        this.node.on('touchcancel', () => {
            this.isClicked = false;
            this.onCancelCallBack.forEach(callback => {
                callback();
            });
            if (this.canHold)
                this.onStopHoldCallBack.forEach(callback => {
                    callback();
                });
            if (this.flicker) this.doTween.stop();
            if (this.canScale)
                cc.tween(this.node).to(this.timeScale, { scaleX: 1, scaleY: 1 })
                    .call(() => {
                        if (this.flicker) this.doTween.start();
                    })
                    .start();
        }, this);

        this.node.on('touchmove', (e) => {
            if (this.canSwipe) {
                this.deltaMove.x += e.getDeltaX();
                this.deltaMove.y += e.getDeltaY();
            }
        });

        this.node.on('touchend', () => {
            this.isClicked = false;
            if (this.canHold)
                this.onStopHoldCallBack.forEach(callback => {
                    callback();
                });
            this.onEndCallBack.forEach(callback => {
                callback();
            });
            if (this.canSwipe)
                if (this.deltaMove.len() > this.threadHold)
                    this.onSwipeCallBack.forEach(callback => {
                        callback(this.deltaMove);
                    }, this);
            if (this.flicker) this.doTween.stop();
            if (this.canScale)
                cc.tween(this.node).to(this.timeScale, { scaleX: 1, scaleY: 1 })
                    .call(() => {
                        if (this.flicker) this.doTween.start();
                    })
                    .start();
        }, this);

        if (this.useAudio)
            this.node.on('touchstart', this.clickSound, this);
    }
    protected update(dt: number): void {
        if (this.canHold && this.isClicked)
            this.onHoldCallBack.forEach(callback => {
                callback(dt);
            });
    }
    clickSound() {
        // AudioManager.instance.playEffect(TypeAudio.ButtonClick);
    }
}
