import Phaser from 'phaser';
import rocket from 'assets/rocket_frames.svg';
import Debris from 'object/debris';
import Sparks from 'object/sparks';
import wall from 'assets/background_wall_temp.png';
import Explosion from 'object/explosion';
import Background from 'object/background';


class ExplosionTest extends Phaser.Scene {
	constructor() {
		super({
			key: 'test_explosion'
		});
	}

	preload() {
		this.bullets = { colours: ['00ff00', 'ff00ff'] };
		this.load.image('wall', wall);
		this.load.svg('rocket_frames', rocket, { width: 150, height: 56 });
	}

	create() {
		this.kitty = {
			x: this.game.config.width/2,
			y: this.game.config.height/5,
			fly: false,
			half: 10}
		;

		this.background = new Background( this, this.game.config.width/2, this.game.config.height/2, this.game.config.width, this.game.config.height, 'wall' );

		this.gameObject = this.add.image(
			this.game.config.width/2.2, this.game.config.height/5.2, 'rocket_frames'
		).setOrigin(0).setScale(1);

		this.sparks = new Sparks( this );
		this.debris = new Debris( this );
		this.explosion = new Explosion( this );

	
		this.timer = this.time.addEvent({
			delay: 3500,
			callback: this.callback,
			//args: [],
			callbackScope: this,
			loop: true,
		});
		this.fired = false;

	}

	callback() {
		this.explosion.start(this.game.config.width/2, this.game.config.height/2, '0x00DFFC', 1);
	}

	update(time, delta){
		this.explosion.update(time, delta);

		this.input.on('pointermove', (pointer) => {});
		
		this.input.on('pointerdown', (pointer) => {
			
			if(this.fired){
				return;
			}
			this.fired = true;
			this.explosion.start(pointer.x, pointer.y, '0xFF00CC', 0);
		});

		this.input.on('pointerup', (pointer) => {
			this.fired = false;
		});
	}
}

export default ExplosionTest;
