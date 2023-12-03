import APILib from "../API/apiLib";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AndroidIOSBuild extends cc.Component {

    @property(cc.Label)
    gameName:cc.Label=null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(APILib.APIOs()=="ios"){
            this.gameName.string="Bounce Ball 5";
        }
        else{
            this.gameName.string="Roller Ball 5";
        }
    }

    
    // update (dt) {}
}
