import Phaser from 'phaser';
import exhaust from './exhaust.glsl';

class ExhaustFxClass extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: exhaust,  // GLSL shader
            uniforms: ['u_resolution', 'time', 'uMainSampler']
        });
        this._centerX = 0; // position wo resolution
        this._centerY = 0; // position wo resolution
    }

    onPreRender() {
        this.set2f('u_resolution', this.game.config.width, this.game.config.height);
        var texWidth = this.renderer.width,
        textHeight = this.renderer.height;
        this.set2f('center', this._centerX, (textHeight - this._centerY));
        this.set2f('texSize', texWidth, textHeight);
    }

	update(time, delta){
		this.set1f('u_time', time/1000);
	}
}

export default ExhaustFxClass;
