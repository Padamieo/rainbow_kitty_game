import phaser from 'phaser';
// import Bullets from 'object/bullets';
import {h, render } from 'preact';
import App from 'components/app';

class Preload extends phaser.Scene {
	constructor(test) {
		super({
			key: 'Preload'
		});
	}

	preload() {
		/*
		if(process.env.NODE_ENV === 'development') {
			this.startGame();
			window.game.lives = 9;
			window.game.score = 0;
			this.setup = 'Menu';
		}else{
			window.game.lives = 9;
			FBInstant.initializeAsync().then(() => {
				console.log('here');
				this.setup = 'Menu';
				render(<App ref={(preact) => {window.preact = preact}} />, document.body);

				FBInstant.startGameAsync().then(() => {
					// Retrieving context and player information can only be done
					// once startGameAsync() resolves
					var contextId = FBInstant.context.getID();
					var contextType = FBInstant.context.getType();

					var playerName = FBInstant.player.getName();
					var playerPic = FBInstant.player.getPhoto();
					var playerId = FBInstant.player.getID();
					FBInstant.context.createAsync(playerId);

					console.log(playerId);
					FBInstant.context.createAsync(playerId)
					.then(() => {
						console.log(FBInstant.context.getID());
						// 5544332211
					});

					// Once startGameAsync() resolves it also means the loading view has
					// been removed and the user can see the game viewport
					// console.log(contextId, contextType);
					// console.log(playerName, playerPic, playerId);
					var contextId = FBInstant.context.getID();
					var contt = FBInstant.getSupportedAPIs();
					console.log('contextId', contextId, contt);
					// game.start();
					this.startGame();
				});
			});
		}
		*/
		console.log(this, window.preact.state.lives);
		// window.game.lives = 9;
		// window.game.score = 0;
		this.scene.start('Menu');
	}

	startGame () {
		console.log(this.setup);
		this.scene.start('Menu');
	}
}
export default Preload;
