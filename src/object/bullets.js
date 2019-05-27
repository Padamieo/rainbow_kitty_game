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

    this.generateBulletShape2();

    scene.anims.create({
      key: 'laser',
      frames: scene.anims.generateFrameNumbers('dynamicFrames', { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1
    });
    var ball = this.scene.add.sprite(50, 400, 'dynamicFrames').play('laser');

    console.log(this);
    //scene.add.sprite(200, 500, 'pulse');
  }

  generateBulletShape2 () {
    var canvasFrame = this.scene.textures.createCanvas('dynamicFrames', 200, 128);
    var ctx = canvasFrame.context;
    var x = 0;
    var y = 0;

    for (var i = 0; i < this.colours.length; i++){
      ctx.fillStyle = '#'+this.colours[i];
      console.log('#'+this.colours[i]);
      //ctx.beginPath();
      ctx.rect(0, 0, 10, 20);
      ctx.rect(20, 20, 5, 5);
      ctx.fill();
      //ctx.stroke();
      canvasFrame.add(i, 0, x, y, 10, 20);
      x += 10;
    }
    console.log(canvasFrame);
    canvasFrame.refresh();
    this.scene.add.image(200, 600, 'dynamicFrames', '__BASE').setOrigin(0);
  }

  generateBulletShape () {
    var length = 1;//this.colours.length;
    var graphics = this.scene.add.graphics({ x: 0, y: 0 });
    for (var i = 0; i < length; i++) {
      graphics.fillStyle('0x'+this.colours[i]);
      graphics.fillRect(this.width * i, 0, this.width, this.height);
    }
    graphics.generateTexture('laser_bullets', this.width*length, this.height);
    graphics.clear();
    this.scene.add.sprite(200, 500, 'laser_bullets');
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
