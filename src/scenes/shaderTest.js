import Phaser from 'phaser';
import Rainbow from 'object/rainbow';

import CustomPipeline from 'shaders/rainbow';

class ShaderTest extends Phaser.Scene {
	constructor() {
		super({
			key: 'ShaderTest'
		});
	}

	preload() {
		this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline(this.game));
		this.generateExhaustShape();
		// this.generateRainbowTearShape(this);
	}

	create() {
		this.rainbow = new Rainbow( this );
		console.log(this.rainbow); // .setPipeline('Custom');
		this.rainbow.particles.setPipeline('Custom');
		// this.rainbow.emitter.setPipeline('Custom');
		// this.add.image(20, 20, 'exhaust').setOrigin(0).setScale(1).setPipeline('Custom');
		// this.add.image(this.game.config.width/2.5, 20, 'exhaust').setOrigin(0).setScale(2).setPipeline('Custom');
		// this.add.image(this.game.config.width/3, 100, 'exhaust').setOrigin(0).setScale(2).setPipeline('Custom');
		// this.add.image(this.game.config.width/3, 200, 'exhaust').setOrigin(0).setScale(2).setPipeline('Custom');
		// this.scale = this.add.image(this.game.config.width/4, 400, 'exhaust').setOrigin(0).setScale(2.5).setPipeline('Custom');
		// this.scale.setScale(5);
		// this.follow = this.add.image(0, 0, 'exhaust').setOrigin(0).setScale(0.6).setPipeline('Custom');
		this.kitty = {
			x: this.game.config.width/2,
			y: this.game.config.height/5,
			fly: true,
			half: 10}
		;
		
		// this.add.image(100, 400, 'tear');

		this.customPipeline.setFloat2('u_resolution', this.game.config.width, this.game.config.height);


		// var particles = this.add.particles('tear');
		// particles.setPipeline('Custom');
		// var emitter = particles.createEmitter({
		// 	x: 100,
		// 	y: 100,
		// 	angle: { min: 140, max: 40 },
		// 	lifespan: 2000,
		// 	speed: 20,
		// 	accelerationY: { min:20, max: 100 },
		// 	gravityY: 200,
		// 	scale: { start: 0, end: 2 },
		// 	blendMode: 0,
		// 	frequency: 140,
		// 	on: true,
		// 	active: true
		// });
	}

	update(time, delta){
		this.customPipeline.setFloat1('u_time', time/1000);
		this.customPipeline.setFloat1('delta', delta);


		this.input.on('pointermove', (pointer) => {
			//this.follow.setPosition(pointer.x, pointer.y);
			this.kitty.x = pointer.x;
			this.kitty.y = pointer.y;
		});
		
		this.input.on('pointerdown', (pointer) => {
			this.kitty.fly = true;
		});

		this.input.on('pointerup', (pointer) => {
			this.kitty.fly = false;
		});
	}

	generateExhaustShape() {
		var polygonBase = new Phaser.Geom.Polygon([
			25, 0,
			14, 8,
			10, 20,
			14, 40,
			25, 60,
			25, 60,
			36, 40,
			40, 20,
			36, 8,
			25, 0
		]);
		var polygon = Phaser.Geom.Polygon.Smooth(polygonBase);
		var graphics = this.add.graphics({ x: 0, y: 0 });
		graphics.fillStyle(0xfeffcf);
		graphics.fillPoints(polygon.points, true);
		graphics.generateTexture('exhaust', 50, 65);
		graphics.clear();
	}
}

export default ShaderTest;
