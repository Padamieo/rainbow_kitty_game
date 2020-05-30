import Phaser from 'phaser';

import rainbow from './rainbow_cricle.glsl';

var rainbowEffect = new Phaser.Class({
	Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
	initialize: function(game) {
		Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
			game: game,
			renderer: game.renderer,
			fragShader: rainbow
		});
	}
});

export default rainbowEffect;
