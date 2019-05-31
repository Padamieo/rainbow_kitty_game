import phaser from 'phaser';

class Kitty extends phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'kitty_frames');

    scene.add.existing(this);

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
        var screen = Phaser.Math.Percent(this.y, this.half, this.distance);
        this.speed = this.fall + screen/4;
      }

      this.y -= (this.speed * delta);

    }else{
      if(this.y < this.scene.game.config.height){
        //this.y += (this.fall * delta);
      }else{
        // dead
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
      //this.scene.kitty.eye = false;
    }else{
      var x = this.x - this.half/2;
      //this.scene.kitty.eye = true;
    }
    return x;
  }

  eyeFollow(){
    this.eyeLeft.setPosition(this.x-this.height/4.5, this.y);
    this.irisLeft.setPosition(this.eyeLeft.x, this.eyeLeft.y);
    this.eyeRight.setPosition(this.x+this.height/4.5, this.y);
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
    // trigger animation
  }
}

export default Kitty;
