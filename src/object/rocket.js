import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Rocket extends phaser.Physics.Arcade.Sprite {
    constructor (scene) {
      super(scene, 0, 0,'rocket_frames');

      //this.setTexture('all').setOrigin(0.5, 0.5);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      // this.setRotation(phaser.Math.DegToRad(45));

      //colours
      // var c = phaser.Display.Color.RandomRGB(0,256);
      // var r = phaser.Display.Color.ComponentToHex(c.r);
      // var g = phaser.Display.Color.ComponentToHex(c.g);
      // var b = phaser.Display.Color.ComponentToHex(c.b);
      // console.log('0x'+r+g+b);
      // this.colour = '0x'+r+g+b;

      this.setTint(this.colour());

      this.type = 1;
      this.max = 0.1;
      this.speed = 0;

      scene.enemies.add(this);

      this.start = this.x;
      this.ax = this.scene.kitty.x;

      console.log(this.scene.game.config.width/12, this.scene.game.config.width);

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

        if(this.type === 1){
          this.aim();
        }

      }else{
        this.reset();
      }
    }

    aim () {
      var c = Phaser.Math.Angle.Between(this.ax, 0, this.x, this.y);
      // var a = Math.atan2(0, this.x * this.ax);
      this.setRotation(c);
      // this.x = (this.ax - this.start);
    }

    /*
    winder () {
      // console.log( Math.sin(delta) );
      // this.x = Math.cos(delta);
      var b = Math.sin(time * 0.002);
      //this.a = this.b - b;
      var magnitude = (b + this.b) * 10;
      this.b = b;
      this.setRotation(magnitude);
      console.log(magnitude);
      this.x = this.b * this.scene.game.config.width/8;
      this.x = this.x + this.start;
    }
    */

    reset () {
      this.x = Phaser.Math.Between(0, this.scene.game.config.width);
      //this.x = this.scene.game.config.width/2;
      this.start = this.x;
      this.y = this.scene.game.config.height;
    }

    colour (type) {
      var colour = '';
      switch (type) {
        case 1:
          colour = 0x4EF24E;
          break;
        case 2:
          colour = 0xFEFF0D;
          break;
        default:
          colour = 0xf24e90;
      }
      return colour;
    }
}

export default Rocket;
