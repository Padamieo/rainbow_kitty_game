import Phaser from 'phaser';

class Smoke extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y){
		super(scene, x, y, 'smoke');
		this.defaultSetup();
	}

	defaultSetup() {
		this.on('animationcomplete', this.animComplete, this);
		this.play('smoke_0');
		this.setActive(false);
		this.setVisible(false);
		this.max = 1;
		this.speed = 0;
	}

	start(x, y, animation){
		this.rotation = (Math.random() * Math.PI * 2);
		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.play(`smoke_${animation}`);
	}

	animComplete() {
		this.setActive(false);
		this.setVisible(false);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if(this.scene.kitty.fly){
			if(this.speed < this.max){
				this.speed += 0.05;
			}
		}else{
			if(this.speed > 0){
				this.speed -= 0.05;
			}else{
				this.speed = 0;
			}
		}
		this.y += this.speed;
	}
}

export default Smoke;
