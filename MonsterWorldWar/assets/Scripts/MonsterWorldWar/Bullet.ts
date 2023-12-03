import Singleton from "../Manager/a-singleton";
import AudioManager, { TypeAudio } from "../Manager/audio-manager";
import Global from "../Manager/global";
import { TypePool } from "../Manager/pooling-manager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    @property(cc.RigidBody)
    rig: cc.RigidBody = null;
    // @property
    speed = 1000;
    start() {
        Global.bullet = this;

    }
 
    isDeytroy = false;
    protected update(dt: number): void {
        if (Singleton.GAME_MANAGER_MONSTER.player.isChangBullet && !this.isDeytroy) {
            this.deyTroyBullet();

        }
        this.moveBullet(this.node.angle);

    }
    onBeginContact(contact, self, other) {
        // kiểm tra khi và chạm vào enemy
        if (other.node.group == "Enermy") {
            // bật âm thanh đạn
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Blood);
            // tạo ra hiệu ứng đạn
            let ef = Singleton.POOLING_MANAGER.poolGet(TypePool.EfBullet, this.node.parent, this.node.position.add(cc.v3(100, 0, 0)));
            // phá hủy viên đạn
            this.deyTroyBullet();
            setTimeout(() => {
                // tắt hiệu ứng đạn đi
                Singleton.POOLING_MANAGER.poolPut(TypePool.EfBullet,ef);
            }, 100);

        }
        if (other.node.group == "Ground") {
            let ef = Singleton.POOLING_MANAGER.poolGet(TypePool.EfBullet, this.node.parent, this.node.position.add(cc.v3(100, 0, 0)));
            this.deyTroyBullet();
            setTimeout(() => {
                Singleton.POOLING_MANAGER.poolPut(TypePool.EfBullet,ef);
            }, 100);

        }

    }

    //ham di chuyen vien dan theo huong sang PHAI
    moveBullet(angle: number) {
        var dirBullet = cc.v2(this.speed * Math.cos(angle * Math.PI / 180), this.speed * Math.sin(angle * Math.PI / 180));
        this.rig.linearVelocity = cc.v2(dirBullet);

    }
    deyTroyBullet() {
    
        Singleton.POOLING_MANAGER.poolPut(TypePool.Bullet, this.node);
    }
}
