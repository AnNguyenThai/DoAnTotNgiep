import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";
import { TypePool } from "../Manager/pooling-manager";
import Bullet from "./Bullet";
import Player from "./Player";


const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("MonsterWorldWar/GameManagerMonster")
export default class GameManagerMonster extends cc.Component {
    protected onLoad(): void {
        // GameManagerMonster.self = this;
        // Singleton.AUDIO_MANAGER.stopMusic();
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGM);
        cc.director.getPhysicsManager().enabled = true;

        var collider = cc.director.getCollisionManager();
        collider.enabled = true;
        // collider.enabledDebugDraw = true;

        // if (Singleton.GAME_MANAGER_MONSTER) {
        //     this.destroy();
        //     console.log("destroy game manager");

        // }
        // else {
        Singleton.GAME_MANAGER_MONSTER = this;
        // }
    }
    canInstanceWall = true;
    @property([cc.Prefab])
    listBullet: cc.Prefab[] = [];
    @property(Player)
    player: Player = null;
    isPause = false;
    @property(cc.Node)
    handTUT: cc.Node = null;
    @property(cc.Label)
    score: cc.Label = null;
    @property(cc.Node)
    tutGun: cc.Node = null;
    numscore = 1000000;
    canMove = false;
    // Hàm thay đổi loại đạn
    changeBulletLv(x) {
        switch (x) {
            case 1:
                Singleton.POOLING_MANAGER.listObject.forEach(element => {
                    if (element.typeObject == TypePool.Bullet) {
                        // Xóa hết đạn cũ trong pool và thay đạn mới vào
                        Singleton.POOLING_MANAGER.poolMap.get(TypePool.Bullet.toString()).clear();
                        
                        element.prefab = this.listBullet[0];
                    }
                });
                break;
            case 2:
                Singleton.POOLING_MANAGER.listObject.forEach(element => {
                    if (element.typeObject == TypePool.Bullet) {
                        Singleton.POOLING_MANAGER.poolMap.get(TypePool.Bullet.toString()).clear();
                        element.prefab = this.listBullet[1];
                    }
                });
                break;
            case 3:
                Singleton.POOLING_MANAGER.listObject.forEach(element => {
                    if (element.typeObject == TypePool.Bullet) {
                        Singleton.POOLING_MANAGER.poolMap.get(TypePool.Bullet.toString()).clear();
                        element.prefab = this.listBullet[2];
                    }
                });
                break;
            case 4:
                Singleton.POOLING_MANAGER.listObject.forEach(element => {
                    if (element.typeObject == TypePool.Bullet) {
                        Singleton.POOLING_MANAGER.poolMap.get(TypePool.Bullet.toString()).clear();
                        element.prefab = this.listBullet[3];
                    }
                });
                break;
            case 5:
                Singleton.POOLING_MANAGER.listObject.forEach(element => {
                    if (element.typeObject == TypePool.Bullet) {
                        Singleton.POOLING_MANAGER.poolMap.get(TypePool.Bullet.toString()).clear();
                        element.prefab = this.listBullet[4];
                    }
                });
                break;

            default:
                break;
        }

    }


}
