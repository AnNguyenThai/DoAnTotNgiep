import APILib from "../API/apiLib";
import Bullet from "../MonsterWorldWar/Bullet";
import TelePlayer from "../MonsterWorldWar/TelePlayer";
import CameraHandler from "../tools/Camera/camera-handler";


const {
    ccclass,
    property
} = cc._decorator;

export enum TypeEasing {
    quadIn, //slow-fast : can bac 2
    quadOut, // fast-low
    quadInOut, // slow-fast-slow
    cubicIn, // slow-fast: can bac 3
    cubicOut, // slow-fast
    cubicInOut, //slow-fast-slow
    quartIn, //slow-fast : can bac 4
    quartOut, // fast-low
    quartInOut, //
    quintIn, //slow-fast : can bac 5
    quintOut,
    quintInOut,
    sineIn,
    sineOut,
    sineInOut,
    expoIn,
    expoOut,
    expoInOut,
    circIn,
    circOut,
    circInOut,
    elasticIn,
    elasticOut,
    elasticInOut,
    backIn,
    backOut,
    backInOut,
    bounceIn,
    bounceOut,
    bounceInOut,
    smooth,
    fade
};
@ccclass
export default class Global extends cc.Component {

    static mainCam: CameraHandler = null;
    static particlePool: cc.NodePool = new cc.NodePool();
    static isFirstClick: boolean = true;
    static tele: TelePlayer = null;

    static bullet: Bullet = null;

    // chuyen toa do cua mot node sang he toa do khac
    static changePosition(currentNode: cc.Node, toNode?: cc.Node): cc.Vec3 {
        if (currentNode.parent) {
            var currentPostWorld = currentNode.parent.convertToWorldSpaceAR(currentNode.position);
        }
        else {
            // console.log('Change Pos: '+currentNode.position);

            return currentNode.position;
        }
        if (toNode) {
            var newPosInToNode = toNode.parent.convertToNodeSpaceAR(currentPostWorld);
            // console.log('Change Pos: '+newPosInToNode);
            return newPosInToNode;
        } else {
            // console.log('Change Pos: '+currentPostWorld);
            return currentPostWorld;
        }
    }
    // chuyen mot node sang toa do khac
    static ChangeParent(node: cc.Node, parentNode: cc.Node) {
        var currentPostWorld = node.parent.convertToWorldSpaceAR(node.position);
        var newPosInToNode = parentNode.convertToNodeSpaceAR(currentPostWorld);
        node.setParent(parentNode);
        node.setPosition(newPosInToNode);
    }

    static firstClick() {
        if (!Global.isFirstClick) return;
        Global.isFirstClick = false;
        if (APILib.APINetwork() == "googleads") {
            cc.game.emit('resumAnim');
        }
    }
// random number
    static random(startNumber: number = 0, endNumber: number = 1, isInt = false) {
        if (startNumber == endNumber) return startNumber;
        var number = (endNumber - startNumber) * Math.random();
        number = number + startNumber;
        if (isInt) return Math.round(number);
        return number;
    }

    static changTypeEasing(typeEasing: TypeEasing): string {
        switch (typeEasing) {
            case TypeEasing.quadIn:
                return 'quadIn';
            case TypeEasing.quadOut:
                return 'quadOut';
            case TypeEasing.quadInOut:
                return 'quadInOut';
            case TypeEasing.cubicIn:
                return 'cubicIn';
            case TypeEasing.cubicOut:
                return 'cubicOut';
            case TypeEasing.cubicInOut:
                return 'cubicInOut';
            case TypeEasing.quartIn:
                return 'quartIn';
            case TypeEasing.quartOut:
                return 'quartOut';
            case TypeEasing.quartInOut:
                return 'quartInOut';
            case TypeEasing.quintIn:
                return 'quintIn';
            case TypeEasing.quintOut:
                return 'quintOut';
            case TypeEasing.quintInOut:
                return 'quintInOut';
            case TypeEasing.sineIn:
                return 'sineIn';
            case TypeEasing.sineOut:
                return 'sineOut';
            case TypeEasing.sineInOut:
                return 'sineInOut';
            case TypeEasing.expoIn:
                return 'expoIn';
            case TypeEasing.expoOut:
                return 'expoOut';
            case TypeEasing.expoInOut:
                return 'expoInOut';
            case TypeEasing.circIn:
                return 'circIn';
            case TypeEasing.circOut:
                return 'circOut';
            case TypeEasing.circInOut:
                return 'circInOut';
            case TypeEasing.elasticIn:
                return 'elasticIn';
            case TypeEasing.elasticOut:
                return 'elasticOut';
            case TypeEasing.elasticInOut:
                return 'elasticInOut';
            case TypeEasing.backIn:
                return 'backIn';
            case TypeEasing.backOut:
                return 'backOut';
            case TypeEasing.backInOut:
                return 'backInOut';
            case TypeEasing.bounceIn:
                return 'bounceIn';
            case TypeEasing.bounceInOut:
                return 'bounceInOut';
            case TypeEasing.smooth:
                return 'smooth';
            case TypeEasing.fade:
                return 'fade';
        }
    }
}