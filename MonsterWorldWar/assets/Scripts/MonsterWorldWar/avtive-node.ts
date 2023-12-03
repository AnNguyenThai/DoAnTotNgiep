import Singleton from "../Manager/a-singleton";



const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/AvtiveNode")
export default class AvtiveNode extends cc.Component {


    protected onLoad(): void {
        Singleton.AVTIVE_NODE = this;
    }

    ativeFalse(node:cc.Node) {
        node.active = false;
    }
    ativeTrue() {
        this.node.active = true;
    }

}
