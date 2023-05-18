import animatedStar from "../assets/star.mp4";

function QuizResult({ result, xpPoints, retry }) {
  return (
    <div className="result-screen">
      <video autoPlay loop className="w-[300px]">
        <source src={animatedStar} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <h2>Result: {result.percentage}%</h2> */}
      <span  className="-mt-28">
        <h2>You earned +{xpPoints} XP!</h2>
        {/* <p>
        Selected {result.correct} correct options out of {result.total} questions.
        
      </p> */}
        <button onClick={retry} className="quiz_retry_btn mt-2">
          Next
        </button>
      </span>
    </div>
  );
}

export default QuizResult;
