import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';

// class example  extends phaser.GameObjects.Particles.Particle { // this does not work
class Debris extends Phaser.GameObjects.Sprite {
	constructor (scene){
		super(scene);

		// var particles = scene.add.particles('rocket_pieces');
		// var wreckage_config = {
		//   frame: [0,1,13,12],
		//   x: 100,
		//   y: 100,
		//   lifespan: 2000,
		//   speed: 120,
		//   angle: { min: 0, max: 360 },
		//   accelerationY: { min: 20, max: 100 },
		//   gravityY: 100,
		//   blendMode: 0,
		//   frequency: -1,
		//   tint: { onEmit: () => { return this.wreckage.colour; } },
		//   alpha:{ start:1, end:0, ease: "Cubic.easeIn" },
		//   on: true,
		//   rotate: { min: 0, max: 360 },
		//   active: true
		// };
		// this.wreckage = particles.createEmitter(wreckage_config);
		// this.wreckage.colour = 0xffffff;

		if(!scene.textures.exists('dynamicTestFrames')){
			//this.generateTestParticles();
			var promi = this.generateDebris();
			promi.then(()=>{
				this.setupDebrisParticles();
			});
		}else{
			this.setupDebrisParticles();
		}
	}

	setupDebrisParticles(){
		// this.scene.add.image(200, 200, 'dynamicTestFrames', '__BASE').setOrigin(0);

		// scene.anims.create({
		// 	key: 'dynamicTestFrames',
		// 	frames: scene.anims.generateFrameNumbers('dynamicTestFrames', { start: 0, end: 0 }),
		// 	frameRate: 0,
		// 	repeat: -1
		// });

		var particles = this.scene.add.particles('dynamicTestFrames');
		var wreckage_config = {
			frame: 0,
			x: 100,
			y: 100,
			lifespan: 2000,
			speed: 120,
			angle: { min: 0, max: 360 },
			accelerationY: { min: 20, max: 100 },
			gravityY: 100,
			blendMode: 0,
			frequency: -1,
			tint: { onEmit: () => { return this.wreckage.colour; } },
			alpha:{ start:1, end:0, ease: 'Cubic.easeIn' },
			on: true,
			rotate: { min: 0, max: 360 },
			active: true
		};
		this.wreckage = particles.createEmitter(wreckage_config);
		this.wreckage.colour = 0xffffff;
		this.scene.add.existing(this);
	}

	start (x, y, tint, frame){
		//if(frame !== undefined){
		// this.wreckage.colour = tint;
		this.wreckage.explode(5, x, y);
	}

	generateDebris () {
		var p = this.addImageProcess(rocket).then((image) => {
			var texture = this.scene.textures.createCanvas('dynamicTestFrames', image.width, image.height);
			var canvas = texture.getCanvas();
			var context = texture.context; // texture.getContext();

			// context.beginPath();
			// context.fillStyle = '#fff123';
			// context.fillRect(0, 0, 10, 10);
			// context.closePath();
			// texture.setPixel(0, 0, 255, 0, 0);

			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(15, 0);
			context.lineTo(15, 30);
			context.lineTo(0, 30);
			context.closePath();
			context.clip();
			
			context.drawImage(image, 0, 0);

			context.fillStyle = '#ffffff';
			// texture.add(name, sourceIndex, x, y, width, height);
			texture.add(0, 0, 0, 0, 15, 30);
			
			context.restore();
			texture.refresh();
		});
		return p;
	}

	addImageProcess(src){
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

}

export default Debris;
