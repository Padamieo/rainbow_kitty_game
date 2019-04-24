import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Rocket extends phaser.Physics.Arcade.Sprite {
    constructor (scene) {
      super(scene, 0, 0,'rocket_frames');

      //this.setTexture('all').setOrigin(0.5, 0.5);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setRotation(phaser.Math.DegToRad(45));


      //colours
      var c = phaser.Display.Color.RandomRGB(0,256);
      var r = phaser.Display.Color.ComponentToHex(c.r);
      var g = phaser.Display.Color.ComponentToHex(c.g);
      var b = phaser.Display.Color.ComponentToHex(c.b);
      console.log('0x'+r+g+b);
      this.colour = '0x'+r+g+b;
      this.setTint('0x'+r+g+b);

      this.type = 0;
      this.max = 0.1;
      this.speed = 0;
      this.reset();
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);
      if(this.y > (0 - this.height)){
        if(this.scene.kitty.fly){
          this.speed = 0.05;
        }else{
          this.speed = 0.1;
        }
        this.y -= (this.speed * delta);
      }else{
        this.reset();
      }
    }

    reset () {
      this.x = Phaser.Math.Between(0, this.scene.game.config.width);
      this.y = this.scene.game.config.height;
    }

    onWorldBounds(){
      console.log('onWorldBounds');
    }
}

export default Rocket;
