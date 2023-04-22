import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import ProgressBar from "./ProgressBar";
import TestImg from "../assets/react.svg";

function Question({
  question,
  totalQuestions,
  currentQuestionIndex,
  setAnswer,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const timer = useRef(null);
  // console.log(currentQuestionIndex);
  // const progressBar = useRef(null);

  function gotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flushSync(() => {
      setAnswer(selectedOption);
    });
    setSelectedOption(null);
  }

  // useEffect(() => {
  //   progressBar.current.classList.remove("active");
  //   setTimeout(() => {
  //     progressBar.current.classList.add("active");
  //   }, 0);
  //   timer.current = setTimeout(gotoNextQuestion, 10 * 1000); //10 seconds
  //   return gotoNextQuestion;
  // }, [question]);

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
        <div className="main">
          <div className="title">
            {/* <span>Question:</span> */}
{/* insert condition here instead of 1 ================================ */}
            {1? <span><p>{question.title}</p><span className="question-img">
              <img src={TestImg} /></span></span>: ''}
           
          </div>
          <div className="options">
            {question.options.map((option, index) => {
              return (
                <div
                  className={
                    index == selectedOption ? "option active" : "option"
                  }
                  key={index}
                  onClick={() => setSelectedOption(index)}
                >
{/* insert condition here instead of 1 ================================ */}
                  {1 ? (
                    <span>
                      {option}
                      <div className="option-img">
                        <img src={TestImg} />
                      </div>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
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
