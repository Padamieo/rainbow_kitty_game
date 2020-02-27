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

	}

	create() {
		this.add.image(0, 0, 'rocket_frames').setOrigin(0).setScale(1);

	}

	update(time, delta){

	}
}
export default Test;
