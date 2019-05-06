import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Kitty extends phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'kitty_frames');

    //this.setTexture('all').setOrigin(0.5, 0.5);
    scene.add.existing(this);
    /*
    this.setRotation(phaser.Math.DegToRad(180));

    this.anims.play('vertical_out', true);
    this.flipX = false;
    this.flipY = false;

    this.direction = 0;

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

    this.setPosition(x, y);
    this.old = {x:0, y:0};
    this.old.x = x;
    this.old.y = y;
    */

    this.alive = true;
    this.y_velocity = 0;
    this.fly = false;
    this.speed = 0;

    this.half = this.height/2;
    this.fall = 0.05;
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta);
    // console.log(this);
    if(this.fly & this.alive){
      if(this.y < this.half){
        this.speed = 0;
      }else{
        this.speed = 0.05;
      }

      this.y -= (this.speed * delta);

    }else{
      if(this.y < this.scene.game.config.height){
        this.y += (this.fall * delta);
      }else{
        // dead
      }
    }
    // if(this.y > game.height-(game.height/10)){
    //   this.dead = true;
    // }

  }
}

export default Kitty;
