import Phaser from 'phaser';
// import current from './current.glsl';
// import greyScale from './grey-scale.glsl';
// import outline from './outline.glsl';
import testBlur from './testBlur.glsl';

function CustomPipeline(game) {
	Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
		game: game,
		renderer: game.renderer,
		fragShader: testBlur
	});
}

var CustomPipeline2 = new Phaser.Class({
	Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
	initialize: CustomPipeline
});

export default CustomPipeline2;
