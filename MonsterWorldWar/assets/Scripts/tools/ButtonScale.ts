import APILib from "../API/apiLib";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonScale extends cc.Component {

    @property([cc.Vec2])
    listScaleSize:cc.Vec2[]=[cc.v2(1,1),cc.v2(1.1,1.1)]

    @property timeScale=0.5;
    @property isCheckGoogle=false;

    
    protected start(): void {
        this.scale();
    }
    
    curentIndex=0;
    @property
    isScale=true;
    scale(){
        if(this.isCheckGoogle && APILib.APINetwork()=="googleads") return;
        if(this.curentIndex>=this.listScaleSize.length) this.curentIndex=0;
        if(this.isScale){
            cc.tween(this.node)
            .to(
                this.timeScale,
                {scaleX:this.listScaleSize[this.curentIndex].x, scaleY:this.listScaleSize[this.curentIndex].y}
            )
            .call(()=>{
                this.curentIndex++;
                this.scale();
            })
            .start()
        }
        else{
            this.curentIndex=0;
            cc.tween(this.node)
            .to(
                this.timeScale,
                {scaleX:this.listScaleSize[this.curentIndex].x, scaleY:this.listScaleSize[this.curentIndex].y}
            )
            .call(()=>{
            })
            .start()
        }
        
        
    }

    setDisable(){
        this.isScale=false;
    }

    setEnable(){
        this.isScale=true;
        this.scale();
    }

   
}
