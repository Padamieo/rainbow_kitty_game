import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
// phaser.Physics.Arcade.Sprite
class Rocket extends phaser.GameObjects.Sprite {
    constructor (scene) {
      super(scene, 0, 0,'rocket_frames');

      //this.setTexture('all').setOrigin(0.5, 0.5);
      scene.add.existing(this);
      // scene.physics.add.existing(this);
      // this.setRotation(phaser.Math.DegToRad(45));
      scene.physics.add.existing(this);
      this.type = 0;
      this.max = 0.1;
      this.speed = 0;

      scene.enemies.add(this);

      this.start = this.x;
      this.ax = this.scene.kitty.x;
      this.ay = this.scene.kitty.y;

      this.gap = this.scene.game.config.width/28;
      this.setDepth(2);

      this.exhaust = scene.add.image(0, 0, 'exhaust').setPipeline('Custom');
      this.exhaust.setOrigin(0.5, 0);
      this.exhaust.setScale(0.5);
      //this.exhaust

      // this.setRotation(Math.PI/5);
      this.body.setSize(this.height, this.height, true);

      this.setTint(this.colour(this.type));
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

        this.movement(time, delta);

      }else{
        this.reset();
      }

      this.exhaust.x = this.x + this.exhaust.height/3 * Math.cos((Math.PI/2)+this.rotation);
      this.exhaust.y = this.y + this.exhaust.height/3 * Math.sin((Math.PI/2)+this.rotation);
      this.exhaust.setRotation(this.rotation);
      //this.exhaust.setRotation((Math.PI/3)*this.rotation);
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
      var c = phaser.Math.Angle.Between(this.x, this.y, this.ax, this.ay);
      // var a = Math.atan2(0, this.x * this.ax);
      var velocity = new phaser.Math.Vector2();
      //this.physics.velocityFromRotation(angle, 10, velocity);
      this.setRotation(c + Math.PI/2);
      var x = Math.cos(c);
      // V.y = sin(A)
      console.log(x);
      //this.scene.pause("Menu");
      this.x += x;
    }


    winder (time) {
      // console.log( Math.sin(delta) );
      // this.x = Math.cos(delta);
      var b = Math.sin(time * 0.002);
      //this.a = this.b - b;
      var magnitude = ((b + this.b) * 0.1)/-1;
      this.b = b;
      this.setRotation(magnitude);
      // console.log(magnitude);
      this.x = this.b * this.scene.game.config.width/8;
      this.x = this.x + this.start;
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
        case 1:
          colour = 0x00DFFC;
          break;
        case 2:
          colour = 0x4EF24E;
          break;
        case 3:
          colour = 0xFEFF0D;
          break;
        case 4:
          colour = 0xFFAA00;
          break;
        case 5:
          colour = 0xf24e90;
          break;
        default:
          colour = 0xFF003C;
      }
      return colour;
    }

    hit(){

      var explosion = this.scene.explosions.get();
      if (explosion) {
        explosion.start(this.x, this.y);
      }

      this.setActive(false);
      this.setVisible(false);
      this.exhaust.destroy();
      this.destroy();
    }
}

export default Rocket;
