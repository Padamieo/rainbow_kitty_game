import phaser from 'phaser';

class Player extends phaser.GameObjects.Graphics {
  constructor (scene, options) {
    super(scene, options);
    scene.add.existing(this);

    this.graphics = scene.add.graphics({
      lineStyle: {
        width: 2,
        alpha: 0.5,
        color: 0xffffff
      },
      fillStyle: {
        alpha: 0.5,
        color: 0xffffff
      }
    });

    this.duration = 1000;
    this.full = this.scene.game.config.width/4;
    this.size = 0;
    this.held = false;
    this.start = 0;
    this.end = 0;

  }

  draw (size) {
    this.circle = new Phaser.Geom.Circle(
      this.scene.input.activePointer.worldX,
      this.scene.input.activePointer.worldY,
      this.full);
    this.graphics.strokeCircleShape(this.circle);

    this.circle = new Phaser.Geom.Circle(
      this.scene.input.activePointer.worldX,
      this.scene.input.activePointer.worldY,
      size);
    this.graphics.fillCircleShape(this.circle);
  }

  preUpdate (time, delta) {

    this.graphics.clear();

    if(this.scene.kitty.alive){
      if(this.scene.input.activePointer.isDown){
        if(!this.held){
          this.start = time;
          this.end = time + this.duration;
          this.held = true;
          this.size = 0;
        }else{

          var change = time - this.start;
          if(this.size < this.full){
            this.size = change * (this.full / this.duration);
          }
        }

        this.draw(this.size);
        if(this.end <= time){
          this.scene.kitty.fly = true;
        }

      }else{

        if(this.end > time){
            console.log('shoot');

            var bullet = this.scene.bullets.get();
            console.log('hello', bullet);
            if (bullet) {
              bullet.fire(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY);
            }

            this.end = 0;
        }
        this.held = false;
        this.size = 0;
        this.scene.kitty.fly = false;
      }
    }else{
      if(this.scene.input.activePointer.isDown){
        this.circle = new Phaser.Geom.Circle(
          this.scene.input.activePointer.worldX,
          this.scene.input.activePointer.worldY,
          50);
        this.graphics.fillStyle(0xff0000, 0.5);
        this.graphics.fillCircleShape(this.circle);
      }
    }
  }
}

export default Player;
