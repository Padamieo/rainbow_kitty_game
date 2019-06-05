import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Rainbow extends phaser.GameObjects.Sprite {
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
    super(scene);
    this.emitter = emitter;
    scene.add.existing(this);
    console.log(emitter);
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta);

    if(this.scene.kitty){
      this.emitter.setPosition(this.scene.kitty.x, this.scene.kitty.y+(this.scene.kitty.half/2));
      if(this.fly & this.alive){
        this.emitter.resume();
      }else{
        // this.emitter.pause();
      }
    }
  }
}

export default Rainbow;
