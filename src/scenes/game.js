import Phaser from 'phaser';

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
import Debris from 'object/debris';
import Sparks from 'object/sparks';

//import shader from 'object/shader.frag';
import ExhaustPipeline from 'shaders/exhaust';
import RainbowPipeline from 'shaders/rainbow';

class Game extends Phaser.Scene {
	constructor() {
		super({
			key: 'Game'
		});
	}

	preload() {
		this.cameras.main.fadeIn(250, 0, 0, 0);
		this.cameras.main.on('camerafadeoutcomplete', this.end.bind(this));

		this.load.image('wall', wall);
		// this.load.svg('rocket', rocket, { width: 150, height: 56 });

		this.load.svg('kitty', kitty, { width: 400, height: 400 });
		this.load.image('kitty2', kitty2);
		this.load.svg('eye', eye, { width: 75, height:75 });
		this.load.svg('iris', iris, { width: 75, height:75 });

		this.load.spritesheet('rocket_frames',
			rocket,
			{ frameHeight: 56, frameWidth: 30 }
		);

		this.load.spritesheet('kitty_frames',
			kitty,
			{ frameHeight: 200, frameWidth: 200 }
		);

		this.load.spritesheet('kitty2_frames',
			kitty2,
			{ frameHeight: 200, frameWidth: 200 }
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
		
		if(!this.game.renderer.hasPipeline('ExhaustPipeline')){
			this.exhaustPipeline = this.game.renderer.addPipeline('ExhaustPipeline', new ExhaustPipeline(this.game));
		}
		if(!this.game.renderer.hasPipeline('RainbowPipeline')){
			this.rainbowPipeline = this.game.renderer.addPipeline('RainbowPipeline', new RainbowPipeline(this.game));
		}
		// this.customPipeline.setFloat1('u_time', 0/1000);
	}

	create () {

		this.background = new Background( this, this.game.config.width/2, this.game.config.height/2, this.game.config.width, this.game.config.height, 'wall' );

		// this.add.image(0, 60, 'rocket').setOrigin(0).setScale(1).setPipeline('Custom');
		// this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'kitty_frames').setOrigin(0).setScale(1);

		// this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'dynamicTestFrames').setOrigin(0).setScale(1);

		this.kitty = new Kitty( this, this.cameras.main.centerX, this.game.config.height/3 );
		this.player = new Player( this );
		this.sparks = new Sparks( this );
		this.debris = new Debris( this );

		//console.log(this.customPipeline);
		// this.cameras.main.setRenderToTexture(this.customPipeline);
		// this.cameras.main.ignore([ this.kitty, this.background, this.player ]);
		// var cam1 = this.cameras.main;
		// var cam2 = this.cameras.add(0, 0, 800, 600);
		//this.add.image(50, 180, 'exhaust').setPipeline('Custom');

		//rainbow
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

		this.rainbow = new Rainbow( this );
		this.rainbow.particles.setPipeline('RainbowPipeline');
		this.rainbowPipeline.setFloat2('u_resolution', this.game.config.width, this.game.config.height);

		this.score = new Score( this );

		// enemy manager
		this.enemies = new Enemies( this );

		this.physics.add.overlap(this.enemies, this.kitty, this.kittyCollision.bind(this));
		this.physics.add.overlap(this.enemies, this.bullets, this.detailedCollision.bind(this));

		this.add.image(20, 20, 'exhaust').setOrigin(0).setScale(1).setPipeline('ExhaustPipeline');

		this.events.once('returnMenu', () => {
			this.starts();
		}, this);
	}

	end() {
		this.scene.start('Menu');
	}

	starts() {
		console.log('score', this.score.score);
		if(this.score.score > window.game.score){
			window.game.score = this.score.score;
		}
		window.game.lives = window.game.lives-1;
		this.cameras.main.fadeOut(250, 0, 0, 0);
	}

	getPositions(object) {
		var tl = object.getTopLeft();
		var tr = object.getTopRight();
		var br = object.getBottomRight();
		var bl = object.getBottomLeft();
		return {tl, tr, br, bl};
	}

	kittyCollision(rocket, kitty){
		if(rocket.active === true){
			var {tl, tr, br, bl} = this.getPositions(rocket);

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

			var rocketPosition = this.getPositions(rocket);

			// var graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 } });
			var triangle = new Phaser.Geom.Triangle(
				(rocketPosition.tl.x+rocketPosition.tr.x)/2,
				(rocketPosition.tl.y+rocketPosition.tr.y)/2,
				rocketPosition.bl.x,
				rocketPosition.bl.y,
				rocketPosition.br.x,
				rocketPosition.br.y
			);
			//graphics.strokeTriangleShape(triangle);

			var bulletPosition = this.getPositions(bullet);
			//var graphics2 = this.add.graphics({ lineStyle: { width: 1, color: 0xffff66 } });
			var lineB = new Phaser.Geom.Line(
				bulletPosition.tl.x,
				bulletPosition.tl.y,
				bulletPosition.br.x,
				bulletPosition.br.y
			);
			var lineA = new Phaser.Geom.Line(
				bulletPosition.tr.x,
				bulletPosition.tr.y,
				bulletPosition.bl.x,
				bulletPosition.bl.y
			);
			// graphics2.strokeLineShape(lineB);
			// graphics2.strokeLineShape(lineA);

			var resultB = Phaser.Geom.Intersects.TriangleToLine(triangle, lineB);
			var resultA = Phaser.Geom.Intersects.TriangleToLine(triangle, lineA);

			if(resultB | resultA){
				bullet.hit();
				rocket.hit(bullet.frame.name);
				//rocket.setActive(false);
			}
		}
	}

	update(time, delta){
		this.rainbowPipeline.setFloat1('u_time', time/1000);
		this.exhaustPipeline.setFloat1('u_time', time/1000);
	}
}
export default Game;
