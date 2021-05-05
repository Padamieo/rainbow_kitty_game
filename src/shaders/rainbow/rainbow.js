import Phaser from 'phaser';
import rainbow from './rainbow_1.glsl';

class RainbowFxClass extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: rainbow,  // GLSL shader
            uniforms: []
        });
    }

    onPreRender() {
        this.set2f('u_resolution', this.game.config.width, this.game.config.height);
    }

	update(time, delta){
		//console.log(time);
		this.set1f('u_time', time/1000);
		// this.customPipeline.setFloat1('delta', delta);
		// this.baseShader.set1f('u_time', time/1000);
	}

	// onDraw(renderTarget, a) {
	// 	console.log(a);
    //     // this.colorMatrix.grayscale(this._intensity);
    //     // this.drawFrame(renderTarget, this.fullFrame1);
    //     // this.bindAndDraw(this.fullFrame1);
    // }
}

export default RainbowFxClass;
