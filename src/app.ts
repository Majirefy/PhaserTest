import { IGameConfig, ScaleManager } from "phaser-ce";
import { MyGame } from "./mygame";

declare class WebFont {
    public static load(options: object): void;
}

window.onload = () => {
    const gameWidth = 1080;
    const gameHeight = 1920;

    const gameConfig: IGameConfig = {
        height: gameHeight, parent: "", renderer: Phaser.AUTO, resolution: 1, width: gameWidth,
    };

    WebFont.load({
        active: () => {
            const game = new MyGame(gameConfig);
        },
        custom: {
            families: ["SongTi"],
            urls: ["assets/fonts/font.css"],
        },
    });
};
