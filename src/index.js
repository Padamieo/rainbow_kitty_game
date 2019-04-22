import './index.css';

import phaser from 'phaser';
import Preload from './scenes/preload';
import Menu from './scenes/menu';
import Game from './scenes/game';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    antialias: true,
    pixelArt: false,
    zoom: 0,
    roundPixels: false,
    scale:{
      width: 405,
      height: 720,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
      target: 60,
    },
    queue: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        fps: 60,
      }
    },
    scene: [
      Preload,
      Menu,
      Game
    ]
};

//FBInstant.initializeAsync().then(function() {
  window.game = new phaser.Game(config);
//});
// game.setGameSize(600,600);
