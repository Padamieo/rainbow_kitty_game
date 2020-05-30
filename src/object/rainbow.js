import Phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Rainbow extends Phaser.GameObjects.Sprite {
	constructor (scene) {

		super(scene);

		this.generateRainbowTearShape(scene);
		
		this.particles = scene.add.particles('tear');
		
		this.emitter = this.particles.createEmitter({
			maxVelocityX: 500,
			maxVelocityY: 500,
			angle: { min: 100, max: 80 },
			rotate: { min: 0, max: 10},
			lifespan: 2000,
			speed: 100,
			accelerationY: { min: 20, max: 100 },
			gravityY: 150,
			scale: { start: 0, end: 3  },
			blendMode: 0,
			frequency: 60,
			on: true,
			active: true,
			quantity: 0,
		});

		//this.emitter.c = 180;
		//this.emitter.setFrequency(-1, 0);
		//this.emitter.setQuantity(0);

		//var callback = function(particle, emitter) { /* ... */ }
		this.emitter.forEachAlive(() => {
			console.log('p');
		}, this);

		scene.add.image(100, 400, 'tear');

		scene.add.existing(this);
	}

	callback (particle, emitter) {
		console.log('particle');
	}


	generateRainbowTearShape(scene) {
		var polygon = new Phaser.Geom.Polygon([
			50, 5,
			20, 68,
			22, 80,
			30, 90,
			45, 95,
			55, 95,
			70, 90,
			78, 80,
			80, 68,
			50, 5
		]);

		// var polygon = Phaser.Geom.Polygon.Smooth(p);

		var graphics = scene.add.graphics({ x: 0, y: 0 });

		graphics.fillStyle(0xffffff);
		graphics.fillPoints(polygon.points, true);
		graphics.generateTexture('tear', 100, 100);
		// graphics.setScale(4);
		graphics.clear();
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta);

		if(this.scene.kitty){
			this.emitter.setPosition(this.scene.kitty.x, this.scene.kitty.y+(this.scene.kitty.half/2));
			if(this.scene.kitty.fly){
				//this.emitter.resume();
				//console.log('flying');
				//this.emitter.setFrequency(0.01, 0);
				//this.particles.emitParticleAt(100,100);
				//this.emitter.explode(5,100,100);
				//console.log('emit');
				this.emitter.setQuantity(1);
				// console.log(this.emitter.alive);
				///console.log(this.emitter.getAliveParticleCount());
			}else{
				//this.emitter.pause();
				//this.emitter.setFrequency(0, 0);
				this.emitter.setQuantity(0);
			}
		}
	}
}

export default Rainbow;
