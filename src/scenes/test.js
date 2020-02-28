import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';

class Test extends Phaser.Scene {
	constructor() {
		super({
			key: 'Test'
		});
	}

	preload() {
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });

		this.load.spritesheet('rocket_frames2',
			rocket,
			{ frameHeight: 56, frameWidth: 30 }
		);

		var output = new Generate(this);
		console.log(this);
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
				
				scene.anims.create({
					key: 'frames2',
					defaultTextureKey: 'dynamicTest2Frames',
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
			});
		}else{
			// repeate above in promise
		}
	}

	generateBand() {
		var prom = this.addImageProcess(rocket).then((image) => {
			var texture = this.scene.textures.createCanvas('dynamicTest2Frames', image.width, image.height);
			var context = texture.getContext();

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
					if(c.a > 0){
						texture.setPixel(p, 25, 255, 0, 0);
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
			texture.add(0, 0, 0, 0, 30, 56);
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

		this.anims.play('frames', true);

		scene.add.existing(this);
	}
}

class NewSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {

		super(scene, x, y,'dynamicTest2Frames');

		this.anims.play('frames2', true);

		scene.add.existing(this);
	}
}

export default Test;
