declare module "GlobalData" {
    interface GameData {
        score: number;
        playerLives: number;
        // Các thông tin khác
    }

    const data: GameData;
    export default data;
}