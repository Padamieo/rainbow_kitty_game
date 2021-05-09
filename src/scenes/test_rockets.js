import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';
import GenerateRocketTextures from 'object/generate_rocket_textures';

class TestRockets extends Phaser.Scene {
	constructor() {
		super({
			key: 'test_rockets'
		});
		
	}

	preload() {
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });

		new GenerateRocketTextures( this );
	}

	create() {
		this.add.image(0, 0, 'rocket_frames').setOrigin(0).setScale(1);

		this.add.image(0, 80, 'rocket_0_frames').setOrigin(0).setScale(1);


		var spriteNew0 = new NewSprite(this, 200, 100, 0);
		var spriteNew1 = new NewSprite(this, 200, 200, 1);
		var spriteNew2 = new NewSprite(this, 200, 300, 2);
		var spriteNew3 = new NewSprite(this, 200, 400, 3);
		var spriteNew4 = new NewSprite(this, 200, 500, 4);
	}

	update(time, delta){

	}
}

class NewSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, i) {

		super(scene, x, y, `rocket_${i}_frames`);
		this.setTint('0x4EF24E');
		this.setRotation(1);
		this.anims.play(`rocket_${i}_animation`);

		scene.add.existing(this);
	}
}

export default TestRockets;
