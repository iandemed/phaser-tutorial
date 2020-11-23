/* --- Set-up the basics of the game file --- */
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 272,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    /* Scenes are places where the elements of the game live - we can have a 
        variety of scences in our game and a variety running at the same time*/
    scene: [Scene1, Scene2]
};

var game = new Phaser.Game(config);

