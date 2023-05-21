import LottiePlayer from "react-lottie-player";
import endQuizAnimation from "../assets/astronautResultScreen.json";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import getCurrentUser from "../../../utils/getCurrentUser";

function QuizResult({
  userExp,
  retry,
  previousExp
}) {
  //console.log(userExp);

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {

    const currentUser = getCurrentUser();

    const setUserExp = async () => {
      try {
      
        const res = await newRequest.post(
          `/quiz/updateExp/${currentUser._id}`,
          { updateExp: userExp-5 },
          config_header
        );
    
        localStorage.setItem("currentUser", JSON.stringify(res.data));

      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during updating EXP.");
          //console.log(err);
        }
      }
    };

    setUserExp();
  }, []);

  const navigate = useNavigate();
  const navigateToDashboard = () => {
    const buttonOnClick = () => {
      navigate("/userDashboard");
    };
  
    const timer = setTimeout(buttonOnClick, 5000);
    return () => clearTimeout(timer);
  };
  const expEarned = Number(userExp-previousExp);

  return (
    <div className="result-screen overflow-y-hidden	">
      <LottiePlayer
        loop
        animationData={endQuizAnimation}
        play
        className="w-[30em]"
      />
      <span className="-mt-[8em]">
        <h2 className="text-2xl">You earned {expEarned <0 ? "" : "+"} {expEarned} XP!</h2>
        <button onClick={navigateToDashboard()} className="quiz_retry_btn mt-12">
          Next
        </button>
      </span>
    </div>
  );
}

export default QuizResult;
