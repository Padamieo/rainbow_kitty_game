import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';

class Test extends Phaser.Scene {
	constructor() {
		super({
			key: 'Test'
		});
	}

	preload() {
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });

		this.load.spritesheet('rocket_frames2',
			rocket,
			{ frameHeight: 56, frameWidth: 30 }
		);

	}

	create() {
		this.add.image(0, 0, 'rocket_frames').setOrigin(0).setScale(1);
		var sprite = new MySprite(this, 200, 200);
		sprite.play('test2', true);
	}

	update(time, delta){

	}
}

class MySprite extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		scene.anims.create({
			key: 'frames',
			defaultTextureKey: 'rocket_frames2',
			frames: [
				{frame: 0 },
				{frame: 1 },
				{frame: 2 },
				{frame: 3 },
				{frame: 4 }
			],
			repeat: -1,
			frameRate: 12,
		});

		super(scene, x, y,'rocket_frames');

		this.anims.play('frames', true);

		scene.add.existing(this);
	}
}

export default Test;
