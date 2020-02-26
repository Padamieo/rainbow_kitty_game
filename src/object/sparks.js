import Phaser from 'phaser';

class Sparks extends Phaser.GameObjects.Sprite {
	constructor (scene){
		super(scene);

		this.colours = (this.scene.bullets ? this.scene.bullets.colours : ['ffffff']);
		this.sparkSize = 5;

		if(!scene.textures.exists('dynamicSparksFrames')){
			this.generateBulletParticles();
		}
		
		scene.anims.create({
			key: 'laserParticles',
			frames: scene.anims.generateFrameNumbers('dynamicSparksFrames', { start: 0, end: 3 }),
			frameRate: 0,
			repeat: -1
		});

		var particlesspark = scene.add.particles('dynamicSparksFrames');
		var spark_config = {
			frame: 0,
			x: 100,
			y: 100,
			lifespan: 2000,
			speed: 250,
			angle: { min: 0, max: 360 },
			accelerationY: { min: 20, max: 100 },
			gravityY: 0,
			blendMode: 0,
			frequency: -1,
			alpha:{ start:1, end:0, ease: 'Cubic.easeIn' },
			on: true,
			rotate: { min: 0, max: 90 },
			active: true
		};
		this.sparks = particlesspark.createEmitter(spark_config);
		this.sparks.colour = 0xffffff;
		scene.add.existing(this);
	}

	generateBulletParticles() {
		var canvasFrame = this.scene.textures.createCanvas('dynamicSparksFrames', this.sparkSize*this.colours.length, this.sparkSize);
		var ctx = canvasFrame.context;
		for (var i = 0; i < this.colours.length; i++){
			ctx.beginPath();
			ctx.fillStyle = '#'+this.colours[i];
			ctx.fillRect(i*this.sparkSize, 0, this.sparkSize, this.sparkSize);
			ctx.closePath();
			canvasFrame.add(i, 0, i*this.sparkSize, 0, this.sparkSize, this.sparkSize);
		}
		canvasFrame.refresh();
		// this.scene.add.image(200, 600, 'dynamicSparksFrames', '__BASE').setOrigin(0);
	}

	start (x, y, tint, frame){
		if(frame !== undefined){
			this.sparks.setFrame(frame);
			this.sparks.explode(4, x, y);
		}
	}
}

export default Sparks;
