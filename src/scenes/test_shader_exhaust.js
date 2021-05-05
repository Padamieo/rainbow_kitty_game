import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';
import Enemies from 'object/enemies';
import Background from 'object/background';
import wall from 'assets/background_wall_temp.png';
import ExhaustFxClass from 'shaders/exhaust/exhaust';

class Custom_Explosion extends Enemies {
	constructor (scene) {
		super(scene);
	}

	// defaultSetup() {

	// }
}

class ShaderTestSmoke extends Phaser.Scene {
	constructor() {
		super({
			key: 'test_shader_exhaust'
		});
		
	}

	preload() {
		this.load.image('wall', wall);
		this.x = new Custom_Explosion(this);
		// this.load.spritesheet('rocket_frames',
		// rocket,
		// 	{ frameHeight: 112, frameWidth: 60 }
		// );
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });

		this.amount = 3;		

		for (var i = 0; i < this.amount; i++) {
			// ce.generateSmokeFrames(i);
		}
	}

	create() {

		// this.g = this.add.image(
		// 	this.game.config.width/2.2, this.game.config.height/5.2, 'test'
		// ).setOrigin(0).setScale(1);
		
		this.background = new Background( this, this.game.config.width/2, this.game.config.height/2, this.game.config.width, this.game.config.height, 'wall' );

		this.kitty = {
			x: this.game.config.width/2,
			y: this.game.config.height/5,
			fly: true,
			half: 10
		};

		this.gameObject = this.add.image(
			this.game.config.width/2.2, this.game.config.height/5.2, 'rocket_frames'
		).setOrigin(0).setScale(1);

		this.e = [];
		for (var i = 0; i < this.amount; i++) {

			var e = this.add.sprite(this.game.config.width/2, 180*(i+1), `exhaust`);
			e.setPostPipeline(ExhaustFxClass);
			this.e.push(e)
		}

	}

	update(time, delta){
		this.e.forEach(element => {
			var pipelineInstance = element.getPostPipeline(ExhaustFxClass);
			if (pipelineInstance) {
				pipelineInstance.update(time, delta);
			}
		});

		this.input.on('pointermove', (pointer) => {
			this.gameObject.setPosition(pointer.x, pointer.y);
		});

		this.input.on('pointerdown', (pointer) => {});

		this.input.on('pointerup', (pointer) => {});
	}

}

export default ShaderTestSmoke;
