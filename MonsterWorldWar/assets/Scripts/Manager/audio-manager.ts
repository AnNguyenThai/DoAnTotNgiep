
import Singleton from "./a-singleton";
const {
    ccclass,
    property,
} = cc._decorator;
export enum TypeAudio {
    ButtonClick,
    Blood,
    BGM,
    Hurt,
    gunshort,
    lose,
    win,
    Lazer,
    Electronic,
    Fire,
    Meoteo,
    BGMmenu,

};


@ccclass('ClipAudio')
class ClipAudio {
    @property({
        type: cc.Enum(TypeAudio)
    })
    clipName: TypeAudio = TypeAudio.ButtonClick;

    @property({
        type: cc.AudioClip,
    })
    clips: cc.AudioClip[] = [];
}

@ccclass
export default class AudioManager extends cc.Component {
    static isMute = false;
    static deviceVolumn = 0;

    @property({
        type: [ClipAudio],
        visible: true,
        serializable: true
    })
    musics: ClipAudio[] = [];
    idAudio: number[] = [];
    @property({
        type: [ClipAudio],
        visible: true,
        serializable: true
    })
    sounds: ClipAudio[] = [];

    lastAudioID: number = -1;
    @property(cc.Node)
    musicOn: cc.Node = null;
    @property(cc.Node)
    musicOff: cc.Node = null;

    disabledMusic() {
        this.musicOn.active = true;
        this.musicOff.active = false;
        cc.audioEngine.setEffectsVolume(0);
        cc.audioEngine.setMusicVolume(0);
    }
    enabledMusic() {
        this.musicOn.active = false;
        this.musicOff.active = true;
        cc.audioEngine.setEffectsVolume(1); 
        cc.audioEngine.setMusicVolume(1);
    }



    onLoad() {
        Singleton.AUDIO_MANAGER = this;

    }

    audioVolumeChangeCallback(volume) {
        let isAudioEnabled = !!volume;
        AudioManager.isMute = false;
        if (isAudioEnabled) {
            AudioManager.enabledAudio();
        } else {
            AudioManager.disabledAudio();
        }

    }
    static disabledAudio() {
        console.log('disable Audio');
        AudioManager.isMute = true;
        AudioManager.deviceVolumn = 0;
        cc.audioEngine.setMusicVolume(0);
        cc.audioEngine.setEffectsVolume(0);
    }
    static enabledAudio() {
        console.log('enable Audio : ' + AudioManager.deviceVolumn);
        AudioManager.isMute = false;

        cc.audioEngine.setMusicVolume(AudioManager.deviceVolumn);
        cc.audioEngine.setEffectsVolume(AudioManager.deviceVolumn);
    }

    // Chi chay 1 music clip trong 1 luc
    // stopMusic de stop nhac dang dung
    playMusic(name: TypeAudio, loop: boolean = true) {

        this.musics.forEach(music => {
            if (music.clipName == name) {
                let clip = music.clips[Math.floor(Math.random() * (music.clips.length - 1) + 0.5)];
                cc.audioEngine.playMusic(clip, loop);
                return;
            }

        });
    }


    // Chay duoc nhieu Audio cung mot luc.
    // stopLastOneShot dung audio vua xuat hien
    // continous xet audio phia truoc xem co giong khong. Neu giong thi khong chay
    lastEffectName = TypeAudio.ButtonClick;
    playEffect(name: TypeAudio, loop: boolean = false, continuous: boolean = false) {
        if (continuous && this.lastEffectName == name) return;
        for (var i = 0; i < this.sounds.length; i++) {
            if (this.sounds[i].clipName == name) {
                this.lastAudioID = cc.audioEngine.playEffect(this.sounds[i].clips[Math.floor(Math.random() * (this.sounds[i].clips.length - 1) + 0.5)], false);
                this.lastEffectName = name;
                this.idAudio[i] = this.lastAudioID;
                return;
            }
        }
    }

    stopAll() {
        cc.audioEngine.stopAll();
    }
    stopMusic() {
        cc.audioEngine.stopMusic();
    }
    stopAllEffect() {
        cc.audioEngine.stopAllEffects();
    }
    stopLastAudioID() {
        cc.audioEngine.stopEffect(this.lastAudioID);
    }
    stopOneEffect(name: TypeAudio) {
        for (var i = 0; i < this.sounds.length; i++) {
            if (this.sounds[i].clipName == name) {
                cc.audioEngine.stop(this.idAudio[i]);
            }
        }
    }
}