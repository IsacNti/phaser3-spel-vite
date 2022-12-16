import Phaser from 'phaser'

import ScoreLabel from './ScoreLabel'
import BombSpawner from './BombSpawner'


// tutorial
const GROUND_KEY = 'ground'
const GROUND_KEY1 = 'pellare'
const DUDE_KEY = 'dude'
const STAR_KEY = 'star'
const BOMB_KEY = 'bomb'
const WHEEL = 'wheel'
const WHEEL1 = 'wheelsido'

/*
kom ihåg css för html
    display: grid;
    place-content: center;
    height: 100vh;
    background-color: #333; 
*/
export default class GameScene extends Phaser.Scene
{
	constructor()
	{
		super('game-scene')

        this.player = undefined
        this.cursors = undefined
        this.scoreLabel = undefined
        this.bombSpawner = undefined
        this.stars = undefined

        this.gameOver = false
	}

	preload()
	{
		// skapar bilderna till ett mine så de går använda senare
		this.load.image(WHEEL,'src/assets/wheels.png')
		this.load.image(WHEEL1,'src/assets/wheel1.png')
		this.load.image('sky', 'assets/sky.png')
		this.load.image(GROUND_KEY, 'src/assets/platform.png')
		this.load.image(GROUND_KEY1,'src/assets/upp-ner.png')
        this.load.image(STAR_KEY, 'src/assets/star.png')
        this.load.image(BOMB_KEY, 'src/assets/bomb.png')
		this.load.image('road','src/assets/road.png')
		this.load.image('moon','src/assets/Moon.png')
		this.load.image('label','src/assets/vitback.png')
		this.load.image('hus','src/assets/houses3.png')
s
		this.load.spritesheet(DUDE_KEY,  
			'src/assets/dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		)
	}

	create()
	{
		// skapar bilder så de kommer in i spelet
		const platforms = this.createPlatforms()

		this.add.image(960, 540, 'sky')
		this.add.image(960,580,'hus').setScale(1)
		const whell = this.createWhell()
		this.add.image(90,28,'label').setScale(2)
		this.add.image(960,512,'road')
		this.add.image(1500,100,'moon')
		this.player = this.createPlayer()
        this.stars = this.createStars()
		// gör så de finns score som syns
        this.scoreLabel = this.createScoreLabel(16, 16, 0)

        this.bombSpawner = new BombSpawner(this, BOMB_KEY)
        const bombsGroup = this.bombSpawner.group

		this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.stars, platforms)
		this.physics.add.collider(bombsGroup, platforms)
        this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this)
		this.physics.add.collider(this.player, whell)
		this.physics.add.collider(this.stars, whell)
		this.physics.add.collider(bombsGroup, whell)

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        
        this.cursors = this.input.keyboard.createCursorKeys()
	}



    createPlatforms()
	{
		// skapar platfromarna som gubben inte kan gå igenom
		const platforms = this.physics.add.staticGroup()

		platforms.create(400, 1058, GROUND_KEY).setScale(10).refreshBody()
		// marken
		platforms.create(660, 380, GROUND_KEY).setScale(0.4).refreshBody()
		//första husets top
		platforms.create(150, 246, GROUND_KEY1).setScale(0.6).refreshBody()
		platforms.create(50, 120, GROUND_KEY).setScale(0.6).refreshBody()
		platforms.create(40, 380, GROUND_KEY).setScale(0.6).refreshBody()

		//första huset bot
		platforms.create(50, 540, GROUND_KEY).setScale(0.4).refreshBody()
		platforms.create(146,770,GROUND_KEY1).setScale(0.9).refreshBody()
		platforms.create(130,562,GROUND_KEY1).setScale(0.1).refreshBody()


		//andra husets top
		platforms.create(1142, 340, GROUND_KEY).setScale(0.8).refreshBody()
		platforms.create(830, 340, GROUND_KEY).setScale(0.8).refreshBody()
		platforms.create(660, 380, GROUND_KEY).setScale(0.4).refreshBody()
		platforms.create(596, 430, GROUND_KEY).setScale(0.4).refreshBody()
		platforms.create(530, 465, GROUND_KEY).setScale(0.4).refreshBody()
		platforms.create(480, 500, GROUND_KEY).setScale(0.4).refreshBody()

		//andra huset  kroppen vänster del
		platforms.create(460, 710, GROUND_KEY1).setScale(1).refreshBody()
		platforms.create(460, 510, GROUND_KEY1).setScale(0.2).refreshBody()
		platforms.create(524, 470, GROUND_KEY1).setScale(0.2).refreshBody()
		platforms.create(584, 420, GROUND_KEY1).setScale(0.2).refreshBody()
		platforms.create(676, 390, GROUND_KEY1).setScale(0.2).refreshBody()

		// höger del
		platforms.create(1030, 710, GROUND_KEY1).setScale(1).refreshBody()
		platforms.create(1220, 810, GROUND_KEY1).setScale(0.4).refreshBody()
		platforms.create(1220, 445, GROUND_KEY1).setScale(0.5).refreshBody()
		platforms.create(1030, 730, GROUND_KEY).setScale(1).refreshBody()
		platforms.create(1030, 560, GROUND_KEY).setScale(1).refreshBody()
		platforms.create(1234, 810, GROUND_KEY).setScale(0.3).refreshBody()
		platforms.create(1284, 870, GROUND_KEY1).setScale(0.3).refreshBody()
		platforms.create(1220, 456, GROUND_KEY).setScale(0.3).refreshBody()
		platforms.create(1240, 500, GROUND_KEY).setScale(0.3).refreshBody()
		platforms.create(1274, 478, GROUND_KEY1).setScale(0.1).refreshBody()

		// tredje huset
		platforms.create(1590, 730, GROUND_KEY1).setScale(2.1).refreshBody()
		platforms.create(1760, 170, GROUND_KEY).setScale(0.5).refreshBody()
		platforms.create(1698, 220, GROUND_KEY).setScale(0.5).refreshBody()
		platforms.create(1860, 120, GROUND_KEY).setScale(0.5).refreshBody()
		platforms.create(1780, 180, GROUND_KEY1).setScale(0.3).refreshBody()
		platforms.create(1670, 240, GROUND_KEY1).setScale(0.3).refreshBody()
		platforms.create(1610, 280, GROUND_KEY1).setScale(0.3).refreshBody()

        return platforms
	}

	createWhell()
	{
		const whell = this.physics.add.staticGroup()

		// deck mellan försa och andra huset
		whell.create(400, 750, WHEEL1).setScale(0.5).refreshBody()
		whell.create(200, 670, WHEEL1).setScale(0.5).refreshBody()
		whell.create(200, 370, WHEEL1).setScale(0.5).refreshBody()
		whell.create(200, 200, WHEEL1).setScale(0.5).refreshBody()
		whell.create(480, 390, WHEEL).setScale(0.6).refreshBody()
		whell.create(400, 610, WHEEL1).setScale(0.5).refreshBody()
		whell.create(290, 850, WHEEL).setScale(0.5).refreshBody()

		// andra tredje huset
		whell.create(1430, 830, WHEEL).setScale(0.5).refreshBody()
		whell.create(1510, 630, WHEEL1).setScale(0.5).refreshBody()
		whell.create(1510, 460, WHEEL1).setScale(0.5).refreshBody()

		return whell
	}


    createPlayer()
	{
		// skapar gubben
		const player = this.physics.add.sprite(100, 450, DUDE_KEY)
		player.setBounce(0.2)
		player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: DUDE_KEY, frame: 4 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})

        return player
	}
    update()
	{
		if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-160)

			this.player.anims.play('left', true)
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160)

			this.player.anims.play('right', true)
		}
		else
		{
			this.player.setVelocityX(0)

			this.player.anims.play('turn')
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-330)
		}
        if (this.gameOver)
		{
			return
		}
	}
    createStars()
	{
		const stars = this.physics.add.group({
			key: STAR_KEY,
			repeat: 14,
			setXY: { x: 30, y: 0, stepX: 130 }
		})
		
		stars.children.iterate((child) => {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		})

		return stars
	}
    collectStar(player, star)
	{
		star.disableBody(true, true)

        this.scoreLabel.add(10)

        if (this.stars.countActive(true) === 0)
		{
			//  A new batch of stars to collect
			this.stars.children.iterate((child) => {

                //  Give each star a slightly different bounce
				child.enableBody(true, child.x, 0, true, true)			})
		}
        this.bombSpawner.spawn(player.x)
	}
    createScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: '#000' }
		const label = new ScoreLabel(this, x, y, score, style)

		this.add.existing(label)

		return label
	}
    hitBomb(player, bomb)
	{
		this.physics.pause()

		player.setTint(0xff0000)

		player.anims.play('turn')

		this.gameOver = true
	}
}