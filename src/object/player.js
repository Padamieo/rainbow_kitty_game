import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
// Phaser.Geom.Circle
class Player extends phaser.GameObjects.Graphics {
    constructor (scene, x, y) {
      super(scene, x, y);
      // scene.add.existing(this);

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

      // this.circle = new Phaser.Geom.Circle(0, 0, 100);
      // this.graphics2 = this.graphics.fillCircleShape(this.circle);
      // this.graphics.strokeCircleShape(this.circle);
      // var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
      // graphics.fillCircleShape(circle);
      this.held = false;
    }

    callback() {
      // console.log('I am the call back');
    }

    update () {
      // var dt = game.time.elapsed;
      this.graphics.clear();
      if(this.scene.input.activePointer.isDown){
        if(!this.held){
          this.timer = this.scene.time.addEvent({
            delay: 0,                // ms
            callback: this.callback,
            //args: [],
            callbackScope: this,
            repeat: 0,
            loop: true,
          });
          this.held = true;
        }else{
          console.log(this.timer.getElapsed(), this.timer.getOverallProgress());
        }

        this.circle = new Phaser.Geom.Circle(
          this.scene.input.activePointer.worldX,
          this.scene.input.activePointer.worldY,
          100);
        this.graphics.strokeCircleShape(this.circle);

        this.circle = new Phaser.Geom.Circle(
          this.scene.input.activePointer.worldX,
          this.scene.input.activePointer.worldY,
          50);
        this.graphics.fillCircleShape(this.circle);

      }else{
        if(this.timer){
          this.timer.remove();
        }
        this.held = false;
      }

      // if(this.body.position.x.toFixed(0) !== this.old.x || this.body.position.y.toFixed(0) !== this.old.y){
      //   console.log(this.body.position.x.toFixed(0), this.old.x );
      //   this.old.x = this.body.position.x.toFixed(0);
      //   this.old.y = this.body.position.y.toFixed(0);
      //   // console.log('update', this.old);
      //   if(window.game.socket.connected){
      //     window.game.socket.emit('updateServer', {
      //       id:this.id,
      //       x:this.old.x,
      //       y:this.old.y
      //     });
      //   }
      // }
    }

    preUpdate (time, delta) {
      super.preUpdate(time, delta);
      //this.y -= 5 * (0.05 * delta);
      console.log(this);
      console.log(this.scene.input.activePointer.isDown);
    }

    onWorldBounds(){
      console.log('onWorldBounds');
    }
}

export default Player;
