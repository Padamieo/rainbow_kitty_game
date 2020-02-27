import Phaser from 'phaser';
import current from './current';

function CustomPipeline(game) {
	Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
		game: game,
		renderer: game.renderer,
		fragShader: current
	});
}

var CustomPipeline2 = new Phaser.Class({
	Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
	initialize: CustomPipeline
});

export default CustomPipeline2;
