class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame")
    }

    create (){
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background")
        this.background.setOrigin(0,0)

        this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, "ship")
        this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2")
        this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3")

        /* --- Create the animations for the ships --- */
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1 // infite loop
        })
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        })

        /* --- Create the animations for the power-ups --- */
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2, // specifiy these options so we can create 2 objects with the same sprite file
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        })

        this.powerUps = this.physics.add.group()

        /* Create the number of power-ups we want */
        let maxObjects = 4
        for (let i = 0; i <= maxObjects; i++){
            let powerUp = this.physics.add.sprite(16,16, "power-up")
            this.powerUps.add(powerUp)
            powerUp.setRandomPosition(0,0, game.config.width, game.config.height) // put them at a random position on the screen
        
            if (Math.random() > 0.5){
                powerUp.play("red")
            } else {
                powerUp.play("gray")
            }

            powerUp.setVelocity(100, 100)
        }

        
        /* --- Play the animations --- */
        this.ship1.play("ship1_anim")
        this.ship2.play("ship2_anim")
        this.ship3.play("ship3_anim")

        this.ship1.setInteractive()
        this.ship2.setInteractive()
        this.ship3.setInteractive()

        this.input.on('gameobjectdown', this.destroyShip, this)

    }

    moveShip(ship, speed){
        ship.y += speed

        if (ship.y > config.height){
            this.resetShipPos(ship)
        }
    }

    update() {
        this.moveShip(this.ship1, 1)
        this.moveShip(this.ship2, 1)
        this.moveShip(this.ship3, 1)

        this.background.tilePositionY -= 0.5
    }

    resetShipPos(ship){
        ship.y = 0
        let randomX = Phaser.Math.Between(0, config.width)
        ship.x = randomX
    }

    destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion")
        gameObject.play("explode")
    }
}
