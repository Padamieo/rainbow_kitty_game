import phaser from 'phaser';

class Enemies extends Phaser.GameObjects.Group {
  constructor (scene, obj) {

    super(scene, obj, {
      classType: obj,
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

    // this.scene.tick = this.time.addEvent({
    //   delay: 2000,
    //   callback: this.callback.bind(this),
    //   loop: true
    // });

  }

  generateExhaustShape () {
    var polygon = new Phaser.Geom.Polygon([
      15, 0,
      4, 8,
      0, 20,
      4, 40,
      15, 60,
      26, 40,
      30, 20,
      26, 8,
      15, 0
    ]);
    var graphics = this.scene.add.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xfeffcf);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('exhaust', 30, 60);
    graphics.clear();
  }

  callback(){
    //console.log('add');
    if(this.scene.enemies.getLength() < this.scene.enemy.limit){
      new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );
    }
  }

  preUpdate (delta, step, processors) {
    super.preUpdate(delta, step, processors);
    // Bullet.update(delta);
  }
}

export default Enemies;
