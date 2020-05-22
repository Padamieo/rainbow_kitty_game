import phaser from 'phaser';

// import TextButton from 'ui/button';

class Menu extends phaser.Scene {
	constructor() {
		super({
			key: 'Menu'
		});
	}

	preload() {
		this.cameras.main.fadeIn(250, 0, 0, 0);
		//this.load.svg('ui', ui, { width: 510, height:162 });

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
		console.log('a', FBInstant);
	}

	create() {
		// this could be set on end of game rather than here
		if(window.preact) window.preact.setStateExt({visible:true});

		this.keys = this.input.keyboard.addKeys('S');
		// this.scene.resume('Menu');
		// this.scene.pause("Menu");

		//var seperation = this.game.config.height/8;
		var fontSize = 20;
		var seperation = fontSize/2 + fontSize;
		var commonStyle = {
			fontFamily: '"Arial"',
			fill: '#fff',
			fontSize: fontSize,
			align: 'right',
		};

		var lives = window.preact.state.lives || 9;
		this.lives = this.add.text(this.game.config.width/12, seperation, lives+' lives', commonStyle);

		var topscore = window.preact.state.score || 0;
		this.topScore = this.add.text(this.game.config.width/12, seperation*2, topscore+' top score', commonStyle);

		this.single = true;
		this.camera = this.cameras.main;
		this.cameras.main.on('camerafadeoutcomplete', this.startGame.bind(this));

		this.events.on('addScore', function () {
			console.log('doddddododo');
			this.startFade();
		}, this);
	}

	startGame(){
		this.scene.start('Game');
	}

	startFade(){
		this.cameras.main.fadeOut(250, 0, 0, 0);
		//this.scene.start('Game');
	}

	update(time, delta){
		if(this.keys.S.isDown && this.single){
			this.single = false;
			this.startFade();
		}
	}
}
export default Menu;
