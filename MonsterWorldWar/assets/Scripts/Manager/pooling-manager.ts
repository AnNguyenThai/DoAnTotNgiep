import Singleton from "./a-singleton";
export enum TypePool {
    Bullet,
    PlayerTele,
    Meoteo,
    Electronic,
    Wall,
    EfBullet,
    Enemy1,
    EfDieE,
    Lazer,
    Enemy2,
    Enemy3,
    Enemy4,
    Boss

};

const { ccclass, property, menu } = cc._decorator;
@ccclass('Prefabs')
class Objects {
    @property({ type: cc.Enum(TypePool) })
    typeObject: TypePool = TypePool.Bullet;

    @property({
        type: cc.Prefab,
    })
    prefab: cc.Prefab = null;
    @property()
    sizePool: number = 10;
}
@ccclass
@menu('Dmobin/Game/PoolingManager')
export default class PoolingManager extends cc.Component {
    @property({
        type: [Objects],
        visible: true,
        serializable: true,

    })
    listObject: Objects[] = [];

    poolMap: Map<string, cc.NodePool> = new Map<string, cc.NodePool>();

    onLoad() {
        // if (Singleton.POOLING_MANAGER) {
        //     this.destroy();
        // }
        // else {
            Singleton.POOLING_MANAGER = this;
        // }
 

    }




    protected start(): void {
        this.listObject.forEach((obj) => {
            if (!this.poolMap.has(obj.typeObject.toString())) {
                this.poolMap.set(obj.typeObject.toString(), new cc.NodePool());
            }
            else {
                this.poolMap.get(obj.typeObject.toString());

            }

        });
        this.listObject.forEach(obj => {
            this.createPool(obj.typeObject, obj.sizePool, obj.prefab);
        });
    }

    createPool(type: TypePool, size: number, object: any) {
        let i = size;
        while (i > 0) {
            let item = cc.instantiate(object);

            if (!this.poolMap.has(type.toString())) {
                this.poolMap.set(type.toString(), new cc.NodePool);
            }

            else {
                this.poolMap.get(type.toString()).put(item);
            }
            i--;
        }
    }

    poolPut(type: TypePool, obj: any) {
        if (!this.poolMap.has(type.toString())) {
            console.log("Does not exist Pool as name " + type);
            this.poolMap.set(type.toString(), new cc.NodePool);
            this.poolPut(type, obj);
        }

        else {
            this.poolMap.get(type.toString()).put(obj);
        }

    }

    poolGet(type: TypePool, parent: cc.Node, pos: cc.Vec3) {

        if (!this.poolMap.has(type.toString())) {
            console.log("Does not exist Pool as name " + type);
            this.poolMap.set(type.toString(), new cc.NodePool);
        }

        else {
            if (this.poolMap.get(type.toString()).size() > 0) {
                let obj = this.poolMap.get(type.toString()).get();
                obj.setParent(parent);
                obj.setPosition(pos);
                return obj;

            }

            else {
                this.listObject.forEach(element => {
                    if (element.typeObject == type) {
                        let item = cc.instantiate(element.prefab);
                        this.poolPut(type, item);
                        console.log(this.poolMap.get(type.toString()).size());
                        let obj = this.poolMap.get(type.toString()).get();
                        obj.setParent(parent);
                        obj.setPosition(pos);
                        return obj;

                    }

                });

            }

        }

    }

}
