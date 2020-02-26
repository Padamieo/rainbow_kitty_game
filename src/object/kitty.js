import phaser from 'phaser';

class Kitty extends phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {

		scene.anims.create({
			key: 'kitty_fall',
			defaultTextureKey: 'kitty2_frames',
			frames: [
				{frame: 0 },
				{frame: 1 },
				{frame: 2 },
				{frame: 3 },
				{frame: 4 },
				{frame: 5 },
				{frame: 6 }
			],
			repeat: -1,
			frameRate: 12,
			yoyo: true,
		});

		scene.anims.create({
			key: 'kitty_transition_in',
			defaultTextureKey: 'kitty2_frames',
			frames: [
				{frame: 6 },
				{frame: 7 },
				{frame: 8 },
				{frame: 9 }
			],
			repeat: 0,
			frameRate: 16
		});

		scene.anims.create({
			key: 'kitty_transition_out',
			defaultTextureKey: 'kitty2_frames',
			frames: [
				{frame: 9 },
				{frame: 8 },
				{frame: 7 },
				{frame: 6 }
			],
			repeat: 0,
			frameRate: 16
		});

		scene.anims.create({
			key: 'kitty_fly',
			defaultTextureKey: 'kitty2_frames',
			frames: [
				{frame: 9 },
				{frame: 10 },
				{frame: 11 },
				{frame: 12 },
				{frame: 13 }
			],
			repeat: -1,
			frameRate: 8,
			yoyo: true,
		});

		super(scene, x, y, 'kitty2_frames');

		this.anims.play('kitty_fall', true);

		scene.add.existing(this);

		this.on('animationupdate-kitty_fall', () => {
			if(this.fly & this.alive){
				this.anims.play('kitty_transition_in', true);
			}
			//console.log(this.anims.currentAnim.key);
		}, this);

		this.eyesOffset = 0;

		this.on('animationcomplete-kitty_transition_in', () => {
			this.anims.play('kitty_fly', true);
		});

		this.on('animationcomplete-kitty_transition_out', () => {
			this.anims.play('kitty_fall', true);
		});

		this.on('animationupdate-kitty_transition_in', (currentAnim, currentFrame)  => {
			if(currentFrame.textureFrame === 9){
				this.eyesOffset = 20;
			}else if(currentFrame.textureFrame === 8){
				this.eyesOffset = 12;
			}else if(currentFrame.textureFrame === 7){
				this.eyesOffset = 8;
			}else{
				this.eyesOffset = 5;
			}
		});

		this.on('animationupdate-kitty_transition_out', (currentAnim, currentFrame)  => {
			if(currentFrame.textureFrame === 9){
				this.eyesOffset = 20;
			}else if(currentFrame.textureFrame === 8){
				this.eyesOffset = 12;
			}else if(currentFrame.textureFrame === 7){
				this.eyesOffset = 8;
			}else{
				this.eyesOffset = 5;
			}
		});

		// this.on('animationupdate-kitty_transition', () => {
		//   // console.log('update');
		//   // this.anims.stop();
		//   //console.log(this.anims.currentAnim.key);
		// }, this);

		this.on('animationupdate-kitty_fly', () => {
			if(!this.fly){
				this.anims.play('kitty_transition_out', true);
			}
		}, this);

		/*
    this.setRotation(phaser.Math.DegToRad(180));

    this.anims.play('vertical_out', true);

    this.on('animationupdate-vertical_crawl', () => {
      //console.log(this.anims.currentAnim.key);
      this.flipX = !this.flipX;
    }, this);

    this.on('animationupdate-diagonal_crawl', () => {
      //console.log(this.anims.currentAnim.key);
      this.flipX = !this.flipX;
      // this.flipY = !this.flipY;
      //this.body.setRotation(360);
      this.setRotation(phaser.Math.DegToRad(this.flipX ? -90 : 0));
    }, this);
    */

		this.eyeLeft = scene.add.image(this.x-this.height/4.5, this.y, 'eye').setScale(0.5);
		this.irisLeft = scene.add.image(this.eyeLeft.x, this.y, 'iris').setScale(0.5);

		this.eyeRight = scene.add.image(this.x+this.height/4.5, this.y, 'eye').setScale(0.5);
		this.eyeRight.flipX = true;
		this.irisRight = scene.add.image(this.eyeRight.x, this.y, 'iris').setScale(0.5);

		scene.physics.add.existing(this);
		this.body.setSize(this.height/1.5, this.height/1.5, true);

		this.dodge = true;
		this.alive = true;
		this.y_velocity = 0;
		this.fly = false;
		this.speed = 0;
		this.eye = true;

		this.half = this.height/2;
		this.distance = this.scene.game.config.height-this.half;
		this.fall = 0.05;
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta);

		if(this.fly & this.alive){
			if(this.y < this.half){
				this.speed = 0;
			}else{
				//this.anims.play('kitty_fly', true);
				var screen = Phaser.Math.Percent(this.y, this.half, this.distance);
				this.speed = this.fall + screen/4;
			}

			this.y -= (this.speed * delta);

		}else{
			if(this.y < this.scene.game.config.height){
				if(this.alive){
					this.y += (this.fall * delta);
					//this.anims.play('kitty_fall', true);
				}else{
					// not sure on the speed of this
					var screen = Phaser.Math.Percent(this.y, this.half, this.distance);
					this.speed = this.fall + screen/4;
					this.y += (this.speed * delta);
				}
			}else{
				this.scene.events.emit('returnMenu', 'a');
			}
		}

		if(this.dodge){
			if(this.fly & this.alive){
				// left and right limits
				//if(this.y < this.half){
			}else{
				// reset center position
				//this.x -= (0.01 * delta);
			}
		}

		this.eyeFollow();
		//this.irisLeft.setRotation( this.irisLeft.rotation + 0.05 );
	}

	getEyeX(){
		if(this.eye){
			var x = this.x + this.half/2;
		}else{
			var x = this.x - this.half/2;
		}
		return x;
	}

	eyeFollow(){
		var y = this.y-this.eyesOffset;
		this.eyeLeft.setPosition(this.x-this.height/4.5, y);
		this.irisLeft.setPosition(this.eyeLeft.x, this.eyeLeft.y);
		this.eyeRight.setPosition(this.x+this.height/4.5, y);
		this.irisRight.setPosition(this.eyeRight.x, this.eyeLeft.y);
	}

	eyeMove(direction){
		this.eye = !this.eye;
		if(this.eye){
			this.irisLeft.setRotation( direction );
		}else{
			this.irisRight.setRotation( direction );
		}
	}

	shot(){
		this.alive = false;
		//this.anims.play('kitty_fly', true);
		// trigger animation
	}
}

export default Kitty;
