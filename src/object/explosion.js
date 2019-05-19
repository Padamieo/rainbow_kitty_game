import phaser from 'phaser';

class Explosion extends phaser.GameObjects.Sprite {
  constructor (scene) {
    super(scene, 0, 0,'explosion_0');
    //this.play('explostion');
    this.on('animationcomplete', this.animComplete, this);

    // build array of random directions for variation
    // this.a = (Math.random() * Math.PI * 2);

    // sprite for particles
    // emitter.explode(10, this.kitty.x, this.kitty.y);
    // sprite for reckage
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta);
  }

  start(x, y){
    this.setPosition(x, y);
    //this.setRotation(this.a);
    this.setActive(true);
    this.setVisible(true);
    this.play('explosion');
  }

  animComplete() {
    this.setActive(false);
    this.setVisible(false);
  }
}

export default Explosion;
