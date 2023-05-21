import LottiePlayer from "react-lottie-player";
import endQuizAnimation from "../assets/astronautResultScreen.json";

function QuizResult({
  userExp,
  retry,
}) {

  //WRITE THE FUNCTION
  return (
    <div className="result-screen overflow-y-hidden	">
      <LottiePlayer
        loop
        animationData={endQuizAnimation}
        play
        className="w-[30em]"
      />
      <span className="-mt-[8em]">
        <h2 className="text-2xl">You earned +{userExp} XP!</h2>
        <button onClick={retry} className="quiz_retry_btn mt-12">
          Next
        </button>
      </span>
    </div>
  );
}

export default QuizResult;
