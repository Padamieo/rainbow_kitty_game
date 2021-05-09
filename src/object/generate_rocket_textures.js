import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';

class GenerateRocketTextures extends Phaser.GameObjects.GameObject {
	constructor (scene){
		super(scene);

		this.defaultName = 'rocket';

		if(!scene.textures.exists(`${this.defaultName}_1_frames`)){
			var promise = this.generateBand();
			promise.then(()=>{

				for (var i = 0; i <= 4; i++){
					scene.anims.create({
						key: `rocket_${i}_animation`,
						defaultTextureKey: `${this.defaultName}_${i}_frames`,
						frames: this.scene.anims.generateFrameNames(`${this.defaultName}_${i}_frames`),
						repeat: -1,
						frameRate: 5,
					});
				}
	
			});
		}
	}

	generateBand() {
		var promise = this.addImageProcess(rocket).then((image) => {
			for (var x = 0; x <= 4; x++){
				var texture = this.scene.textures.createCanvas(
					`${this.defaultName}_${x}_frames`,
					image.width,
					image.height
				);
				var context = texture.getContext();

				const width = image.width;
				const height = image.height;

				context.mozImageSmoothingEnabled = false;
				context.webkitImageSmoothingEnabled = false;
				context.msImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;

				context.beginPath();

				for (var i = 0; i <= 4; i++){
					context.drawImage(image,
						(width/5)*x, 0,
						width/5,height/2,
						(width/5)*i, 0,
						width/5, height/2
					);
				}

				context.drawImage(image,
					0, height/2,
					width, height,
					0, height/2,
					width, height
				);
				
				texture.update();
				
				for (var i = 0; i <= 4; i++){
					texture.add(i, 0, (width/5)*i, 0, width/5, height);
				}
				
				context.restore();
				texture.refresh();
			}
			
		});
		return promise;
	}

	addImageProcess(src) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}
}

export default GenerateRocketTextures;
