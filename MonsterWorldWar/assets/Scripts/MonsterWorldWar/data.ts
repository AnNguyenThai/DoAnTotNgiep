import Singleton from "../Manager/a-singleton";
import { TypeAudio } from "../Manager/audio-manager";



const { ccclass, property } = cc._decorator;

@ccclass
export default class Data extends cc.Component {

    protected onLoad(): void {
        this.setData();
        // this.clearData();

    }
    protected start(): void {
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMmenu);
    }

    clearData() {
        console.log("ClearData");

        cc.sys.localStorage.clear();
        this.setData();
        Singleton.LOADSCENES.LoadScenes("menu");
    }

    setData() {
        // Tạo data lưu lại điểm đạt được
        const Score = {
            score: 10000000,
        };
        var jsonScore = localStorage.getItem("Score");
        if (jsonScore == null) {
            console.log("SET DATA SCORE");
            const jsonScore = JSON.stringify(Score);
            localStorage.setItem("Score", jsonScore);
        }

        // Tạo data lưu lại level hiện tại
        const ClassLV = {
            curentLV: 1,
            nextLV: 2,
        };
        var jsonDataLV = localStorage.getItem("Level");
        if (jsonDataLV == null) {
            console.log("SET DATA LV");
            const dataLV = JSON.stringify(ClassLV);
            localStorage.setItem('Level', dataLV);
        }
 
    }
    resetData() {
        // reset lại lại data
        var jsonScore = localStorage.getItem("Score");
        var jsonDataLV = localStorage.getItem("Level");
        var DataScore = JSON.parse(jsonScore);
        var DataLevel = JSON.parse(jsonDataLV);

        if (jsonScore != null) {
            DataScore.score = 100000;
            localStorage.setItem("Score", JSON.stringify(DataScore));
        }
        if (jsonDataLV != null) {
            DataLevel.curentLV = 1;
            DataLevel.nextLV = 2;
            localStorage.setItem("Level", JSON.stringify(DataLevel));
        }
       
    }

}
