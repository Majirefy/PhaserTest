import { State } from "phaser-ce";

export class Title extends State {
    public create(): void {
        this.game.camera.flash(0x000000, 1000);
        this.game.add.sound("title", 1, true).play();
        this.game.add.image(this.game.world.centerX, this.game.world.centerY / 4, "logo").anchor.setTo(0.5, 0);

        this.game.add.button(this.game.world.centerX, this.game.world.centerY * 3 / 2,
            "buttons", this.startGame, this, 7, 6, 7).anchor.setTo(0.5);
    }

    private startGame(): void {
        // Fade out screen and change to main state.
        this.game.camera.fade(0x000000, 1000);
        this.game.camera.onFadeComplete.addOnce(() => {
            this.game.state.start("main");
        }, this);
    }
}
