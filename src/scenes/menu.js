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
	}

	create() {
		// this could be set on end of game rather than here
		if(window.preact) window.preact.setStateExt({ready:true});

		this.camera = this.cameras.main;
		this.cameras.main.on('camerafadeoutcomplete', this.startScene.bind(this));
	}

	startScene() {
		this.scene.start('Game');
	}

	startGame(){
		this.startFade();
	}

	startFade(){
		this.cameras.main.fadeOut(250, 0, 0, 0);
	}

}
export default Menu;
