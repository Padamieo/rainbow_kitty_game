import Phaser from 'phaser';

import owlJSON from 'assets/owl-pro.json';
import owlAtlas from 'assets/owl-pro.atlas';

// https://labs.phaser.io/edit.html?src=src\spine\3.8\owl.js

class SpineTest extends Phaser.Scene {
	constructor() {
		super({
			key: 'SpineTest'
		});
	}

	preload() {
		this.load.spine('owl', owlJSON, owlAtlas);
	}

	create() {
		const owl = this.add.spine(200, 500, 'owl', 'idle', true);
		owl.setScale(0.5);
		this.physics.add.existing(owl);
		owl.body.setSize(owl.height/1.5, owl.height/1.5, true);
		// owl.setSkinByName('skin');
	}

	update(time, delta){ 
	}

}

export default SpineTest;
