import phaser from 'phaser';
// import Bullets from 'object/bullets';

class Preload extends phaser.Scene {
	constructor(test) {
		super({
			key: 'Preload'
		});
	}

	preload() {

		if(process.env.NODE_ENV === 'development') {
			this.startGame();
			window.game.lives = 9;
			window.game.score = 0;
		}else{
			FBInstant.startGameAsync().then(() => {
				// Retrieving context and player information can only be done
				// once startGameAsync() resolves
				var contextId = FBInstant.context.getID();
				var contextType = FBInstant.context.getType();

				var playerName = FBInstant.player.getName();
				var playerPic = FBInstant.player.getPhoto();
				var playerId = FBInstant.player.getID();

				// Once startGameAsync() resolves it also means the loading view has
				// been removed and the user can see the game viewport
				// console.log(contextId, contextType);
				// console.log(playerName, playerPic, playerId);

				// game.start();
				this.startGame();
			});
		}

	}

	startGame () {
		this.scene.start('ShaderTest');
	}
}
export default Preload;
