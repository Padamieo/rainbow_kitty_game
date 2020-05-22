import { h, Fragment } from 'preact';

const Leaderboards = ({ onChange, onLeaderboard }) => {

  return (
    <Fragment>
      <h2>Leaderboards</h2>

      <button className="button" onClick={() => {
          onLeaderboard();
      }}>get</button>

      <button className="button" onClick={() => {
          console.log('menu');
          onChange('menu');
      }}>Back</button>
    </Fragment>
  )
};

export default Leaderboards;
