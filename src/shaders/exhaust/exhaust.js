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
		if (!this.gameObject) {
			return;
		}
		var texWidth = this.gameObject.width,
			textHeight = this.gameObject.height;
		this.set2f('center', this._centerX, (textHeight - this._centerY));
		this.set2f('texSize', texWidth, textHeight);
		// console.log(this.gameObject, 'v');
	}

	update(time, delta){
		this.set1f('u_time', time/1000);
	}

	// onDraw(renderTarget) {
	// 	console.log(this.gameObject, 'a', this.gameObject.height, this.gameObject.width);
		
	// 	// this.colorMatrix.grayscale(this._intensity);
	// 	// this.drawFrame(renderTarget, this.fullFrame1);
	// 	// this.bindAndDraw(this.fullFrame1);
	// }
}

export default ExhaustFxClass;
