import phaser from 'phaser';
import Rocket from 'object/rocket';

class Enemies extends Phaser.GameObjects.Group {
  constructor (scene, obj) {

    super(scene, Rocket, {
      classType: Rocket,
      defaultKey: null,
      defaultFrame: null,
      active: true,
      maxSize: -1,
      runChildUpdate: false,
      createCallback: null,
      removeCallback: null,
      createMultipleCallback: null
    });

    this.generateExhaustShape();

    this.scene.tick = this.scene.time.addEvent({
      delay: 2000,
      callback: this.callback.bind(this),
      loop: true
    });

    this.limit = 20;
    this.list = [];
  }

  generateExhaustShape () {
    var polygon = new Phaser.Geom.Polygon([
      25, 0,
      14, 8,
      10, 20,
      14, 40,
      25, 60,
      36, 40,
      40, 20,
      36, 8,
      25, 0
    ]);
    var graphics = this.scene.add.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xfeffcf);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('exhaust', 50, 60);
    graphics.clear();
  }

  callback(){

    //console.log('add');
    if(this.getLength() <= this.limit){
    //  console.log('spawn', this.getLength());
      new Rocket( this.scene, this.scene.cameras.main.centerX, this.scene.cameras.main.centerY );
      // var enemy = this.scene.enemies.get();
      // if (enemy) {
      //   enemy.start(this.x, this.y);
      // }
    }
  }

  start(){

  }

  preUpdate (delta, step, processors) {
    super.preUpdate(delta, step, processors);
    // Bullet.update(delta);
  }
}

export default Enemies;