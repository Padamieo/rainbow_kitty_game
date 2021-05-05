import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';
// import rocket2 from 'assets/rocket_frames.png';

class Test extends Phaser.Scene {
	constructor() {
		super({
			key: 'test'
		});
	}

	preload() {
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });

		this.load.spritesheet('rocket_frames2',
			rocket,
			{ frameHeight: 56, frameWidth: 30 }
		);

		var output = new Generate(this);
		// console.log(this);
	}

	create() {
		this.add.image(0, 0, 'rocket_frames').setOrigin(0).setScale(1);

		var Old = new OldSprite(this, 200, 200);
		var spriteNew = new NewSprite(this, 200, 260);
	}

	update(time, delta){

	}
}


class Generate extends Phaser.GameObjects.GameObject {
	constructor (scene){
		super(scene);

		if(!scene.textures.exists('dynamicTest2Frames')){
			var promi = this.generateBand();
			promi.then(()=>{
				//this.setupDebrisParticles();
				// this.scene.add.image(200, 100, 'dynamicTest2Frames').setOrigin(0);
				// this.scene.textures.addSpriteSheet('dynamicAnimation', '__BASE', { frameWidth: 150, frameHeight: 56 });

				//var cache = this.scene.textures;
				//var data = cache.get('dynamicTest2Frames');
				// var data2 = cache.get('rocket_frames');

				// this.load.spritesheet(
				// 	[{ key: 'dynamicTest2Frames', frameConfig: { frameWidth: 30, frameHeight: 56, endFrame: 4 } }]
				// );
				// var frame = data.add(0, 'dynamicTest2Frames', 0, 0, 30, 56).cutWidth(30);
				// var frame = data.add(1, 'dynamicTest2Frames', 30, 0, 30, 56);
				// console.log(frame);
				// this.load.spritesheet('dynamicTest2Frames',
				// 	data,
				// 	{ frameHeight: 56, frameWidth: 30 }
				// );
				// this.textureManager.addSpriteSheet('KKEEEYY', data, { frameHeight: 56, frameWidth: 30 });
				console.log(this.scene.textures);

				scene.anims.create({
					key: 'frames2',
					defaultTextureKey: 'dynamicTest2Frames',
					frames: this.scene.anims.generateFrameNames('dynamicTest2Frames'),
					repeat: -1,
					frameRate: 12,
				});
			});
		}else{
			// repeate above in promise
		}
	}

	generateBand() {
		var prom = this.addImageProcess(rocket).then((image) => {
			var texture = this.scene.textures.createCanvas('dynamicTest2Frames', image.width, image.height);
			var context = texture.getContext();
			//var canvas = texture.getCanvas();
			
			const width = 30;
			const height = 56;
			context.mozImageSmoothingEnabled = false;
			context.webkitImageSmoothingEnabled = false;
			context.msImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			for (var i = 0; i <= (image.width / width)-1; i++){
				context.beginPath();
				context.drawImage(image, 0, 0);
				texture.update();
				
				for (var p = 0; p < image.width; p++) {
					var c = texture.getPixel(p, 25);
					const darker = -50;
					const lighter = 25;
					if(c.a > 0){
						texture.setPixel(p, 23, c.r+lighter, c.g+lighter, c.b+lighter);
						texture.setPixel(p, 24, c.r+darker, c.g+darker, c.b+darker);
						texture.setPixel(p, 25, c.r+darker, c.g+darker, c.b+darker);
						texture.setPixel(p, 26, c.r+darker, c.g+darker, c.b+darker);
						texture.setPixel(p, 27, c.r+darker, c.g+darker, c.b+darker);
						// texture.setPixel(p, 28, c.r+darker, c.g+darker, c.b+darker);

						texture.setPixel(p, 31, c.r+lighter, c.g+lighter, c.b+lighter);
						texture.setPixel(p, 32, c.r+darker, c.g+darker, c.b+darker);
					}
				}
				
				// (name, sourceIndex, x, y, width, height);
				texture.add(i, 0, (i*width), 0, width, height);
				//texture.add(i, 0, i*this.width, 0, this.width, this.height);
				context.restore();
				texture.refresh();
			}
			
			/*
			context.beginPath();
			context.drawImage(image, 0, 0);
			texture.update();
			for (var p = 0; p < image.width; p++) {
				var c = texture.getPixel(p, 25);
				if(c.a > 0){
					texture.setPixel(p, 25, 255, 0, 0);
				}
			}
			texture.add(0, 0, 0, 0, image.width, image.height);
			context.restore();
			texture.refresh();
			*/
			
		});
		return prom;
	}

	addImageProcess(src) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}
}

class OldSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		scene.anims.create({
			key: 'frames',
			defaultTextureKey: 'rocket_frames2',
			frames: [
				{frame: 0 },
				{frame: 1 },
				{frame: 2 },
				{frame: 3 },
				{frame: 4 }
			],
			repeat: -1,
			frameRate: 12,
		});

		super(scene, x, y,'rocket_frames2');
		this.setTint('0x4EF24E');
		this.anims.play('frames', true);

		/*
		this.setTint('0x4EF24E');
		this.setRotation(1);
		scene.add.existing(this);
		var image = scene.add.image(x, y, 'rocket_frames2');
		image.setTint('0x3ec43e');
		image.setRotation(1);
		var rect = this.scene.add.rectangle(x, y+1, 30, 5, '0xffffff').setVisible(false);
		rect.setRotation(1);
		//var mask = new Phaser.Display.Masks.GeometryMask(image, rect);
		var mask = new Phaser.Display.Masks.GeometryMask(scene, rect);
		//mask.setMask(image);
		image.setMask(mask);
		*/

		// this.setTint('0x4EF24E');
		// this.setRotation(1);

		scene.add.existing(this);
	}
}

class NewSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {

		super(scene, x, y,'data_frames');
		this.setTint('0x4EF24E');
		console.log(this.rotation);
		this.setRotation(1);
		this.anims.play('frames2', true);

		scene.add.existing(this);
	}
}

export default Test;
