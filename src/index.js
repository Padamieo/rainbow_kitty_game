import './index.css';
import Game from './scenes/game';
import Menu from './scenes/menu';
import Phaser from 'phaser';
import pkg from '../package.json';
import Preload from './scenes/preload';
import {h, render, Component, Fragment } from 'preact';
import UI from './components/app';
// import { Component } from 'react'

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
	version: pkg.version,
	backgroundColor: 0x333333,
	fps: {
		target: 60,
	},
	queue: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			fps: 60,
		}
	},
	scene: [
		Preload,
		Menu,
		Game
	]
};



export default class GameI extends Component {
	componentDidMount() {  
	  window.game = new Phaser.Game(config);
	}
  
	shouldComponentUpdate() {
	  return false
	}
  
	render() {
	  return <div id="phaser-game" />
	}
}

class App extends Component {
	state = {
		connected: false,
		view: 'menu',
		visible: true,
		lives: 9,
		score: 0,
		player: {},
		id: undefined,
		ready: false,
	};

    setStateExt = (state) => {
        this.setState(this.state = state);
	}

	setView = (toView) => {
        console.log(`view:${toView}`);
        this.setState({...this.state, view:toView});
    }

    startGame = (a) => {
        this.setState({...this.state, visible:false});
		console.log('start the game');
		if(ready)
		window.game.scene.keys.Menu.startGame(/* provide game type */);
	}

	getData() {
		// get lives and timestamps of deaths
		FBInstant.player
		.getDataAsync(['achievements', 'lives'])
		.then(function(data) {
			console.log('data is loaded');
			var achievements = data['achievements'];
			var currentLife = data['lives'];
		});
	}

	componentDidMount() {
		console.log('componentDidMount');
		if(process.env.NODE_ENV === 'development') {
			console.log('development');
			// maybe use localstorage
		}else{
			this.something();
		}
	}
	
	onGameEnd = (score) => {
		this.setState({...this.state, visible:true});
		console.log('game end score ', score);
	};

	something = () => {
		FBInstant.initializeAsync().then(() => {
			FBInstant.startGameAsync().then(() => {
				// Retrieving context and player information can only be done
				// once startGameAsync() resolves
				var contextId = FBInstant.context.getID();
				var contextType = FBInstant.context.getType();

				var playerName = FBInstant.player.getName();
				var playerPic = FBInstant.player.getPhoto();
				var playerId = FBInstant.player.getID();
				// FBInstant.context.createAsync(playerId);

				console.log(playerId, contextId);
				this.setState({...this.state, connected:true, player:{id:playerId, playerName, playerPic}});

				if(contextId === null){
					console.log('a');
					FBInstant.context.createAsync(playerId)
					.then(() => {
						console.log('ttttt', FBInstant.context.getID());
						console.log('pay', this);
						this.setState({...this.state, id:FBInstant.context.getID()});
					});
				}
			});
		}).catch(error => console.error(error));
	}

	onLeaderboard = () => {
		console.log(this, this.state.id);
		// 'standard_everyone.' + context.getID()
		// FBInstant
		// .getLeaderboardAsync('standard_everyone.' + this.id)
		// .then(entries => {
		// for (var i = 0; i < entries.length; i++) {
		// 	console.log(
		// 	entries[i].getRank() + '. ' +
		// 	entries[i].getPlayer().getName() + ': ' +
		// 	entries[i].getScore()
		// 	);
		// }
		// }).catch(error => console.error(error));

		FBInstant.getLeaderboardAsync('standard_everyone')
		.then(function(leaderboard) {
		console.log(leaderboard.getContextID()); // null
		}).catch(error => console.error(error));
	}
	
	
	render() {
	  return (
		<Fragment>
			<UI
				lives={9}
				visible={this.state.visible}
				view={this.state.view}
				setView={this.setView}
				startGame={this.startGame}
				onLeaderboard={this.onLeaderboard}
			/>
			<GameI />
		</Fragment>
	  )
	}
  }

// console.log(process.env.NODE_ENV);
// if(process.env.NODE_ENV === 'development') {
// 	window.game = new Phaser.Game(config);
// }else {
// 	FBInstant.initializeAsync().then(function() {
// 		window.game = new Phaser.Game(config);
// 		// preact user interface overlay
// 		render(<App ref={(preact) => {window.preact = preact}} />, document.body);
// 	});
// }

// FBInstant.initializeAsync().then(function() {
// // preact user interface overlay
render(<App ref={(preact) => {window.preact = preact}} />, document.body);
// });