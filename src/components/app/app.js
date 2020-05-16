import { h, Component } from 'preact';
// import { useState, useEffect } from 'react';
// import { heart } from '';
import './app.css';
import Heart from 'components/heart';

class App extends Component {
    // console.log(this.state);
    state = { visible: true };

    setStateExt = (state) => {
        this.setState(this.state = state);
    }

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
    render() {
    console.log(this.state.lives);
    // useEffect(() => {
    // 	console.log('use', this, lives);
    // },[window.game]);

    // ${lives ? 'visible' : 'hidden'}
        // console.log(this.state);
        return (
            <div class={`app ${this.state.visible ? 'visible' : 'hidden'}`} >
                <h1>RAINBOW KITTY</h1>
                <Heart liver={this.state.lives} />
                <p>{this.state.lives}</p>

                <button className="button" onClick={() => {
                    console.log('test');
                    console.log(window.game);
                    // window.game.scene.game.startFade();
                    // window.game.scene.cameras.main.fadeOut(250, 0, 0, 0);
                    window.game.scene.start('Game');
                    this.setState({visible: false});
                }}>Start</button>

                <button className="button" onClick={() => {
                    console.log('leaderboard');
                }}>Leaderboard</button>

                <button className="button" onClick={() => {
                    console.log('exit');
                }}>exit</button>
            </div>
        );
   }
}

export default App;