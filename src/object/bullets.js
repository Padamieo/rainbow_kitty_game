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
    this.sparkSize = 5;
    this.colours = this.generateColours();

    if(!scene.textures.exists('dynamicLaserFrames')){
      this.generateBulletShape();
    }
    if(!scene.textures.exists('dynamicParticleFrames')){
      this.generateBulletParticles();
    }

    scene.anims.create({
      key: 'laser',
      frames: scene.anims.generateFrameNumbers('dynamicLaserFrames', { start: 0, end: 3 }),
      frameRate: 0,
      repeat: -1
    });

    scene.anims.create({
      key: 'laserParticles',
      frames: scene.anims.generateFrameNumbers('dynamicParticleFrames', { start: 0, end: 3 }),
      frameRate: 0,
      repeat: -1
    });

  }

  generateBulletShape () {
    var canvasFrame = this.scene.textures.createCanvas('dynamicLaserFrames', this.width*this.colours.length, this.height);
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

  generateBulletParticles () {
    var canvasFrame = this.scene.textures.createCanvas('dynamicParticleFrames', this.sparkSize*this.colours.length, this.sparkSize);
    var ctx = canvasFrame.context;
    for (var i = 0; i < this.colours.length; i++){
      ctx.beginPath();
      ctx.fillStyle = '#'+this.colours[i];
      ctx.fillRect(i*this.sparkSize, 0, this.sparkSize, this.sparkSize);
      ctx.closePath();
      canvasFrame.add(i, 0, i*this.sparkSize, 0, this.sparkSize, this.sparkSize);
    }
    canvasFrame.refresh();
    // this.scene.add.image(200, 600, 'dynamicParticleFrames', '__BASE').setOrigin(0);
  }

  generateColours() {
    return ['99ff22', 'ff0099', '5588ff'];
  }
}

export default Bullets;
