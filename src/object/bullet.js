import phaser from 'phaser';

class Bullet extends phaser.Physics.Arcade.Sprite {
	constructor (scene) {
		super(scene, 0, 0, 'dynamicLaserFrames');

		this.play('laser');

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.direction = this.rotation;
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta);
		var x = Math.cos(this.direction);
		var y = Math.sin(this.direction);
		this.y += y * 5;
		this.x += x * 5;

		if(this.y > this.scene.game.config.height || this.y < 0 || this.x < 0 || this.x > this.scene.game.config.width){
			this.onOutOfBounds();
		}
	}

	onOutOfBounds(){
		//this.direction = this.direction + Math.PI;
		this.reset();
	}

	fire(ax, ay){
		this.anims.nextFrame();
		if(this.scene.kitty){

			var x = this.scene.kitty.getEyeX();
			var y = this.scene.kitty.y;

			this.setPosition(x, y);
			var direction = phaser.Math.Angle.Between(x, y, ax, ay);

			this.scene.kitty.eyeMove(direction - Math.PI/2);

			this.direction = direction;
			this.setRotation(this.direction + Math.PI/2);
			this.setActive(true);
			this.setVisible(true);
		}
	}

	hit(){
		this.reset();
		this.scene.score.add(); // could provide hight points for harder targets
	}

	reset(){
		this.setActive(false);
		this.setVisible(false);
	}
}

export default Bullet;
