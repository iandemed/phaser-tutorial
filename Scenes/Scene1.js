class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame") // identifier for this particular scene
    }

    create() {
        this.add.text(20,20, "Loading game...")
        this.scene.start("playGame")
    }
}