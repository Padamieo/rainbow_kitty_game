import Phaser from 'phaser';
import SmokeFxClass from 'shaders/smoke/smoke';
import Smoke from 'object/smoke';

class Explosion extends Phaser.GameObjects.Group {
	constructor (scene) {
		super(scene, {
			classType: Smoke,
			defaultKey: 'smoke',
			defaultFrame: 'smoke',
			active: true,
			maxSize: -1,
			runChildUpdate: true,
			createCallback: (item) => this.addPipelines(item),
			removeCallback: null,
			createMultipleCallback: null
		});

		this.defaultSetup();
	}

	defaultSetup() {
		this.amount = 3
		this.current = 0;
		this.generateSmokeAnimations();
	}

	addPipelines(smoke) {
		smoke.setPostPipeline(SmokeFxClass);
	}

	start(x, y, tint, frame) {
		var explosion = this.getFirstDead();
		if (explosion) {
			explosion.start(x, y, this.current);
		}else{
			const explosion = this.get();
			explosion.start(x, y, this.current);
		}

		if(this.scene.sparks){
			this.scene.sparks.start(x, y, frame);
		}
				
		if(this.scene.debris){
			this.scene.debris.start(x, y, tint);
		}
		var next = this.current + 1;
		this.current = next < this.amount ? next : 0;
	}

	generateSmokeAnimations() {
		for (var i = 0; i < this.amount; i++) {
			this.generateSmokeFrames(i);
		}
	}

	generateSmokeFrames(version, debug = false) {
		var graphics = this.scene.add.graphics({ x: 0, y: 0, fillStyle: { color: 0xffffff } });
		var build = [];
		var color = 255;

		const points = [];

		const width = 180;
		const height = 180;
		const iterations = 15;

		for (var frame = 0; frame < iterations; frame++) {
			if (frame >= 5) {
				 color = color - (240 / 10);
				const out = Phaser.Display.Color.ComponentToHex(color);
				graphics.fillStyle(`0x${out+out+out}`);
				var size = 25;
			}else{
				var size = 5+(5*frame);
			}


			if (frame === 0) {
				var circle = new Phaser.Geom.Circle(width/2, height/2, 10);
				for (var i = 0; i < 6; i++) {
					var point = circle.getRandomPoint();
					points.push({x:point.x, y:point.y, r: Math.random()})
					graphics.fillCircle(point.x, point.y, size);

					if (process.env.NODE_ENV === 'development' && debug) {
						graphics.lineStyle(1, 0xFF00FF, 1.0);
						graphics.beginPath();
						graphics.moveTo(points[i].x, points[i].y);
						graphics.lineTo(width/2, height/2);
						graphics.closePath();
						graphics.strokePath();
					}
				}

			} else {
				for (var i = 0; i < points.length; i++) {
					var dy = points[i].y - height/2;
					var dx = points[i].x - width/2;
					var angleRadians = Math.atan2(dy, dx);

					var x = Math.cos(angleRadians);
					var y = Math.sin(angleRadians);
					var size_step = size * (points[i].r + 0.8)
					var z = size * (iterations / width) * frame;

					var x_step = points[i].x + x * z;
					var y_step = points[i].y + y * z;
					
					graphics.fillCircle(x_step, y_step, size_step);

					if (process.env.NODE_ENV === 'development' && debug) {
						graphics.lineStyle(1, 0xFF00FF, 1.0);
						graphics.beginPath();
						graphics.moveTo(x_step, y_step);
						graphics.lineTo(width/2, height/2);
						graphics.closePath();
						graphics.strokePath();

						graphics.lineStyle(1, 0x00FFFF, 1.0);
						graphics.beginPath();
						graphics.moveTo(0, 0);
						graphics.lineTo(width, 0);
						graphics.lineTo(width, height);
						graphics.lineTo(0, height);
						graphics.closePath();
						graphics.strokePath();
					}
				}

			}
			
			graphics.generateTexture(`smoke_${version}_${frame}`, width, height);
			graphics.clear();
			build.push({ key: `smoke_${version}_${frame}` })
		}

		this.scene.anims.create({
			key: `smoke_${version}`,
			frames: build,
			frameRate: 12,
			repeat: 0
		});
	}

	update(time, delta) {
		if(this.countActive() > 0) {
			const group = this.getChildren();
			group.forEach(element => {
				//console.log('a', element);
				var pipelineInstance = element.getPostPipeline(SmokeFxClass);
				pipelineInstance.update(time, delta);
			});
		}
	}

	preUpdate (delta, step, processors) {
		super.preUpdate(delta, step, processors);
		// const group = this.getChildren();
		console.log('a');

		// var pipelineInstance = this.getPostPipeline(MyPostFxClass);
		// pipelineInstance.update(time, delta);
		// group.forEach(element => {
		// 	console.log('a');
		// 	var pipelineInstance = element.getPostPipeline(SmokeFxClass);
		// 	pipelineInstance.update(time, delta);
		// });
	}
}

export default Explosion;