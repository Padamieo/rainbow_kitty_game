import Phaser from 'phaser';
import CustomPipeline from 'shaders/exhaust';

class ShaderTest extends Phaser.Scene {
	constructor() {
		super({
			key: 'ShaderTest'
		});
	}

	preload() {
		this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline(this.game));
		this.generateExhaustShape();
	}

	create() {
		this.add.image(20, 20, 'exhaust').setOrigin(0).setScale(1).setPipeline('Custom');
		this.add.image(this.game.config.width/2.5, 20, 'exhaust').setOrigin(0).setScale(2).setPipeline('Custom');
		this.add.image(this.game.config.width/3, 100, 'exhaust').setOrigin(0).setScale(2).setPipeline('Custom');
		this.add.image(this.game.config.width/3, 200, 'exhaust').setOrigin(0).setScale(2).setPipeline('Custom');
		this.scale = this.add.image(this.game.config.width/4, 400, 'exhaust').setOrigin(0).setScale(2.5).setPipeline('Custom');
		this.scale.setScale(5);
		this.follow = this.add.image(0, 0, 'exhaust').setOrigin(0).setScale(0.6).setPipeline('Custom');
		console.log(this.game.config.height, this.game.config.width);

		this.customPipeline.setFloat2('u_resolution', this.game.config.width, this.game.config.height);
	}

	update(time, delta){
		this.customPipeline.setFloat1('u_time', time/1000);
		this.customPipeline.setFloat1('delta', delta);
		

		this.input.on('pointermove', (pointer) => {
			this.follow.setPosition(pointer.x, pointer.y);
		});	  
	}

	generateExhaustShape() {
		var polygonBase = new Phaser.Geom.Polygon([
			25, 0,
			14, 8,
			10, 20,
			14, 40,
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
		graphics.generateTexture('exhaust', 50, 60);
		graphics.clear();
	}
}

export default ShaderTest;
