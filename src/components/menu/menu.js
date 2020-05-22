import { h, Fragment } from 'preact';
import Heart from 'components/heart';

const Menu = ({ onChange, startGame, lives }) => (
  <Fragment>
    <h1>RAINBOW KITTY</h1>
    <Heart liver={lives} />
    <p>{lives}</p>

    <button className="button" onClick={() => {
      startGame('type');
    }}>Start</button>

    <button className="button" onClick={() => {
        console.log('leaderboards');
        onChange('leaderboards');
    }}>Leaderboard</button>

    <button className="button" onClick={() => {
        console.log('settings');
        onChange('settings');
    }}>Settings</button>

    <button className="button" onClick={() => {
        console.log('exit');
    }}>exit</button>
  </Fragment>
);

export default Menu;
