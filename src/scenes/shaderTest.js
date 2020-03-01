import Phaser from 'phaser';
// import Enemies from 'object/enemies';
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
		// this.enemies = new Enemies( this );
		this.add.image(20, 20, 'exhaust').setOrigin(0).setScale(1).setPipeline('Custom');
	}

	update(time, delta){
		this.customPipeline.setFloat1('time', time);
		this.customPipeline.setFloat1('delta', delta);
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
