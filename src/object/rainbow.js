import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Rainbow extends phaser.GameObjects.Particles.Particle {
  constructor (emitter) {
    super(emitter);
    // scene.add.existing(this);
    console.log(emitter);
  }

  preUpdate (delta, step, processors) {
    super.preUpdate(delta, step, processors);

  }
}

export default Rainbow;
