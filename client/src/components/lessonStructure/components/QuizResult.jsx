import LottiePlayer from "react-lottie-player";
import endQuizAnimation from "../assets/astronautResultScreen.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import getCurrentUser from "../../../utils/getCurrentUser";

function QuizResult({
  userExp,
  retry,
  previousExp,
  module_id
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
          { updateExp: userExp-5, moduleID: module_id },
          config_header
        );
    
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        localStorage.removeItem("currentQuizData");

      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during updating EXP.");
          //console.log(err);
        }
      }
    };


    const checkAchievement = async () => {
      try {
        const res = await newRequest.post(
          `/achievement/userAchievement/${currentUser._id}`,
          { userExp: currentUser.experiencePoints},
          config_header
        );
          // console.log(res.data); --> gives new achievement boolean
          localStorage.setItem("gotAchievementBruh" , res.data);
        const resUser = await newRequest.post(
          "/user/getCurrentUser",
          { id: currentUser._id },
          config_header
        );
        // console.log("request gese!");
        localStorage.setItem("currentUser", JSON.stringify(resUser.data));
        // console.log(resUser.data);

        //DO SOMETHING WITH RES.DATA
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during setting achievement.");
          //console.log(err);
        }
      }
    };

    
    checkAchievement();
    setUserExp();
  }, []);

  const navigate = useNavigate();
  const navigateToDashboard = () => {
    const buttonOnClick = () => {
      navigate("/userDashboard");
      localStorage.removeItem("CurrentQuizData");
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
