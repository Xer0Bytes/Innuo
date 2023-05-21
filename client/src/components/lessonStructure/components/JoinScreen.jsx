import LottiePlayer from 'react-lottie-player';
import animationData from '../assets/astronautJoinScreen.json';
import newRequest from "../../../utils/newRequest";
import { useState } from 'react';

function JoinScreen({module_name, start}) {
  
  const [error, setError] = useState(null);
  const fetchModuleData = async () => {
    // e.preventDefault();
    try {
      const res = await newRequest.get(`/quiz/${module_name}`);
      // const res = await newRequest.post(
      //   `/module/${module_name}`,
      //   config_header
      // );
      // console.log(res.data);
      localStorage.setItem("currentQuizData", JSON.stringify(res.data));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        // console.log(error);
      } else {
        setError("An error occurred");
        console.log(err);

      }
    }
  };
  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>
      <LottiePlayer
      loop
      animationData={animationData}
      play
      style={{ width: '400px',}} />
      <p className="lesson-name-join-screen font-bold">{module_name}</p>
      <button className="quiz_start_btn" onClick={() => { fetchModuleData(); start();  }}>Start</button>
    </div>
  );
}

export default JoinScreen;
