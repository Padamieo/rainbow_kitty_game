import './index.css';
import Scenario_default from './scenes/scenario_default';
import Menu from './scenes/menu';
import Test from './scenes/test';
import Test_shader_rainbow from './scenes/test_shader_rainbow';
import Test_shader_smoke from './scenes/test_shader_smoke';
import Test_shader_exhaust from './scenes/test_shader_exhaust';
import Test_explosion from './scenes/test_explosion';
import Test_rockets from './scenes/test_rockets';

import Phaser from 'phaser';
import pkg from '../package.json';
import Preload from './scenes/preload';
import RainbowFxClass from './shaders/rainbow/rainbow';
import SmokeFxClass from './shaders/smoke/smoke';
import ExhaustFxClass from './shaders/exhaust/exhaust';

const scenes = [
	Preload,
	Menu,
	Scenario_default,
];

const allScenes = process.env.NODE_ENV === 'development' ? [
	...scenes,
	Test,
	Test_rockets,
	Test_shader_rainbow,
	Test_shader_smoke,
	Test_explosion,
	Test_shader_exhaust
] : [];

var config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	antialias: true,
	pixelArt: false,
	zoom: 0,
	roundPixels: false,
	scale:{
		width: 405,
		height: 720,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	version: pkg.version,
	backgroundColor: 0x333333,
	pipeline: [RainbowFxClass, SmokeFxClass, ExhaustFxClass],
	fps: {
		target: 60,
	},
	queue: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			fps: 60,
		}
	},
	scene: allScenes,
};

if(process.env.NODE_ENV === 'development') {
	window.game = new Phaser.Game(config);
}else {
	// FBInstant.initializeAsync().then(function() {
	// 	window.game = new Phaser.Game(config);
	// });
}

// game.setGameSize(600,600);
// window.onresize = function () {
//   window.game.renderer.resize(window.innerWidth, window.innerHeight);
//   window.game.events.emit('resize');
// }
