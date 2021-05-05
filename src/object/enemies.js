import Phaser from 'phaser';
import Rocket from 'object/rocket';

class Enemies extends Phaser.GameObjects.Group {
	constructor (scene) {
		super(scene, {
			classType: Rocket,
			defaultKey: 'Rocket',
			defaultFrame: null,
			active: true,
			maxSize: 20,
			runChildUpdate: true,
			createCallback: null,
			removeCallback: null,
			createMultipleCallback: null
		});

		this.generateExhaustShape();
		this.defaultSetup();
	}

	defaultSetup() {
		this.scene.tick = this.scene.time.addEvent({
			delay: 2500,
			callback: () => this.calculateAddEnemy(this),
			loop: true
		});

		this.limit = 2;
		this.list = new Array(5).fill(0);
		console.log(this.list);
		this.list.push(0);
		//this.list.push(2);
		console.log(this.list);
		this.index = 0;

		// console.log(b.next().value);
		// console.log(b.next().value);
		// console.log(b.next().value);
		// console.log(b.next().value);
	}

	generateExhaustShape() {
		var polygonBase = new Phaser.Geom.Polygon([
			25, 0,
			14, 8,
			10, 20,
			14, 40,
			25, 60,
			36, 40,
			40, 20,
			36, 8,
			25, 0
		]);
		var polygon = Phaser.Geom.Polygon.Smooth(polygonBase);
		var graphics = this.scene.add.graphics({ x: 0, y: 0 });
		graphics.fillStyle(0xfeffcf);
		graphics.fillPoints(polygon.points, true);
		graphics.generateTexture('exhaust', 50, 60);
		graphics.clear();
	}

	incrementIndex(){
		// 
	}

	calculateAddEnemy() {

		if(this.getLength() <= this.limit) {
			// console.log('spawn', this.getLength());
			// new Rocket( this.scene, this.scene.cameras.main.centerX, this.scene.cameras.main.centerY );
			console.log('here');
			var enemy = this.get();

			if (enemy) {

				if (this.index+1 < this.list.length) {
					this.index = this.index+1;
				} else {
					this.index = 0;
				}
				var v = this.list[this.index];
				console.log(v);

				//console.log(this.scene.bullets.getLength());
				enemy.launch(v);
			}
		}
	}

	start(){
		// 
	}

	preUpdate (delta, step, processors) {
		super.preUpdate(delta, step, processors);
		// Bullet.update(delta);
		console.log('A');
	}
}

export default Enemies;
