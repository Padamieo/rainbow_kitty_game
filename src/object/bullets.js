import Phaser from 'phaser';
import Bullet from 'object/bullet';

class Bullets extends Phaser.GameObjects.Group {
	constructor(scene) {
		super(scene, Bullet, {
			classType: Bullet,
			defaultKey: null,
			defaultFrame: null,
			active: true,
			maxSize: 20,
			runChildUpdate: false,
			createCallback: null,
			removeCallback: null,
			createMultipleCallback: null
		});

		this.amount = 5;
		this.width = 10;
		this.height = 20;
		this.colours = this.generateColours();

		if(!scene.textures.exists('dynamicLaserFrames')){
			this.generateBulletShape();
		}

		scene.anims.create({
			key: 'laser',
			frames: scene.anims.generateFrameNumbers('dynamicLaserFrames', { start: 0, end: 3 }),
			frameRate: 0,
			repeat: -1
		});
	}

	generateBulletShape() {
		var texture = this.scene.textures.createCanvas('dynamicLaserFrames', this.width*this.colours.length, this.height);
		var context = texture.getContext();
		for (var i = 0; i < this.colours.length; i++){
			context.beginPath();
			context.fillStyle = '#'+this.colours[i];
			context.fillRect(i*this.width, 0, this.width, this.height);
			context.closePath();
			texture.add(i, 0, i*this.width, 0, this.width, this.height);
		}
		texture.refresh();
		// this.scene.add.image(200, 600, 'dynamicFrames', '__BASE').setOrigin(0);
	}

	generateColours() {
		return ['99ff22', 'ff0099', '5588ff'];
	}
}

export default Bullets;
