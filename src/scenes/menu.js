// import phaser from 'phaser';

import bb from 'assets/testsmall.png';
import ui from 'assets/UIpack_vector.svg';
import rocket from 'assets/rocket_test.svg';
import kitty from 'assets/kitty_test.svg';
import wall from 'assets/background_wall_temp.png';

import phaser from 'phaser';

import Background from 'object/background';
import Bullets from 'object/bullets';
import Bullet from 'object/bullet';
import Kitty from 'object/kitty';
import Player from 'object/player';
import Rainbow from 'object/rainbow';
import Rocket from 'object/rocket';

import c from 'collision';

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

    var polygon = new Phaser.Geom.Polygon([
      0, 0,
      10, 0,
      10, 20,
      0, 20
    ]);
    var graphics = this.add.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0x99ff22);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('laser_bullet', 10, 20);
    graphics.clear();

  }

  create () {
    this.background = new Background( this, this.game.config.height/2, 10, this.game.config.height, this.game.config.height, 'wall' );

    this.add.image(0, 0, 'bb').setOrigin(0).setScale(1.2);
    this.add.image(0, 60, 'rocket').setOrigin(0).setScale(1);

    this.add.image(0, 160, 'rocket_frames').setOrigin(0).setScale(1);
    //this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'kitty_frames').setOrigin(0).setScale(1);

    // console.log(this.game.config.height);

    this.kitty = new Kitty( this, this.cameras.main.centerX, this.cameras.main.centerY );

    this.player = new Player( this );

    // var rect = this.add.rectangle(this.cameras.main.centerX/3, this.cameras.main.centerY/3, 10, 20, 0x99ff22);
    this.bullets = this.add.group();
    this.bullet = new Bullet( this );

    //rainbow
    /*
    this.rainbow = new Rainbow( this );

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

    graphics.fillStyle(0xaa0000);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('test', 100, 100);
    graphics.setScale(4);
    var sprite = this.add.sprite(100, 400, 'test');

    var particles = this.add.particles('test');
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
    console.log(this.kitty.x, this.kitty.y);

    this.input.on('pointerdown', (pointer) => {
      particles.emitParticleAt(this.kitty.x, this.kitty.y);
    });
    */

    // text
    var text = this.add.text(this.game.config.width-80, 0, '999', { fontFamily: '"Arial"', fill: '#fff', fontSize: 30, align: 'right' });
    // text.setOrigin(1);
    text.setStroke('#de77ae', 5);

    // enemy manager
    this.enemy = {};
    this.enemy.number = 2;
    this.enemy.limit = 10;
    this.enemy.list = [];
    this.enemies = this.add.group();

    this.single_rocket = new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );

    this.tick = this.time.addEvent({
      delay: 2000,
      callback: this.callback.bind(this),
      loop: true
    });

    // this.keys = this.input.keyboard.addKeys('S,P');
     // this.scene.resume('Menu');
     // this.scene.pause("Menu");
     // if(this.keys.S.isDown){
     //   console.log('S');
     // }
  }

  callback(){
    //console.log('add');
    if(this.enemies.getLength() < this.enemy.limit){
      //new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );
    }
  }

  update(){

    if (this.bullets.countActive() > 0 ){
      for (var b = 0, l = this.bullets.countActive(); b < l; b++){
        c.alculate_rotated_square(this.bullets.children.entries[b]);
      }
    }

    if (this.enemies.countActive() > 0 ){
      for (var e = 0, l = this.enemies.countActive(); e < l; e++){
        c.alculate_rotated_square(this.enemies.children.entries[e]);

        /*
        //console.log(this.scene.enemies.children.entries[e]);
        var ee = this.enemies.children.entries[e];
        var d = Phaser.Math.Distance.Between(this.x, this.y, ee.x, ee.y);
        if(d < 100){
          c.alculate_rotated_square(this);
          c.alculate_rotated_square(this.scene.enemies.children.entries[e]);
          // c.alculate_cordinates(this.scene.bullets.children.entries);
          var c_bullet_enemies = c.ollision_square_square(this.scene.enemies.children.entries[e], this);

          if(c_bullet_enemies){
            this.create(this.scene.enemies.children.entries[e].poly);
            this.create(this.poly);


            this.setActive(false);
            this.scene.enemies.children.entries[e].setActive(false);
          }
        }
        */
      }
    }

    if (this.bullets.countActive() > 0  && this.enemies.countActive() > 0 ){
      for (var b = 0, l = this.bullets.countActive(); b <= l; b++){
        for (var e = 0, i = this.enemies.countActive(); e <= i; e++){
          // console.log(this.enemies);
          // var d = Phaser.Math.Distance.Between(
          //   this.enemies.children.entries[e].x,
          //   this.enemies.children.entries[e].y,
          //   this.bullets.children.entries[b].x,
          //   this.bullets.children.entries[b].y
          // );
          // console.log(d);
          // if(d < 100){
          //   this.enemies.children.entries[e].setActive(false);
          //   this.bullets.children.entries[b].setActive(false);
          // }
        }
      }
    }
  }

  bulletFire(ax, ay){
    var x = this.kitty.x + this.kitty.half/2;
    var y = this.kitty.y;
    //this.setPosition(x, y);
    new Bullet( this, x, y );
    console.log(this.bullets);
    // var direction = phaser.Math.Angle.Between(x, y, ax, ay);
    // this.direction = direction;
    // this.setRotation(this.direction + Math.PI/2);
    // this.setActive(true);
    // this.setVisible(true);
  }
}
export default Menu;
