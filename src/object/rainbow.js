import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Rainbow extends phaser.GameObjects.Particles.Particle {
  constructor (scene) {
    var particles = scene.add.particles('tear');
    var emitter = particles.createEmitter({
        x: 100,
        y: 100,
        angle: { min: 140, max: 40 },
        lifespan: 2000,
        speed: 20,
        accelerationY: { min:20, max: 100 },
        gravityY: 200,
        scale: { start: 0, end: 2 },
        blendMode: 0,
        frequency: 140,
        on: true,
        active: true
    });
    super(emitter);
    this.emitter = emitter;
    // scene.add.existing(this);
    console.log(emitter);
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta);
    // super.preUpdate(delta, step, processors);
    console.log('a');
    if(this.kitty){
      this.emitter.setPosition(this.kitty.x, this.kitty.y);
    }
  }
}

export default Rainbow;
