// import phaser from 'phaser';

import bb from 'assets/testsmall.png';
import ui from 'assets/UIpack_vector.svg';
import rocket from 'assets/rocket_test.svg';
import kitty from 'assets/kitty_test.svg';
import wall from 'assets/background_wall_temp.png';

import phaser from 'phaser';

import Background from 'object/background';
import Bullets from 'object/bullets';
import Explosions from 'object/explosions';
import Kitty from 'object/kitty';
import Player from 'object/player';
import Rainbow from 'object/rainbow';
import Rocket from 'object/rocket';

import Score from 'object/score';

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

    this.generateExhaustShape();
    this.bullets = new Bullets( this );
    this.explosions = new Explosions( this );

  }

  generateExhaustShape () {
    var polygon = new Phaser.Geom.Polygon([
      15, 0,
      4, 8,
      0, 20,
      4, 40,
      15, 60,
      26, 40,
      30, 20,
      26, 8,
      15, 0
    ]);
    var graphics = this.add.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xfeffcf);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('exhaust', 30, 60);
    graphics.clear();
  }

  generateRainbowTearShape() {
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

    graphics.fillStyle(0xffffff);
    graphics.fillPoints(polygon.points, true);
    graphics.generateTexture('tear', 100, 100);
    // graphics.setScale(4);
    graphics.clear();
    // var sprite = this.add.sprite(100, 400, 'tear');
  }

  create () {

    this.background = new Background( this, this.game.config.height/2, 10, this.game.config.height, this.game.config.height, 'wall' );

    this.add.image(0, 0, 'bb').setOrigin(0).setScale(1.2);
    this.add.image(0, 60, 'rocket').setOrigin(0).setScale(1);
    //this.add.image(0, 160, 'rocket_frames').setOrigin(0).setScale(1);

    //this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'kitty_frames').setOrigin(0).setScale(1);
    // console.log(this.game.config.height);

    this.kitty = new Kitty( this, this.cameras.main.centerX, this.cameras.main.centerY );
    this.player = new Player( this );

    // var rect = this.add.rectangle(this.cameras.main.centerX/3, this.cameras.main.centerY/3, 10, 20, 0x99ff22);
    // this.bullets = this.add.group({
    //   classType: Bullet,
    //   defaultKey: null,
    //   defaultFrame: null,
    //   active: true,
    //   maxSize: 20,
    //   runChildUpdate: false,
    //   createCallback: null,
    //   removeCallback: null,
    //   createMultipleCallback: null
    // });

    //rainbow
    this.generateRainbowTearShape();
    /*
    this.rainbow = new Rainbow( this );

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

    this.score = new Score( this );

    // enemy manager
    this.enemy = {};
    this.enemy.number = 2;
    this.enemy.limit = 2;
    this.enemy.list = [];
    this.enemies = this.add.group();

    new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );

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

     this.physics.add.overlap(this.enemies, this.kitty, this.kittyCollision.bind(this));
     this.physics.add.overlap(this.enemies, this.bullets, this.detailedCollision.bind(this));
  }

  kittyCollision(rocket, kitty){
    if(rocket.active === true){
      var tl = rocket.getTopLeft();
      var tr = rocket.getTopRight();
      var br = rocket.getBottomRight();
      var bl = rocket.getBottomLeft();

      //var graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 } });
      var triangle = new Phaser.Geom.Triangle((tl.x+tr.x)/2, (tl.y+tr.y)/2, bl.x, bl.y, br.x, br.y);
      //graphics.strokeTriangleShape(triangle);

      //var graphics2 = this.add.graphics({ lineStyle: { width: 1, color: 0xffff66 } });
      var circle = new Phaser.Geom.Circle(kitty.x, kitty.y, kitty.body.width/2);
      //graphics2.strokeCircleShape(circle);

      var result = Phaser.Geom.Intersects.TriangleToCircle(triangle, circle);

      if(result){
        rocket.hit();
        this.kitty.shot();
      }
    }
  }

  detailedCollision(rocket, bullet) {
    if(rocket.active === true && bullet.active === true){

      var tl = rocket.getTopLeft();
      var tr = rocket.getTopRight();
      var br = rocket.getBottomRight();
      var bl = rocket.getBottomLeft();

      // var graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 } });
      var triangle = new Phaser.Geom.Triangle((tl.x+tr.x)/2, (tl.y+tr.y)/2, bl.x, bl.y, br.x, br.y);
      //graphics.strokeTriangleShape(triangle);

      var tl = bullet.getTopLeft();
      var tr = bullet.getTopRight();
      var br = bullet.getBottomRight();
      var bl = bullet.getBottomLeft();

      //var graphics2 = this.add.graphics({ lineStyle: { width: 1, color: 0xffff66 } });
      var lineB = new Phaser.Geom.Line(tl.x, tl.y, br.x, br.y);
      var lineA = new Phaser.Geom.Line(tr.x, tr.y, bl.x, bl.y);
      // graphics2.strokeLineShape(lineB);
      // graphics2.strokeLineShape(lineA);

      var resultB = Phaser.Geom.Intersects.TriangleToLine(triangle, lineB);
      var resultA = Phaser.Geom.Intersects.TriangleToLine(triangle, lineA);

      if(resultB | resultA){
        bullet.hit();
        rocket.hit();
        //rocket.setActive(false);
      }
    }
  }

  callback(){
    //console.log('add');
    if(this.enemies.getLength() < this.enemy.limit){
      new Rocket( this, this.cameras.main.centerX, this.cameras.main.centerY );
    }
  }

  update(){

  }//update
}
export default Menu;
