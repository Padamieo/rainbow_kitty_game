import Phaser from 'phaser';
// import current from './current.glsl';
// import greyScale from './grey-scale.glsl';
// import outline from './outline.glsl';
import exhaust from './exhaust.glsl';

var exhaustEffect = new Phaser.Class({
	Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
	initialize: function(game) {
		Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
			game: game,
			renderer: game.renderer,
			fragShader: exhaust
		});
	}
});

export default exhaustEffect;
