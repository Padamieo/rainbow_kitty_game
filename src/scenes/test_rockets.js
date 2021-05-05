import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';

class TestRockets extends Phaser.Scene {
	constructor() {
		super({
			key: 'test_rockets'
		});
	}

	preload() {
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });

		var output = new Generate(this);
	}

	create() {
		this.add.image(0, 0, 'rocket_frames').setOrigin(0).setScale(1);

		this.add.image(0, 80, 'dynamicTest2Frames_0').setOrigin(0).setScale(1);


		var spriteNew0 = new NewSprite(this, 200, 100, 0);
		var spriteNew1 = new NewSprite(this, 200, 200, 1);
		var spriteNew2 = new NewSprite(this, 200, 300, 2);
		var spriteNew3 = new NewSprite(this, 200, 400, 3);
		var spriteNew4 = new NewSprite(this, 200, 500, 4);
	}

	update(time, delta){

	}
}


class Generate extends Phaser.GameObjects.GameObject {
	constructor (scene){
		super(scene);

		if(!scene.textures.exists('dynamicTest2Frames_1')){
			var promi = this.generateBand();
			promi.then(()=>{

				for (var i = 0; i <= 4; i++){
					scene.anims.create({
						key: `rocket_${i}_animation`,
						defaultTextureKey: `dynamicTest2Frames_${i}`,
						frames: this.scene.anims.generateFrameNames(`dynamicTest2Frames_${i}`),
						repeat: -1,
						frameRate: 5,
					});
				}
	
			});
		}else{
			// repeate above in promise
		}
	}

	generateBand() {
		var prom = this.addImageProcess(rocket).then((image) => {
			for (var x = 0; x <= 4; x++){
				var texture = this.scene.textures.createCanvas(
					`dynamicTest2Frames_${x}`,
					image.width,
					image.height
				);
				var context = texture.getContext();

				const width = image.width;
				const height = image.height;

				context.mozImageSmoothingEnabled = false;
				context.webkitImageSmoothingEnabled = false;
				context.msImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;

				context.beginPath();

				for (var i = 0; i <= 4; i++){
					context.drawImage(image,
						(width/5)*x, 0,
						width/5,height/2,
						(width/5)*i, 0,
						width/5, height/2
					);
				}

				context.drawImage(image,
					0, height/2,
					width, height,
					0, height/2,
					width, height
				);
				
				texture.update();
				
				for (var i = 0; i <= 4; i++){
					texture.add(i, 0, (width/5)*i, 0, width/5, height);
				}
				
				context.restore();
				texture.refresh();
			}
			
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

class NewSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, i) {

		super(scene, x, y, `dynamicTest2Frames_${i}`);
		this.setTint('0x4EF24E');
		this.setRotation(1);
		this.anims.play(`rocket_${i}_animation`);

		scene.add.existing(this);
	}
}

export default TestRockets;
