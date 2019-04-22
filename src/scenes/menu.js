// import phaser from 'phaser';

import bb from 'assets/testsmall.png';
import bg from 'assets/UIpack_vector.svg';
import rocket from 'assets/rocket_test.svg';
import kitty from 'assets/kitty_test.svg';
import phaser from 'phaser';

import Rocket from 'object/rocket';
import Kitty from 'object/kitty';
import Player from 'object/player';

class Menu extends phaser.Scene {
  constructor(test) {
    super({
        key: 'Menu'
    });
  }

  preload() {
    this.load.image('bb', bb);
    this.load.svg('bg', bg, { width: 1000, height:1000 });
    this.load.svg('rocket', rocket, { width: 150, height:56 });
    this.load.svg('kitty', kitty, { width: 400, height:400 });

    this.load.spritesheet('rocket_frames',
    rocket,
      { frameWidth: 1, frameHeight: 56, frameWidth: 30 }
    );

    this.load.spritesheet('kitty_frames',
    kitty,
      { frameWidth: 1, frameHeight: 200, frameWidth: 200 }
    );


    this.add.text(0, 180, "Signature: " + 'test', { fill: '#ffffff' });
    // this.load.image('bg', bg);
    // this.load.spritesheet('all',
    //   all,
    //   { frameWidth: 16, frameHeight: 16, endFrame: 11 }
    // );

    //this.load.image('all', turtle);
    console.log('preload - Menu');
  }

  create () {



    this.add.image(0, 0, 'bb').setOrigin(0).setScale(1.2);
    this.add.image(0, 60, 'rocket').setOrigin(0).setScale(1);

    this.add.image(0, 160, 'rocket_frames').setOrigin(0).setScale(1);
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'kitty_frames').setOrigin(0).setScale(1);
    console.log('create - Menu');

    this.single_rocket = new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );
    this.kitty = new Kitty( this, this.cameras.main.centerX, this.cameras.main.centerY );

    this.player = new Player( this, this.cameras.main.centerX, this.cameras.main.centerY );
  }

  update(){
    this.player.update();
  }

}
export default Menu;
