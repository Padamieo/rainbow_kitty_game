import phaser from 'phaser';

import bb from 'assets/testsmall.png';
import ui from 'assets/UIpack_vector.svg';
import uis from 'assets/UIpack_vector.png';
import rocket from 'assets/rocket_test.svg';

import TextButton from 'ui/button';

class Menu extends phaser.Scene {
  constructor(test) {
    super({
      key: 'Menu'
    });
  }

  preload() {
    this.load.image('bb', bb);

    this.load.image('uis', uis);

    this.load.svg('ui', ui, { width: 510, height:162 });

    //this.load.svg('rocket', rocket, { width: 150, height:56 });

    /*
    var camera = this.cameras.main;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var scale = Math.min(w / 405, h / 720);
    var width = w / scale;
    var height = h / scale;
    camera.setViewport(0, 0, 405, 405);
    camera.setBackgroundColor(0x001111);
    camera.setZoom(1);
    camera.setViewport(10,10,600,600);
    // camera.scaleManager(Phaser.Scale.FIT);
    // console.log(this);
    // this.scene.setScale(2);
    // camera.setScale(2);
    */
  }

  create () {

    this.test = this.add.image(0, 0, 'bb').setOrigin(0).setScale(1.2);

    //this.ui = this.add.image(0, 0, 'ui').setOrigin(0).setScale(2);

    this.uis = this.add.image(0, 0, 'uis').setOrigin(0).setScale(1).setTint(0x9CB88C);

    //this.add.image(0, 60, 'rocket').setOrigin(0).setScale(1);

    this.keys = this.input.keyboard.addKeys('S');
    // this.scene.resume('Menu');
    // this.scene.pause("Menu");

    this.clickButton = new TextButton(this, this.cameras.main.centerX, this.cameras.main.centerY, 'Click me!', {
      fontFamily: '"Arial"',
      fill: '#fff',
      fontSize: 30,
      align: 'right',
      wordWrap: {
        width: 150
      }
    });

    this.single = true;
    this.camera = this.cameras.main;
    this.cameras.main.on('camerafadeoutcomplete', this.end.bind(this));
  }

  end(){
    console.log(this);
    console.log('end');
    this.scene.start('Game');
  }

  start(){
    this.cameras.main.fadeOut(250, 0, 0, 0);
    //this.scene.start('Game');
  }

  update(){
    if(this.keys.S.isDown && this.single){
      this.single = false;
      this.start();
    }
  }//update
}
export default Menu;
