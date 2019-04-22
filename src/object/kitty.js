import phaser from 'phaser';

// class Turt extends phaser.GameObjects.Sprite {
class Kitty extends phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
      super(scene, x, y, 'kitty_frames');

      //this.setTexture('all').setOrigin(0.5, 0.5);
      scene.add.existing(this);
      /*
      this.setRotation(phaser.Math.DegToRad(180));

      this.anims.play('vertical_out', true);
      this.flipX = false;
      this.flipY = false;

      this.direction = 0;

      this.on('animationupdate-vertical_crawl', () => {
        //console.log(this.anims.currentAnim.key);
        this.flipX = !this.flipX;
      }, this);

      this.on('animationupdate-diagonal_crawl', () => {
        //console.log(this.anims.currentAnim.key);
        this.flipX = !this.flipX;
        // this.flipY = !this.flipY;
        //this.body.setRotation(360);
        this.setRotation(phaser.Math.DegToRad(this.flipX ? -90 : 0));
      }, this);

      this.moving = false;

      this.setPosition(x, y);
      this.old = {x:0, y:0};
      this.old.x = x;
      this.old.y = y;
      */

      //colours
      // var c = phaser.Display.Color.RandomRGB(0,256);
      // var r = phaser.Display.Color.ComponentToHex(c.r);
      // var g = phaser.Display.Color.ComponentToHex(c.g);
      // var b = phaser.Display.Color.ComponentToHex(c.b);
      // console.log('0x'+r+g+b);
      // this.colour = '0x'+r+g+b;
      // this.setTint('0x'+r+g+b);

    }

    update (game) {
      var dt = game.time.elapsed;
      this.x += toPlayerX * (0.05 * dt);

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
    }

    onWorldBounds(){
      console.log('onWorldBounds');
    }
}

export default Kitty;
