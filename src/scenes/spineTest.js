import Phaser from 'phaser';

import demo from 'assets/demos.json';
import atlas from 'assets/atlas1.atlas';
import png from 'assets/atlas1.png';

class SpineTest extends Phaser.Scene {
	constructor() {
		super({
			key: 'SpineTest'
		});
	}

	preload() {
		console.log('aa', png);
		this.load.spine('set1', demo, [ atlas ], true);
	}

	create() {
		this.add.spine(100, 100, 'set1.spineboy', 'idle', true);
	}

	update(time, delta){ 
	}

}

export default SpineTest;
