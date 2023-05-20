import LottiePlayer from 'react-lottie-player';
import animationData from '../assets/astronautJoinScreen.json';

function JoinScreen({module_name, start}) {
  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>
      <LottiePlayer
      loop
      animationData={animationData}
      play
      style={{ width: '400px',}} />
      <p className="lesson-name-join-screen font-bold">{module_name}</p>
      <button className="quiz_start_btn" onClick={start}>Start</button>
    </div>
  );
}

export default JoinScreen;
