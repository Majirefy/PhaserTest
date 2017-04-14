import { Group, Image, Physics, Pointer, Sprite, State } from "phaser-ce";

export class Main extends State {
    private circle: Image = null;
    private arrow: Sprite = null;
    private blockGroup: Group = null;

    private speed: number = 200;

    public create(): void {
        this.game.camera.flash(0x000000, 1000);
        const red = this.game.add.image(0, 0, "red");
        const yellow = this.game.add.image(0, 256, "yellow");
        const green = this.game.add.image(256, 0, "green");
        const blue = this.game.add.image(256, 256, "blue");

        // Set blocks' name.
        red.name = "red";
        yellow.name = "yellow";
        green.name = "green";
        blue.name = "blue";

        // Enable blocks' input.
        red.inputEnabled = true;
        yellow.inputEnabled = true;
        green.inputEnabled = true;
        blue.inputEnabled = true;

        // Set input handler of blocks.
        red.events.onInputDown.add(this.tapBlock, this);
        yellow.events.onInputDown.add(this.tapBlock, this);
        green.events.onInputDown.add(this.tapBlock, this);
        blue.events.onInputDown.add(this.tapBlock, this);

        // Add blocks to group.
        this.blockGroup = this.game.add.group();
        this.blockGroup.add(red);
        this.blockGroup.add(yellow);
        this.blockGroup.add(green);
        this.blockGroup.add(blue);

        // Set position of block group.
        this.blockGroup.x = this.game.world.centerX - (this.blockGroup.width / 2);
        this.blockGroup.y = this.game.world.centerY + (this.blockGroup.height / 3);

        // Add circle and initialize it to white.
        this.circle = this.game.add.image(this.game.world.centerX, this.game.world.centerY / 3, "circle");
        this.circle.anchor.setTo(0.5);
        this.circle.frame = 4;

        // Reset circle when tap released.
        this.game.input.onUp.add(this.resetCircle, this);

        // Add arrow randomly.
        this.arrow = this.game.add.sprite(0, 0, "arrow");
        this.arrow.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.arrow);
        this.randomizeArrow();
    }

    public update(): void {
        const destinationX = Math.abs(this.arrow.x - this.circle.x);
        const destinationY = Math.abs(this.arrow.y - this.circle.y);

        if (destinationX < 125 && destinationY < 125) {
            if (this.arrow.frame === this.circle.frame) {
                this.randomizeArrow();
            }
        }
    }

    /**
     * Determine which block is tapped.
     * @param block Tapped color block.
     * @param pointer Pointer of tapped aera.
     */
    private tapBlock(block: Image, pointer: Pointer): void {
        switch (block.name) {
            case "red":
                this.circle.frame = 0;
                break;
            case "yellow":
                this.circle.frame = 1;
                break;
            case "green":
                this.circle.frame = 2;
                break;
            case "blue":
                this.circle.frame = 3;
                break;
            default:
                this.circle.frame = 4;
                break;
        }
    }

    /**
     * Reset circle to white.
     * @param pointer Pointer of object.
     * @param event Event.
     */
    private resetCircle(pointer: Pointer, event: Event): void {
        this.circle.frame = 4;
    }

    /**
     * Random arrow initial position and velocity.
     */
    private randomizeArrow(): void {
        const color = this.game.rnd.integerInRange(0, 5);
        const x = this.game.rnd.integerInRange(0, this.game.world.width);
        const y = this.game.rnd.integerInRange(0, this.blockGroup.y - (this.arrow.height / 2));
        this.arrow.frame = color;
        this.arrow.x = x;
        this.arrow.y = y;

        const rotation = this.game.physics.arcade.moveToXY(this.arrow, this.circle.x, this.circle.y, this.speed);
        this.arrow.rotation = rotation;
    }
}
