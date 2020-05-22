import { h, Component } from 'preact';
// import { useState, useEffect } from 'react';
// import { heart } from '';
import './app.css';
import Menu from 'components/menu';
import Leaderboards from 'components/leaderboards';
import Settings from 'components/settings';

/*
class App extends Component {
    // console.log(this.state);
    // state = { view: 'menu', visible: true, lives: 9 };

    // setStateExt = (state) => {
    //     this.setState(this.state = state);
    // }

    // Called whenever our component is created
    componentDidMount() {
        //  if( window.game.lives !== this.state.lives){
        //     console.log(this);
        //     this.setState({ ...this.state, lives: window.game.lives });
        // }
        // console.log(this.props);

        // // update time every second
        // this.timer = setInterval(() => {
        //     if( window.game.lives !== this.state.lives){
        //         console.log(this);
        //         this.setState({ ...this.state, lives: window.game.lives });
        //     }
        // }, 1000);
        // FBInstant.getLeaderboardAsync('standard_everyone.' + FBInstant.context.getID())
		// .then(leaderboard => {
		// 	console.log(leaderboard.getName());
		// 	return leaderboard.setScoreAsync(this.score.score);
		// })
		// .then(() => console.log('Score saved'))
        // .catch(error => console.error(error));
        // FBInstant.startGameAsync().then(() => {
        //     console.log('b', FBInstant);
        //     this.setView('menu');
        // });
    }

    // Called just before our component will be destroyed
    componentWillUnmount() {
        // stop when not renderable
        // clearInterval(this.timer);
    }
    //const App = (lives) => {
    
    // componentDidMount() {
    //  console.log(window.game);
    // }

    // contructor() {
    // 	// super();
    // 	if(window.game) {
    // 	  this.state = { lives: window.game.lives };
    // 	}
    // 	else this.state = { lives: 0 };
    //   }

    // const [state, setState] = useState({ lives: window.game.lives });

    // const lives = window.game.lives;
    // console.log(lives);
    
    setView = (a) => {
        console.log(a);
        this.setState({...this.state, view:a});
    }

    startGame = (a) => {
        this.setState({...this.state, visible:false});
        console.log('test');
        console.log(window.game);
        // window.game.scene.game.startFade();
        // window.game.scene.cameras.main.fadeOut(250, 0, 0, 0);
        window.game.scene.start('Game');
    }

    render() {
    // console.log(this.state.lives);
    // useEffect(() => {
    // 	console.log('use', this, lives);
    // },[window.game]);
    console.log(this.visible);

        return (
            <div class={`app ${this.visible ? 'visible' : 'hidden'}`} >
                {this.state.view === 'menu' &&
                    <Menu startGame={this.startGame} onChange={this.setView} lives={this.state.lives || 9}/>
                }
                {this.state.view === 'settings' &&
                    <Settings onChange={this.setView}/>
                }
                {this.state.view === 'leaderboards' &&
                    <Leaderboards onChange={this.setView}/>
                }
            </div>
        );
   }
}
*/

const App = ({ visible, lives, view, setView, startGame, onLeaderboard }) => {
 
    return (
        <div class={`app ${visible ? 'visible' : 'hidden'}`} >
            {view === 'menu' &&
                <Menu startGame={startGame} onChange={setView} lives={lives || 9}/>
            }
            {view === 'settings' &&
                <Settings onChange={setView}/>
            }
            {view === 'leaderboards' &&
                <Leaderboards onLeaderboard={onLeaderboard} onChange={setView} />
            }
        </div>
    );
};

export default App;