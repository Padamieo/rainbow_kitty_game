import phaser from 'phaser';
import Explosion from 'object/explosion';

class Explosions extends Phaser.GameObjects.Group {
  constructor (scene) {

    super(scene, Explosion, {
      classType: Explosion,
      defaultKey: 'explosion',
      defaultFrame: null,
      active: true,
      maxSize: -1,
      runChildUpdate: false,
      createCallback: null,
      removeCallback: null,
      createMultipleCallback: null
    });

    this.generateExplostionFrames();
  }

  generateExplostionFrames() {
    var graphics = this.scene.add.graphics({ x: 0, y: 0, fillStyle: { color: 0xffffff } });
    var i = 0;
    for (var f = 0; f < 5; f++) {
      var circle = new Phaser.Geom.Circle(50, 50, 5*f+i);

      var points = circle.getPoints(f+3);
      for (var i = 0; i < points.length; i++) {
        graphics.fillCircle(points[i].x, points[i].y, 10+i+f);
      }

      graphics.generateTexture('explosion_'+f, 100, 100);
      graphics.clear();
    }

    this.scene.anims.create({
      key: 'explosion',
      frames: [
        { key: 'explosion_0' },
        { key: 'explosion_1' },
        { key: 'explosion_2' },
        { key: 'explosion_3' },
        { key: 'explosion_4' }
      ],
      frameRate: 12,
      repeat: 0
    });

    // this.add.sprite(100, 100, 'explostion_0').play('explostion');

    // this.add.image(100, 100, 'explostion_0');
    // this.add.image(100, 200, 'explostion_1');
    // this.add.image(100, 300, 'explostion_2');
    // this.add.image(100, 400, 'explostion_4');
    // graphics.clear();
  }

  preUpdate (delta, step, processors) {
    super.preUpdate(delta, step, processors);
    // Bullet.update(delta);
  }
}

export default Explosions;
