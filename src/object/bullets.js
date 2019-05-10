import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Bullets extends Phaser.GameObjects.Group {
    constructor (scene) {
      //super(scene);
      // scene.add.existing(this);
      //var rect = scene.add.rectangle(10, 10, 10, 20, 0x99ff22);
      var polygon = new Phaser.Geom.Polygon([
        0, 0,
        10, 0,
        10, 20,
        0, 20
      ]);
      var graphics = scene.add.graphics({ x: 0, y: 0 });
      graphics.fillStyle(0x99ff22);
      graphics.fillPoints(polygon.points, true);
      graphics.generateTexture('laser_bullet', 10, 20);
      graphics.clear();



      var Bullet = new Phaser.Class({
          Extends: Phaser.GameObjects.Sprite,

          initialize: function (scene){
              Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'laser_bullet');

              this.speed = Phaser.Math.GetSpeed(500, 1);
          },

          fire: function (ax, ay){

              if(this.scene.kitty){
                if(this.scene.bullets.eye){
                  var x = this.scene.kitty.x + this.scene.kitty.half/2;
                  this.scene.bullets.eye = false;
                }else{
                  var x = this.scene.kitty.x - this.scene.kitty.half/2;
                  this.scene.bullets.eye = true;
                }
                var y = this.scene.kitty.y;

              }

              this.setPosition(x, y);
              var direction = phaser.Math.Angle.Between(x, y, ax, ay);
              this.direction = direction;
              this.setRotation(this.direction + Math.PI/2);
              this.setActive(true);
              this.setVisible(true);
          },

          preUpdate: function (delta){
              var x = Math.cos(this.direction);
              var y = Math.sin(this.direction);
              this.y += y * 20;
              this.x += x * 20;

              if(this.y > this.scene.game.config.height || this.y < 0 || this.x < 0 || this.x > this.scene.game.config.width){
                console.log('out');
                this.direction = this.direction + Math.PI;
                this.setActive(false);
                // this.setVisible(false);
              }


          }

      });

      super(scene, Bullet, {
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
      });

      this.eye = true;
    }

    preUpdate (delta, step, processors) {
      super.preUpdate(delta, step, processors);
      // Bullet.update(delta);
    }
}

export default Bullets;
