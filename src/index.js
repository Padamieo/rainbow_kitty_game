import './index.css';
import Game from './scenes/game';
import Menu from './scenes/menu';
import Phaser from 'phaser';
import pkg from '../package.json';
import Preload from './scenes/preload';
import {h, render } from 'preact';
import App from './components/app';

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
		Game
	]
};

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
	window.game = new Phaser.Game(config);
}else {
	FBInstant.initializeAsync().then(function() {
		window.game = new Phaser.Game(config);
	});
}

// preact user interface overlay
render(<App ref={(preact) => {window.preact = preact}} />, document.body);