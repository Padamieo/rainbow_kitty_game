import phaser from 'phaser';

// class example  extends phaser.GameObjects.Particles.Particle { // this does not work
class Debris extends phaser.GameObjects.Sprite {
  constructor (scene) {

    super(scene);

    var particles = scene.add.particles('rocket_pieces');
    var config = {
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
      tint: { onEmit: () => { return this.emitter.colour; } },
      alpha:{ start:1, end:0, ease: "Cubic.easeIn" },
      on: true,
      rotate: { min: 0, max: 360 },
      active: true
    }
    //this.emitter = emitter;
    this.emitter = particles.createEmitter(config);
    scene.add.existing(this);
    this.emitter.colour = 0xfffff33;
    // scene.add.existing(this);
    //console.log(emitter);
    // this.emitter = particles.createEmitter(config);
  }

  start (x, y, tint){
    this.emitter.colour = tint;
    this.emitter.explode(5, x, y);
  }

  // update(){
  //   console.log('b');
  // }

  preUpdate (time, delta) {
    super.preUpdate(time, delta);
    // super.preUpdate(delta, step, processors);
    // console.log(this, 'a');
    // console.log(this.scene);
    if(this.scene.kitty){
      // this.emitter.setPosition(this.scene.kitty.x, this.scene.kitty.y);
      //this.emitter.resume();
    }

    // this.emitter.explode(5, 100, 100);
  }
}

export default Debris;
