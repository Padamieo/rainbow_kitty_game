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

    //this.generateBulletShape2();

    scene.anims.create({
      key: 'laser',
      frames: scene.anims.generateFrameNumbers('dynamicFrames', { start: 0, end: 3 }),
      frameRate: 0,
      repeat: -1
    });

    //var ball = this.scene.add.sprite(50, 400, 'dynamicFrames').play('laser');
    //scene.add.sprite(200, 500, 'pulse');
  }

  generateBulletShape () {
    var canvasFrame = this.scene.textures.createCanvas('dynamicFrames', this.width*this.colours.length, this.height);
    var ctx = canvasFrame.context;
    for (var i = 0; i < this.colours.length; i++){
      ctx.beginPath();
      ctx.fillStyle = '#'+this.colours[i];
      ctx.fillRect(i*this.width, 0, this.width, this.height);
      ctx.closePath();
      canvasFrame.add(i, 0, i*this.width, 0, this.width, this.height);
    }
    canvasFrame.refresh();
    // this.scene.add.image(200, 600, 'dynamicFrames', '__BASE').setOrigin(0);
  }

  generateBulletShape2 () {
    var length = 1;//this.colours.length;
    var graphics = this.scene.add.graphics({ x: 0, y: 0 });
    for (var i = 0; i < length; i++) {
      graphics.fillStyle('0x'+this.colours[i]);
      graphics.fillRect(this.width * i, 0, this.width, this.height);
    }
    graphics.generateTexture('laser_bullets', this.width*length, this.height);
    graphics.clear();
    //this.scene.add.sprite(200, 500, 'laser_bullets');
  }

  generateColours() {
    return ['99ff22', 'ff0099', '5588ff'];
  }

  preUpdate (delta, step, processors) {
    super.preUpdate(delta, step, processors);
    // Bullet.update(delta);
  }
}

export default Bullets;
