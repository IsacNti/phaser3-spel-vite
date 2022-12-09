import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import GameScene from './GameScene'

const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1000,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	scene: [GameScene, HelloWorldScene]
}

export default new Phaser.Game(config)