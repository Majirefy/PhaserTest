import { State } from "phaser-ce";

export class Preload extends State {
    public preload() {
        this.game.load.image("logo", "../../assets/images/system/Logo.png");
        this.game.load.spritesheet("sounds", "../../assets/images/system/Sound.png", 256, 256);
        this.game.load.spritesheet("buttons", "../../assets/images/system/Buttons.png", 320, 80);
        this.game.load.image("red", "../../assets/images/components/Red.png");
        this.game.load.image("yellow", "../../assets/images/components/Yellow.png");
        this.game.load.image("green", "../../assets/images/components/Green.png");
        this.game.load.image("blue", "../../assets/images/components/Blue.png");
        this.game.load.spritesheet("circle", "../../assets/images/components/Circles.png", 250, 250);
        this.game.load.spritesheet("arrow", "../../assets/images/components/Arrows.png", 250, 250);

        this.game.load.audio("title", "../../assets/audio/bgm/title.mp3");

        // Splash screen image.
        const splash = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "splash");
        splash.anchor.setTo(0.5);

        // Progress bar.
        const progressBar = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY * 5 / 3,
            "progressBar");
        progressBar.anchor.setTo(0, 0.5);
        progressBar.x -= progressBar.width * 0.5;
        this.game.load.setPreloadSprite(progressBar);
    }

    public create(): void {
        // Fade out screen and change to title state.
        this.game.camera.fade(0x000000, 1000);
        this.game.camera.onFadeComplete.addOnce(() => {
            this.game.state.start("title");
        }, this);
    }
}
