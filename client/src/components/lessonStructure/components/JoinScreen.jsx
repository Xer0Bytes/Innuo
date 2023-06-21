import LottiePlayer from "react-lottie-player";
import animationData from "../assets/astronautJoinScreen.json";
import newRequest from "../../../utils/newRequest";
import { useState, useEffect } from "react";

function JoinScreen({ module_id, start, module_name }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const res = await newRequest.get(`/quiz/${module_id}`);
        localStorage.setItem("currentQuizData", JSON.stringify(res.data));
        setQuizData(res.data);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred");
        }
      }
    };

    fetchModuleData();
  }, []);
  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>
      <LottiePlayer
        loop
        animationData={animationData}
        play
        style={{ width: "400px" }}
      />
      <p className="lesson-name-join-screen font-bold">{module_name}</p>
      <button
        className="quiz_start_btn"
        onClick={() => {
          start();
        }}
      >
        Start
      </button>
    </div>
  );
}

export default JoinScreen;
