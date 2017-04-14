import { Game, IGameConfig, Physics, ScaleManager } from "phaser-ce";
import { Boot } from "./states/boot";
import { Main } from "./states/main";
import { Preload } from "./states/preload";
import { Title } from "./states/title";

/**
 * This is custom game class.
 * * The default game screen width is 1080px and screen height is 1920px if no configuration provided.
 */
export class MyGame extends Game {
    /**
     * This is custom game class.
     * The default game screen width is 1080px and screen height is 1920px if no configuration provided.
     * @param gameConfig Game configuration.
     */
    constructor(gameConfig?: IGameConfig) {
        if (gameConfig == null) {
            super(1080, 1920, Phaser.AUTO, "");
        } else {
            super(gameConfig);

            // Add all game states.
            this.state.add("boot", Boot);
            this.state.add("preload", Preload);
            this.state.add("title", Title);
            this.state.add("main", Main);

            // Start game.
            this.state.start("boot");
        }
    }
}
