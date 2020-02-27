import './index.css';
import Game from './scenes/game';
import Menu from './scenes/menu';
import Test from './scenes/test';
import Phaser from 'phaser';
import pkg from '../package.json';
import Preload from './scenes/preload';

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
	scene: [
		Preload,
		Menu,
		Game,
		Test
	]
};

if(process.env.NODE_ENV === 'development') {
	window.game = new Phaser.Game(config);
}else {
	FBInstant.initializeAsync().then(function() {
		window.game = new Phaser.Game(config);
	});
}

// game.setGameSize(600,600);
// window.onresize = function () {
//   window.game.renderer.resize(window.innerWidth, window.innerHeight);
//   window.game.events.emit('resize');
// }
