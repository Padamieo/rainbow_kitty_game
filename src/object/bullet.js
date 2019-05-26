import phaser from 'phaser';

class Bullet extends phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0,'laser_bullet');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.direction = this.rotation;
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta);
    var x = Math.cos(this.direction);
    var y = Math.sin(this.direction);
    this.y += y * 20;
    this.x += x * 20;

    if(this.y > this.scene.game.config.height || this.y < 0 || this.x < 0 || this.x > this.scene.game.config.width){
      this.onOutOfBounds();
    }
  }

  onOutOfBounds(){
    //this.direction = this.direction + Math.PI;
    this.reset();
  }

  fire(ax, ay){
    if(this.scene.kitty){
      if(this.scene.kitty.eye){
        var x = this.scene.kitty.x + this.scene.kitty.half/2;
        this.scene.kitty.eye = false;
      }else{
        var x = this.scene.kitty.x - this.scene.kitty.half/2;
        this.scene.kitty.eye = true;
      }
      var y = this.scene.kitty.y;
      this.setPosition(x, y);
      var direction = phaser.Math.Angle.Between(x, y, ax, ay);
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
