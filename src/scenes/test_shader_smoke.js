import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';
import Explosion from 'object/explosion';
import SmokeFxClass from 'shaders/smoke/smoke';

class Custom_Explosion extends Explosion {
	constructor (scene) {
		super(scene);
	}

	defaultSetup() {

	}
}

class ShaderTestSmoke extends Phaser.Scene {
	constructor() {
		super({
			key: 'test_shader_smoke'
		});
		
	}

	preload() {
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });
		
		this.amount = 3;
		var ce = new Custom_Explosion(this);

		for (var i = 0; i < this.amount; i++) {
			ce.generateSmokeFrames(i);
		}
	}

	create() {
		this.gameObject = this.add.image(
			this.game.config.width/2.2, this.game.config.height/5.2, 'rocket_frames'
		).setOrigin(0).setScale(1);

		this.e = [];
		for (var i = 0; i < this.amount; i++) {

			var e = this.add.sprite(this.game.config.width/2, 180*(i+1), `smoke_${i}_0`);
			e.setPostPipeline(SmokeFxClass);
			this.e.push(e)
		}

	}

	update(time, delta){
		this.e.forEach(element => {
			var pipelineInstance = element.getPostPipeline(SmokeFxClass);
			pipelineInstance.update(time, delta);
		});

		// var pipelineInstance = this.e[0].getPostPipeline(SmokeFxClass);
		// pipelineInstance.update(time, delta);

		this.input.on('pointermove', (pointer) => {
			this.gameObject.setPosition(pointer.x, pointer.y);
		});

		this.input.on('pointerdown', (pointer) => {
			for (var i = 0; i < this.amount; i++) {
				this.e[i].rotation = (Math.random() * Math.PI * 2);
				this.e[i].anims.play(`smoke_${i}`);
			};
		});

		this.input.on('pointerup', (pointer) => {

		});
	}

}

export default ShaderTestSmoke;
