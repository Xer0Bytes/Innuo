import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import ProgressBar from "./ProgressBar";
import MCQFormat from "./MCQFormat";

function Question({
  question,
  totalQuestions,
  currentQuestionIndex,
  setAnswer,
}) {
  const timer = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleOptionSelect(optionIndex) {
    setSelectedOption(optionIndex);
  }

  function gotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flushSync(() => {
      setAnswer(selectedOption);
    });
    setSelectedOption(null);
  }

  return (
    <div className="question">
      {/* <div className="progress-bar" ref={progressBar}></div> */}
      <ProgressBar
        width={((currentQuestionIndex - 1) / totalQuestions) * 100}
        className="quiz_progress"
      />
      <div className="question_content">
        <div className="question-count">
          <b> {currentQuestionIndex} </b>
          of
          <b> {totalQuestions} </b>
        </div>

        {/* ==== mcq removed */}
        <MCQFormat currQuestion={question} optionSelected={handleOptionSelect} selectedOption={selectedOption}/>

        <div className="control">
          <button className="quiz_next_btn" onClick={gotoNextQuestion}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
