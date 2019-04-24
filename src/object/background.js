import phaser from 'phaser';

class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene, x, y, width, height, texture, frame) {
      super(scene, x, y, width, height, 'wall');
      scene.add.existing(this);

      //this.setTexture('all').setOrigin(0.5, 0.5);
      this.max = 2;
      this.speed = 0;
    }


    preUpdate (time, delta) {
      // super.preUpdate(time, delta);
      if(this.scene.kitty.fly){
        if(this.speed < this.max){
          this.speed += 0.1;
        }
      }else{
        if(this.speed > 0){
          this.speed -= 0.1;
        }else{
          this.speed = 0;
        }
      }

      this.tilePositionY = this.tilePositionY - this.speed;
    }
}

export default Background;
