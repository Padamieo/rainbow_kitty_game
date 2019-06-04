import phaser from 'phaser';

import rocket from 'assets/rocket_frames.svg';

import kitty from 'assets/kitty_test.svg';
import kitty2 from 'assets/spritesheet.png';
import eye from 'assets/eye.svg';
import iris from 'assets/iris.svg';

import wall from 'assets/background_wall_temp.png';

import Background from 'object/background';
import Bullets from 'object/bullets';
import Explosions from 'object/explosions';
import Enemies from 'object/enemies';
import Kitty from 'object/kitty';
import Player from 'object/player';
import Rainbow from 'object/rainbow';
import Score from 'object/score';

//import shader from 'object/shader.frag';
import CustomPipeline from 'shaders/exhaust';

class Game extends phaser.Scene {
  constructor(test) {
    super({
      key: 'Game'
    });
  }

  preload() {
    this.cameras.main.fadeIn(250, 0, 0, 0);

    this.load.image('wall', wall);
    this.load.svg('rocket', rocket, { width: 150, height:56 });

    this.load.svg('kitty', kitty, { width: 400, height: 400 });
    this.load.image('kitty2', kitty2);
    this.load.svg('eye', eye, { width: 75, height:75 });
    this.load.svg('iris', iris, { width: 75, height:75 });

    this.load.spritesheet('rocket_frames',
    rocket,
      { frameWidth: 1, frameHeight: 56, frameWidth: 30 }
    );

    this.load.spritesheet('rocket_pieces', rocket, {
      frameWidth: 1,
      frameHeight: 27,
      frameWidth: 15,
      spacing: 1
    }
    // frameWidth: frameWidth,
    // frameHeight: frameHeight,
    // startFrame: startFrame,
    // endFrame: endFrame,
    // margin: margin,
    // spacing: spacing
    );

    this.load.spritesheet('kitty_frames',
    kitty,
      { frameWidth: 1, frameHeight: 200, frameWidth: 200 }
    );

    this.load.spritesheet('kitty2_frames',
    kitty2,
      { frameWidth: 1, frameHeight: 200, frameWidth: 200 }
    );

    //this.load.glsl('test', shader);
    // this.load.glsl('Custom', shader);

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

    this.bullets = new Bullets( this );
    this.explosions = new Explosions( this );

    this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline(this.game));
    // this.customPipeline.setFloat2('uResolution', this.game.config.width, this.game.config.height);
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

    // this.add.image(0, 60, 'rocket').setOrigin(0).setScale(1).setPipeline('Custom');
    // this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'kitty_frames').setOrigin(0).setScale(1);

    this.kitty = new Kitty( this, this.cameras.main.centerX, this.game.config.height/3 );
    this.player = new Player( this );

    // this.add.image(100, 60, 'rocket_pieces').setFrame(10);
    // var customAngle = 0xff33cc;
    // new Sprite(this, 0, 0, 'rocket_pieces' [10]);

    var particles = this.add.particles('rocket_pieces');
    var emitter = particles.createEmitter({
        frame: [1, 10, 11],
        x: 0,
        y: 0,
        lifespan: 2000,
        speed: 120,
        angle: { min: 0, max: 360 },
        accelerationY: { min:20, max: 100 },
        gravityY: 100,
        blendMode: 0,
        frequency: -1,
        tint: { onEmit: () => { return emitter.colour; } },
        alpha:{ start:1, end:0, ease: "Cubic.easeIn" },
        on: false,
        rotate: { min: 0, max: 360 },
        active: true
    });
    emitter.colour = 0xff33cc;

    // this.input.on('pointerdown', (pointer) => {
    //   if(this.cameras.main.centerX/2 < pointer.x){
    //     emitter.colour = 0xffff66;
    //   }else{
    //     emitter.colour = 0x66ffdd;
    //   }
    //   emitter.explode(5, pointer.x, pointer.y);
    // });


    //console.log(this.customPipeline);
    // this.cameras.main.setRenderToTexture(this.customPipeline);
    // this.cameras.main.ignore([ this.kitty, this.background, this.player ]);
    // var cam1 = this.cameras.main;
    // var cam2 = this.cameras.add(0, 0, 800, 600);
    //this.add.image(50, 180, 'exhaust').setPipeline('Custom');

    //rainbow
    this.generateRainbowTearShape();
    /*
    //this.rainbow = new Rainbow( this );
    var particles = this.add.particles('tear');
    //particles.setPipeline('Custom');
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

    this.input.on('pointerdown', (pointer) => {
      emitter.setPosition(this.kitty.x, this.kitty.y);
      emitter.resume();
      //emitter.explode(10, this.kitty.x, this.kitty.y);
    });

    this.input.on('pointerup', (pointer) => {
      //emitter.setPosition(this.kitty.x, this.kitty.y);
      emitter.pause();
      //emitter.explode(10, this.kitty.x, this.kitty.y);
    });
    */

    // this.rainbow = new Rainbow( this );

    this.score = new Score( this );

    // enemy manager
    this.enemies = new Enemies( this );

    this.physics.add.overlap(this.enemies, this.kitty, this.kittyCollision.bind(this));
    this.physics.add.overlap(this.enemies, this.bullets, this.detailedCollision.bind(this));

    this.add.image(20, 20, 'exhaust').setOrigin(0).setScale(1).setPipeline('Custom');
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

  update(time, delta){
    this.customPipeline.setFloat1('time', time);
  }//update
}
export default Game;
