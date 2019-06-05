import phaser from 'phaser';

// class example  extends phaser.GameObjects.Particles.Particle { // this does not work
class Debris extends phaser.GameObjects.Sprite {
  constructor (scene) {

    super(scene);

    var particles = scene.add.particles('rocket_pieces');
    var wreckage_config = {
      frame: [1, 10, 11],
      x: 100,
      y: 100,
      lifespan: 2000,
      speed: 120,
      angle: { min: 0, max: 360 },
      accelerationY: { min: 20, max: 100 },
      gravityY: 100,
      blendMode: 0,
      frequency: -1,
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
    this.sparks.setFrame(frame);
    this.sparks.explode(4, x, y);
    this.wreckage.colour = tint;
    this.wreckage.explode(5, x, y);
  }

  // preUpdate (time, delta) {
  //   super.preUpdate(time, delta);
  // }
}

export default Debris;
