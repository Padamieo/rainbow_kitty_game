import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Bullet extends Phaser.GameObjects.Group {
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

      var B = new Phaser.Class({

          Extends: Phaser.GameObjects.Sprite,

          initialize:

          function constructor (scene){
              Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'laser_bullet');

              this.speed = Phaser.Math.GetSpeed(500, 1);
          },

          fire: function (x, y){
              this.setPosition(x, y);
              this.setActive(true);
              this.setVisible(true);
          },

          preUpdate: function (delta){
            console.log('BBBBBB');
              this.y += 0.01 * delta;
              // this.y -= this.speed * delta;
              //
              // if (this.y < -50){
              //     this.setActive(false);
              //     this.setVisible(false);
              // }
          }

      });

      super(scene, B, {
        classType: B,
        maxSize: 10,
        runChildUpdate: true
      });
    }

    preUpdate (delta, step, processors) {
      super.preUpdate(delta, step, processors);
      B.update(delta);
    }
}

export default Bullet;
