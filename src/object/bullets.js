import phaser from 'phaser';
import Bullet from 'object/bullet';

class Bullets extends Phaser.GameObjects.Group {
  constructor (scene) {

    super(scene, Bullet, {
      classType: Bullet,
      defaultKey: null,
      defaultFrame: null,
      active: true,
      maxSize: 20,
      runChildUpdate: false,
      createCallback: null,
      removeCallback: null,
      createMultipleCallback: null
    });

    this.amount = 5;
    this.width = 10;
    this.height = 20;
    this.colours = this.generateColours();
    this.generateBulletShape();
  }

  generateBulletShape () {

    var polygon = new Phaser.Geom.Polygon([
      0, 0,
      10, 0,
      10, 20,
      0, 20
    ]);
    var graphics = this.scene.add.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0x99ff22);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('laser_bullet', 10, 20);
    graphics.clear();
  }

  generateColours() {
    return [];
  }

  preUpdate (delta, step, processors) {
    super.preUpdate(delta, step, processors);
    // Bullet.update(delta);
  }
}

export default Bullets;
