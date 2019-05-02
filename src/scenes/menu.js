// import phaser from 'phaser';

import bb from 'assets/testsmall.png';
import ui from 'assets/UIpack_vector.svg';
import rocket from 'assets/rocket_test.svg';
import kitty from 'assets/kitty_test.svg';
import wall from 'assets/background_wall_temp.png';

import phaser from 'phaser';

import Background from 'object/background';
import Kitty from 'object/kitty';
import Player from 'object/player';
import Rocket from 'object/rocket';
import Rainbow from 'object/rainbow';

class Menu extends phaser.Scene {
  constructor(test) {
    super({
        key: 'Menu'
    });
  }

  preload() {
    this.load.image('bb', bb);
    this.load.image('wall', wall);
    this.load.svg('ui', ui, { width: 1000, height:1000 });
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
    //var camera = this.cameras.main;
    // var w = window.innerWidth;
    // var h = window.innerHeight;
    // var scale = Math.min(w / 405, h / 720);
    // var width = w / scale;
    // var height = h / scale;
    // camera.setViewport(0, 0, 405, 405);
    // camera.setBackgroundColor(0x001111);
    // camera.setZoom(1);
    // console.log(this);
    // this.scene.setScale(2);
    // camera.setScale(2);
  }

  create () {

    this.background = new Background( this, this.game.config.height/2, 10, this.game.config.height, this.game.config.height, 'wall' );

    this.add.image(0, 0, 'bb').setOrigin(0).setScale(1.2);
    this.add.image(0, 60, 'rocket').setOrigin(0).setScale(1);

    this.add.image(0, 160, 'rocket_frames').setOrigin(0).setScale(1);
    //this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'kitty_frames').setOrigin(0).setScale(1);

    // console.log(this.game.config.height);

    this.single_rocket = new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );
    this.kitty = new Kitty( this, this.cameras.main.centerX, this.cameras.main.centerY );

    this.player = new Player( this );

    this.rainbow = new Rainbow( this );

    var rect = this.add.rectangle(this.cameras.main.centerX/3, this.cameras.main.centerY/3, 10, 20, 0x99ff22);


    var polygon = new Phaser.Geom.Polygon([
      50, 5,
      20, 68,
      22, 80,
      30, 90,
      50, 100,
      70, 90,
      78, 80,
      80, 68,
      50, 5
    ]);

    // var polygon = Phaser.Geom.Polygon.Smooth(p);

    var graphics = this.add.graphics({ x: 0, y: 0 });

    //graphics.lineStyle(2, 0x00aa00);

    //graphics.beginPath();

    //graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

    // for (var i = 1; i < polygon.points.length; i++)
    // {
    // graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
    // }
    //graphics.Smooth();
    graphics.fillStyle(0xaa0000);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('test', 100, 100);

    //graphics.closePath();
    //graphics.strokePath();

    graphics.setScale(4);
    console.log(graphics);
    var sprite = this.add.sprite(100, 400, 'test');

    var emitter = particles.createEmitter();

    // this.add.text(50, 50, 'Hello World', { fontFamily: '"Arial"' });
    // new Text(this, 50, 50, 'hallo', { fontFamily: '"Arial"' });

    this.enemy_number = 2;
    this.enemy_limit = 10;
    this.enemies = [];
    this.tick = scene.time.addEvent({
      delay: 2000,
      callback: this.callback,
      loop: true
    });

  }

  callback(){

  }

  update(){

  }

}
export default Menu;
