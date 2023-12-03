
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/AddPersistRootNode")
export default class AddPersistRootNode extends cc.Component {

    protected onLoad(): void {
        // Làm cho node k bị xóa khi chuyển scene
        cc.game.addPersistRootNode(this.node);
    }
}
