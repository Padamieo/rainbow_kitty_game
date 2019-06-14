import phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';

// class example  extends phaser.GameObjects.Particles.Particle { // this does not work
class Debris extends phaser.GameObjects.RenderTexture  {
  constructor (scene) {

    super(scene);

    // var particles = scene.add.particles('rocket_pieces');
    // var wreckage_config = {
    //   frame: [0,1,13,12],
    //   x: 100,
    //   y: 100,
    //   lifespan: 2000,
    //   speed: 120,
    //   angle: { min: 0, max: 360 },
    //   accelerationY: { min: 20, max: 100 },
    //   gravityY: 100,
    //   blendMode: 0,
    //   frequency: -1,
    //   tint: { onEmit: () => { return this.wreckage.colour; } },
    //   alpha:{ start:1, end:0, ease: "Cubic.easeIn" },
    //   on: true,
    //   rotate: { min: 0, max: 360 },
    //   active: true
    // };
    // this.wreckage = particles.createEmitter(wreckage_config);
    // this.wreckage.colour = 0xffffff;

    if(!scene.textures.exists('dynamicTestFrames')){
      //this.generateTestParticles();
      this.generateTestParticles();

    }
    console.log(scene.textures.exists('dynamicTestFrames'));
    //this.generateTestParticles(scene);


    // scene.anims.create({
    //   key: 'testParticles',
    //   frames: scene.anims.generateFrameNumbers('dynamicTestFrames', { start: 0, end: 3 }),
    //   frameRate: 0,
    //   repeat: -1
    // });

    //scene.add.image(60, 60, 'doodle').setOrigin(0).setScale(1);

    var particles = scene.add.particles('dynamicTestFrames');
    var wreckage_config = {
      frame: 0,
      x: 100,
      y: 100,
      lifespan: 2000,
      speed: 120,
      angle: { min: 0, max: 360 },
      accelerationY: { min: 20, max: 100 },
      gravityY: 100,
      blendMode: 0,
      frequency: 100,
      tint: { onEmit: () => { return this.wreckage.colour; } },
      alpha:{ start:1, end:0, ease: "Cubic.easeIn" },
      on: true,
      rotate: { min: 0, max: 360 },
      active: true
    };
    this.wreckage = particles.createEmitter(wreckage_config);
    this.wreckage.colour = 0xffffff;


    var particlesspark = scene.add.particles('dynamicParticleFrames');
    var spark_config = {
      frame: 0,
      x: 100,
      y: 100,
      lifespan: 2000,
      speed: 250,
      angle: { min: 0, max: 360 },
      accelerationY: { min: 20, max: 100 },
      gravityY: 0,
      blendMode: 0,
      frequency: -1,
      alpha:{ start:1, end:0, ease: "Cubic.easeIn" },
      on: true,
      rotate: { min: 0, max: 90 },
      active: true
    };
    this.sparks = particlesspark.createEmitter(spark_config);

    scene.add.existing(this);

  }

  start (x, y, tint, frame){
    if(frame !== undefined){
      // this.sparks.setFrame(frame);
      // this.sparks.explode(4, x, y);
    }
    this.wreckage.colour = tint;
    console.log(this.wreckage);
    this.wreckage.explode(5, x, y);
  }

  generateTestParticles (scene) {
    var canvasFrame = scene.textures.createCanvas('dynamicTestFrames', 15, 30);
    var ctx = canvasFrame.context;
    var img = new Image();
    console.log(rocket);
    img.src = '.'+rocket;
    //for (var i = 0; i < this.colours.length; i++){
    //console.log(rocket);
    img.onload = () => {
      ctx.save();
      // ctx.beginPath();
      //ctx.rect(0, 10, 12, 12);
      ctx.rotate(10 * Math.PI / 180);
      //ctx.rect(0, 10, 12, 12);
      //ctx.fillStyle = '#ffffff';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(15, 0);

      ctx.lineTo(18, 18);
      ctx.lineTo(12, 20);
      ctx.lineTo(15, 25);

      ctx.lineTo(15, 28);
      ctx.lineTo(0, 28);
      ctx.closePath();

      ctx.clip();
      // ctx.closePath();

      ctx.drawImage(img, -10, -20);
      //ctx.closePath();
      //ctx.beginPath();
      //ctx.fillStyle = '#ffffff';

      canvasFrame.add(0, 0, 0, 0, 15, 28);
      ctx.restore();
    //}
    canvasFrame.refresh();
    }
    //this.scene.add.image(200, 600, 'dynamicTestFrames', '__BASE').setOrigin(0);
  }


  // preUpdate (time, delta) {
  //   super.preUpdate(time, delta);
  // }
}

export default Debris;
