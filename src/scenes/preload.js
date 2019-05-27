import phaser from 'phaser';

class Preload extends phaser.Scene {
  constructor(test) {
    super({
        key: 'Preload'
    });
  }

  preload() {

  // FBInstant.startGameAsync().then(() => {
  //   console.log('here', this);
  //   // Retrieving context and player information can only be done
  //   // once startGameAsync() resolves
  //   var contextId = FBInstant.context.getID();
  //   var contextType = FBInstant.context.getType();
  //
  //   var playerName = FBInstant.player.getName();
  //   var playerPic = FBInstant.player.getPhoto();
  //   var playerId = FBInstant.player.getID();
  //
  //   // Once startGameAsync() resolves it also means the loading view has
  //   // been removed and the user can see the game viewport
  //   // console.log(contextId, contextType);
  //   // console.log(playerName, playerPic, playerId);
  //
  //   game.start();
  //   this.startGame();
  //   //this.scene.start('Menu');
  // });

    this.startGame();
  }

  startGame () {
    this.scene.start('Menu');
  }
}
export default Preload;
