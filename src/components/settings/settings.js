import { h, Fragment } from 'preact';

const Settings = ({ onChange }) => {

  FBInstant.getLeaderboardAsync('standard_everyone.' + FBInstant.context.getID())
  .then(leaderboard => {
    console.log(leaderboard.getName());
    return leaderboard.setScoreAsync(1, '{race: "elf", level: 3}');
  })
  .then(() => console.log('Score saved'))
  .catch(error => console.error(error));

  return(
    <Fragment>
      <h2>Settings</h2>

      <button className="button" onClick={() => {
          console.log('menu');
          onChange('menu');
      }}>Back</button>
    </Fragment>
  )
};

export default Settings;
