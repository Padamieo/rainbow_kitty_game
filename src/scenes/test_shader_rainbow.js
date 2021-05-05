import Phaser from 'phaser';
import Rainbow from 'object/rainbow';
import rocket from 'assets/rocket_frames.svg';

class ShaderTestRainbow extends Phaser.Scene {
	constructor() {
		super({
			key: 'test_shader_rainbow'
		});
	}

	preload() {
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });
	}

	create() {
		this.gameObject = this.add.image(
			this.game.config.width/2, this.game.config.height/3.2, 'rocket_frames'
		).setOrigin(0.5).setScale(2);
		this.rainbow = new Rainbow( this );

		this.kitty = {
			x: this.game.config.width/2,
			y: this.game.config.height/5,
			fly: true,
			half: 10
		};

	}

	update(time, delta){

		this.input.on('pointermove', (pointer) => {
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
}

export default ShaderTestRainbow;
