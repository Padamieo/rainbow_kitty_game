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

// import c from 'collision';
import SAT from 'sat';

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
    this.generateBulletShape();
    this.generateExhaustShape();
  }

  generateBulletShape () {
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

  generateExhaustShape () {
    var polygon = new Phaser.Geom.Polygon([
      25, 0,
      45, 20,
      50, 40,
      25, 100,
      0, 40,
      5, 20,
      25, 0
    ]);
    var graphics = this.add.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xfeffcf);
    graphics.fillPoints(polygon.points, true);
    // graphics.setScale(0.4);
    graphics.generateTexture('exhaust', 50, 100);
    // graphics.clear();
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
    this.bullets = this.add.group({
      classType: Bullet,
      defaultKey: null,
      defaultFrame: null,
      active: true,
      maxSize: 1,
      runChildUpdate: false,
      createCallback: null,
      removeCallback: null,
      createMultipleCallback: null
    });

    this.generateExhaustShape();
    // this.bullet = new Bullet( this );

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
    this.enemy.limit = 2;
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

     this.physics.add.overlap(this.enemies, this.bullets, this.spriteHitHealth.bind(this));
  }

  spriteHitHealth(a, b) {
    if(a.active === true && b.active === true){
      console.log('awkward', a, b);

      var V = SAT.Vector;
      var P = SAT.Polygon;
      var B = SAT.Box;

      var x = a.x;
      var y = a.y;
      var tl = a.getTopLeft();
      var tr = a.getTopRight();
      var br = a.getBottomRight();
      var bl = a.getBottomLeft();
      // var objA = new P(new V(x, y), [
      //   new V(tl.x+10, tl.y),
      //   new V(tr.x-10, tr.y),
      //   new V(br.x, br.y),
      //   new V(bl.x, bl.y)
      // ]);
      var objA = new P(new V(x, y), [
        new V(tl.x, tl.y),
        new V(bl.x, bl.y),
        new V(br.x, br.y),
        new V(tr.x, tr.y),
      ]);
      //console.log(x, y, tl, br, objA);

      var x = b.x;
      var y = b.y;
      var tl = b.getTopLeft();
      var tr = b.getTopRight();
      var br = b.getBottomRight();
      var bl = b.getBottomLeft();
      var objB = new P(new V(x, y), [
        new V(tl.x, tl.y),
        new V(bl.x, bl.y),
        new V(br.x, br.y),
        new V(tr.x, tr.y),
      ]);
      //console.log(x, y, tl, br, objB);

      //console.log(this);
      this.creates(objA, 0x44ff66);
      this.creates(objB, 0xffff66);

      var response = new SAT.Response();
      var result = SAT.testPolygonPolygon(objA, objB, response);

      console.log(response, result);
      if(result){
        a.setActive(false);
        b.setActive(false);
      }

    }
  }

  callback(){
    //console.log('add');
    if(this.enemies.getLength() < this.enemy.limit){
      //new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );
    }
  }

  creates (polygon, color) {
    //console.log(polygon);
    var graphics = this.add.graphics({ x: 0, y: 0 });
    // var color = new Phaser.Display.Color(0, 100, 100);
    // color.random();
    graphics.lineStyle(1, ( color ? color : 0xfff000));

    graphics.beginPath();

    graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

    for (var i = 1; i < polygon.points.length; i++) {
      graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
    }

    graphics.closePath();
    graphics.strokePath();
    graphics.setDepth(8);
  }

  update(){

    //if (this.bullets.countActive() > 0 ){
      // for (var b = 0, l = this.bullets.getLength(); b < l; b++){
      //   c.alculate_rotated_square(this.bullets.children.entries[b]);
      // }
    //}

    //if (this.enemies.countActive() > 0 ){
      // for (var e = 0, l = this.enemies.getLength(); e < l; e++){
      //   c.alculate_rotated_square(this.enemies.children.entries[e]);
      // }
    //}

    //if (this.bullets.countActive() > 0  && this.enemies.countActive() > 0 ){
    /*
      for (var bx = 0, l = this.bullets.getLength(); bx < l; bx++){
        var V = SAT.Vector;
        var P = SAT.Polygon;
        var x = this.bullets.children.entries[bx].x;
        var y = this.bullets.children.entries[bx].y;
        var tl = this.bullets.children.entries[bx].getTopLeft();
        var tr = this.bullets.children.entries[bx].getTopRight();
        var br = this.bullets.children.entries[bx].getBottomRight();
        var bl = this.bullets.children.entries[bx].getBottomLeft();
        var objB = new P(new V(x, y), [ new V(tl.x, tl.y), new V(tr.x, tr.y), new V(br.x, br.y), new V(bl.x, bl.y) ]);

        for (var ex = 0, i = this.enemies.getLength(); ex < i; ex++){

          var V = SAT.Vector;
          var P = SAT.Polygon;
          var x = this.enemies.children.entries[ex].x;
          var y = this.enemies.children.entries[ex].y;
          var tl = this.enemies.children.entries[ex].getTopLeft();
          var tr = this.enemies.children.entries[ex].getTopRight();
          var br = this.enemies.children.entries[ex].getBottomRight();
          var bl = this.enemies.children.entries[ex].getBottomLeft();
          var objA = new P(new V(x, y), [ new V(tl.x+10, tl.y), new V(tr.x-10, tr.y), new V(br.x, br.y), new V(bl.x, bl.y) ]);
          // console.log(this.enemies);
          var d = Phaser.Math.Distance.Between(
            this.enemies.children.entries[ex].x,
            this.enemies.children.entries[ex].y,
            this.bullets.children.entries[bx].x,
            this.bullets.children.entries[bx].y
          );
          if(d < 30){

            // var c_bullet_enemies = c.ollision_square_square(
            //   this.enemies.children.entries[ex],
            //   this.bullets.children.entries[bx]
            // );
            var response = new SAT.Response();
            var result = SAT.testPolygonPolygon(objA, objB, response);
            if(this.enemies.children.entries[ex].active){
              console.log(objA, objB, response, result);
            }
            if (result){
              this.creates(objB, 0xff0000);
              this.creates(objA, 0xffff00);
              this.enemies.children.entries[ex].setActive(false);
              this.bullets.children.entries[bx].setActive(false);
            }

          }
        }
      }
    */
    //}

  }//update
}
export default Menu;
