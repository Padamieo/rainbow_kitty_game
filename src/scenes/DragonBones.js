import Phaser from 'phaser';

import png from 'assets/mecha_1002_101d_show_tex.png';
import json from 'assets/mecha_1002_101d_show_tex.json';
import dbbin from 'assets/mecha_1002_101d_show_ske.dbbin';


class DragonBones extends Phaser.Scene {
	constructor() {
		super({
			key: 'DragonBones'
		});
	}

	preload() {
		// console.log(png);
		// console.log(jssson);
		this.load.dragonbone(
			'mecha_1002_101d_show',
			png,
			json,
			dbbin,
			null,
			null,
			{ responseType: 'arraybuffer' }
		);
	}

	create() {
		const armatureDisplay = this.add.armature('mecha_1002_101d', 'mecha_1002_101d_show');
		armatureDisplay.animation.play('idle');
		armatureDisplay.x = 200;
		armatureDisplay.y = 600;
	}

	update(time, delta){

	}
}

export default DragonBones;
