import phaser from 'phaser';

class Game extends phaser.Scene {
  constructor(test) {
    super({
        key: 'Game'
    });
  }

  preload() {
    // this.load.image('bg', bg);
    // this.load.spritesheet('all',
    //   all,
    //   { frameWidth: 16, frameHeight: 16, endFrame: 11 }
    // );

    //this.load.image('all', turtle);
    console.log('game - Game');
  }

  create () {
    console.log('game -Game');
  }

  update(){

  }

}
export default Game;
