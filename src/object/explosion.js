import Phaser from 'phaser';

class Explosion extends Phaser.GameObjects.Sprite {
	constructor (scene) {
		super(scene, 0, 0,'explosion_0');
		this.on('animationcomplete', this.animComplete, this);
    
		// build array of random directions for variation
		// this.a = (Math.random() * Math.PI * 2);

		// sprite for particles
		// emitter.explode(10, this.kitty.x, this.kitty.y);
		// sprite for reckage
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta);
	}

	start(x, y, tint, frame){
		// this.setPipeline('Custom'); //TODO: might be nice to add an effect for the animation.
		this.setPosition(x, y);
		//this.setRotation(this.a);
		this.setActive(true);
		this.setVisible(true);
		this.play('explosion');
		if(this.scene.debris){
			this.scene.debris.start(x, y, tint, frame);
		}
		if(this.scene.sparks){
			this.scene.sparks.start(x, y, tint, frame);
		}
	}

	animComplete() {
		this.setActive(false);
		this.setVisible(false);
	}
}

export default Explosion;
