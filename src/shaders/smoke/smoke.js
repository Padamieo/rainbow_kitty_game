import Phaser from 'phaser';

import smoke from './smoke_2.glsl';

class SmokeFxClass extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            key: 'rexSwirlPipeline',
            renderTarget: true,
            fragShader: smoke,  // GLSL shader
            uniforms: ['u_resolution', 'u_time']
        });
       
        this.delta = 0;
    }

    onPreRender(delta) {
        //console.log(this);
        //debugger;
        
        // 
        // if (this.game.scene){
        //     console.log(this.game.scene);
        //     debugger;
        // }

        //this.set1f('u_time', delta/1000);
        //this.set1f('u_time', this.delta/1000);
        //this.delta = this.delta + 1;
        this.set2f('u_resolution', this.game.config.width, this.game.config.height);

        // console.log('a', this.scene);
    }

	update(time, delta){
        // console.log(time);
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

export default SmokeFxClass;
