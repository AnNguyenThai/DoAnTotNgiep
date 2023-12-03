import Singleton from "../Manager/a-singleton";


const {ccclass, property,menu} = cc._decorator;

@ccclass@menu("MonsterWorldWar/Wall")
export default class Wall extends cc.Component {

  protected onLoad(): void {
      this.node.on(cc.Node.EventType.TOUCH_START,(()=>{
        Singleton.UI_MANAGER.wallPop.active=true;
      }),this)
  }
}
