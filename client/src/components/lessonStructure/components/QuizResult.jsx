import LottiePlayer from "react-lottie-player";
import endQuizAnimation from "../assets/astronautResultScreen.json";
import loadingResult from "../assets/resultLoading.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import getCurrentUser from "../../../utils/getCurrentUser";

function QuizResult({ userExp, retry, previousExp, module_id }) {
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("user exp in quizresult.jsx: " + userExp);
  // useEffect(() => {
  // }, [userExp]);

  const navigate = useNavigate();
  const navigateToDashboard = () => {
    const buttonOnClick = () => {
      localStorage.removeItem("CurrentQuizData");
      navigate("/userDashboard");
    };

    const timer = setTimeout(buttonOnClick, 1000);
    return () => clearTimeout(timer);
  };
  const expEarned = Number(userExp - previousExp);
  // console.log("exp earned in result page: " + expEarned); //working

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const setUserExp = async (currentUser) => {
      try {
        const res = await newRequest.post(
          `/quiz/updateExp/${currentUser._id}`,
          { updateExp: userExp, moduleID: module_id },
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

    const checkAchievement = async (currentUser) => {
      console.log("achievement being checked!");
      try {
        const res = await newRequest.post(
          `/achievement/userAchievement/${currentUser._id}`,
          { userExp: currentUser.experiencePoints },
          config_header
        );
        console.log(res.data); 
        localStorage.setItem("gotAchievementBruh", res.data);
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

    const waitTime = () => {
      const currentUser = getCurrentUser();
      console.log(userExp + " sent for update");
      setUserExp(currentUser);
      checkAchievement(currentUser);
    };

    const sendReqTimer = setTimeout(waitTime, 2000);
    return () => clearTimeout(sendReqTimer);
  }, [userExp]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2700);

    return () => clearTimeout(loadingTimer);
  }, []);

  // useEffect (()=> {
  //   const sendReqTimer = setTimeout(waitTime, 1000);
  //   return () => clearTimeout(sendReqTimer);
  // }, []);

  return (
    <div className="result-screen overflow-y-hidden	">
      {loading ? (
        <>
          <LottiePlayer
            animationData={loadingResult}
            play
            loop={false}
            segments={[0, 97]}
            speed={1.5}
            className="w-[30em]"
          />
          <span className="-mt-[3em]">
            <h2 className="text-2xl">Ready for the reveal?</h2>
          </span>
        </>
      ) : (
        <>
          <LottiePlayer
            loop={true}
            animationData={endQuizAnimation}
            segments={[0,120]}
            play
            className="w-[30em]"
          />
          <span className="-mt-[7em]">
            <h2 className="text-2xl">
            You earned {expEarned ? (expEarned < 0 ? "" : "+") + expEarned : 0} XP!
            </h2>
            <button
              onClick={navigateToDashboard}
              className="quiz_retry_btn mt-20"
            >
              Nice!
            </button>
          </span>
        </>
      )}
    </div>
  );
}

export default QuizResult;
