import Phaser from 'phaser';

class Background extends Phaser.GameObjects.TileSprite {
	constructor(scene, x, y, width, height) {
		super(scene, x, y, width, height, 'wall');
		scene.add.existing(this);

		this.max = 2;
		this.speed = 0;
	}

	preUpdate () {
		if(this.scene.kitty.fly){
			if(this.speed < this.max){
				this.speed += 0.1;
			}
		}else{
			if(this.speed > 0){
				this.speed -= 0.1;
			}else{
				this.speed = 0;
			}
		}

		this.tilePositionY = this.tilePositionY - this.speed;
	}
}

export default Background;
