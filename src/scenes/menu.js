import phaser from 'phaser';

import TextButton from 'ui/button';

class Menu extends phaser.Scene {
	constructor() {
		super({
			key: 'menu'
		});
	}

	preload() {
		this.cameras.main.fadeIn(250, 0, 0, 0);
	}

	create() {

		this.keys = this.input.keyboard.addKeys('S');

		var seperation = this.game.config.height/8;

		var commonStyle = {
			fontFamily: '"Arial"',
			fill: '#fff',
			fontSize: 30,
			align: 'right',
		};

		var lives = window.game.lives || 9;
		this.lives = this.add.text(10, seperation, lives+' lives', commonStyle);


		var topscore = window.game.score || 0;
		this.topScore = this.add.text(10, seperation*2, topscore+' top score', commonStyle);

		this.startButton = new TextButton(this, this.game.config.width/2, this.game.config.height/2, 'START', () => {
			console.log('STARTING GAME');
			this.startFade();
		});

		this.single = true;
		this.camera = this.cameras.main;
		this.cameras.main.on('camerafadeoutcomplete', this.startGame.bind(this));
	}

	startGame(){
		this.scene.start('scenario_default');
	}

	startFade(){
		this.cameras.main.fadeOut(250, 0, 0, 0);
	}

	update(time, delta){
		if(this.keys.S.isDown && this.single){
			this.single = false;
			this.startFade();
		}
	}
}
export default Menu;
