import Phaser from 'phaser';
import ExhaustFxClass from 'shaders/exhaust/exhaust';

class Rocket extends Phaser.Physics.Arcade.Sprite {
	constructor (scene) {
		super(scene, 0, 0,'rocket_0_frames');
		this.defaultSetup(scene);
	}

	defaultSetup(scene) {
		this.anims.play('rocket_0_animation', true);

		if (scene.physics) {
			scene.physics.add.existing(this);
		}
		this.type = 0;
		this.max = 0.1;
		this.speed = 0;
		if (scene.enemies) {
			scene.enemies.add(this);
		}
		this.start = this.x;
		this.ax = this.scene.kitty.x;
		this.ay = this.scene.kitty.y;

		this.gap = this.scene.game.config.width/28;
		this.setDepth(2);
		this.displayWidth = 30;
		this.displayHeight = 56;

		console.log('c1');
		this.exhaust = scene.add.image(0, 0, 'exhaust');
		console.log('c2');
		//.setPipeline('ExhaustPipeline');
		this.exhaust.setPostPipeline(ExhaustFxClass);
		this.exhaust.setOrigin(0.5, 0);
		this.exhaust.setScale(0.6);

		// this.setRotation(Math.PI/5);
		// this.setRotation(phaser.Math.DegToRad(45));
		this.body.setSize(this.height, this.height, true);

		this.setTint(this.colour(this.type));
		//this.reset();
		this.setActive(false);
		this.setVisible(false);
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta);
		//console.log(this.active, this.visible);
		if(this.active){
			if(this.y > (0 - this.height)){
				if(this.scene.kitty.fly){
					this.speed = 0.05;
				}else{
					this.speed = 0.1;
				}
				this.y -= (this.speed * delta);

				this.movement(time, delta);

			}else{
				this.reset();
			}

			if (this.exhaust){
				this.exhaust.x = this.x + this.exhaust.height/3 * Math.cos((Math.PI/2)+this.rotation);
				this.exhaust.y = this.y + this.exhaust.height/3 * Math.sin((Math.PI/2)+this.rotation);
				this.exhaust.setRotation(this.rotation);
				var pipelineInstance = this.exhaust.getPostPipeline(ExhaustFxClass);
				if (pipelineInstance) {
					pipelineInstance.update(time, delta);
				}
			}
		}
		//this.exhaust.setRotation((Math.PI/3)*this.rotation);
	}

	typeSet(type) {
		if(type !== this.type){
			this.type = type;
			this.setTint(this.colour(this.type));
		}
	}

	movement(time, delta){
		if(this.type === 1){
			this.aim();
		}
		if(this.type === 2){
			this.winder(time);
		}
		if(this.type === 3){

			this.setRotation(this.rotation-0.01);
		}
	}

	aim () {
		if(this.y > this.ay){
			var c = Phaser.Math.Angle.Between(this.x, this.y, this.ax, this.ay);
			// var a = Math.atan2(0, this.x * this.ax);
			var velocity = new Phaser.Math.Vector2();
			//this.physics.velocityFromRotation(angle, 10, velocity);
			this.setRotation(c + Math.PI/2);
			var x = Math.cos(c);
			// V.y = sin(A)
			// console.log(x);
			//this.scene.pause("Menu");
			this.x += x;
		}
	}

	winder (time) {
		var sinX = Math.sin(time * 0.002);
		var magnitude = ((sinX + this.sinX) * 0.1)/-1;
		this.sinX = sinX;
		this.setRotation(magnitude);

		this.x = this.sinX * this.scene.game.config.width/8;
		this.x = this.x + this.start;
	}

	launch(type){
		console.log('launch');
		this.reset();
		this.typeSet(type);
	}

	reset () {
		this.x = Phaser.Math.Between(this.gap, this.scene.game.config.width-this.gap);
		//this.x = this.scene.game.config.width/2;
		this.start = this.x;
		this.y = this.scene.game.config.height;
	}

	colour (type) {
		var colour = '';
		switch (type) {

		case 0:
			colour = 0x4EF24E;
			break;
		case 1:
			colour = 0xFEFF0D;
			break;
		case 2:
			colour = 0xFFAA00;
			break;
		case 3:
			colour = 0xf24e90;
			break;
		case 4:
			colour = 0xFF003C;
			break;
		default:
			colour = 0x00DFFC;
		}
		return colour;
	}

	hit(frame){
		if (this.scene.explosions) {
			this.scene.explosions.start(this.x, this.y, this.colour(this.type), frame);
		}
		this.setActive(false);
		this.setVisible(false);
		this.exhaust.destroy();
		this.destroy();
	}
}

export default Rocket;
