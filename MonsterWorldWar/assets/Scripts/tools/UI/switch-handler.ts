const {ccclass, property} = cc._decorator;

@ccclass
export default class SwitchHandler extends cc.Component {

    @property(cc.Node)
    toggleOff:cc.Node = null;
    @property(cc.Node)
    toggleOn:cc.Node = null;
    @property
    isToggled:boolean = true;
    @property
    isCustom:boolean = false;

    onToogleOnCallBack:voidFunc[] = [];
    onToogleOffCallBack:voidFunc[] = [];

    doTweenSwitch :cc.Tween = null;

    start () {
        this.node.on('touchend',this.switchButton,this);
        if(this.isToggled) 
        {
            this.ToogleOn();
        }
        else {
            this.ToogleOff();
        }
    }

    switchButton()
    {
        console.log('change character');
        // AudioManager.instance.playOneShot('swap');
        if(this.isToggled)
        {
            this.isToggled = false;
            this.onToogleOffCallBack.forEach(callback=>{
                callback();
            });
            if(this.isCustom)
            {
                this.ToggleOffCustom();
            }
            else
            {
                this.ToogleOff();
            }
        }
        else
        {
            this.isToggled = true;
            this.onToogleOnCallBack.forEach(callback=>{
                callback();
            });
            if(this.isCustom)
            { 
                this.ToggleOnCustom();
            }
            else
            {
                this.ToogleOn();
            }
        }
    
    }

    ToogleOff() {
        console.log('toogle off');
        this.toggleOff.active = false;
        this.toggleOn.active = true;

    }

    ToogleOn() {
        console.log('toogle on');
        this.toggleOn.active = false;
        this.toggleOff.active = true;
    }
    
    ToggleOnCustom ()
    {
        console.log('toogle on custom');
        this.doTweenSwitch?.stop();
        this.doTweenSwitch = cc.tween(this.toggleOn)
            .to(0.2,{angle:180})
            .call(()=>{
                this.toggleOn.active = false;
                this.toggleOn.angle = 0;
                this.toggleOff.angle = -180;
                this.toggleOff.active = true;
                cc.tween(this.toggleOff)
                    .to(0.2,{angle:0}).start();
                    });
        this.doTweenSwitch.start();
    }

    ToggleOffCustom()
    {
        console.log('toogle off custom');
        this.doTweenSwitch?.stop();
        this.doTweenSwitch = cc.tween(this.toggleOff)
            .to(0.2,{angle:180})
            .call(()=>{
                this.toggleOff.active = false;
                this.toggleOff.angle = 0;
                this.toggleOn.angle = -180;
                this.toggleOn.active = true;
                cc.tween(this.toggleOn)
                    .to(0.2,{angle:0}).start();
            });
        this.doTweenSwitch.start();
    }

}
