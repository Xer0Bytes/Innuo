import { useRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import ProgressBar from "./ProgressBar";
import MCQFormat from "./MCQFormat";

function Question({
  expSystem,
  question,
  totalQuestions,
  currentProgress,
  setAnswer,
  userExp,
  setUserExp,
}) {
  const timer = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null); //select an option
  const [answerCorrect, setAnswerCorrect] = useState(false); //check answer
  const [showCheckedAnswer, setShowCheckedAnswer] = useState(false); //show the checked answer message
  const [allowSelectOption, setAllowSelectOption] = useState(true); //disable/enable option selection

  useEffect(() => {
    // Reset states when the question prop (parameter passed to this component) changes
    setSelectedOption(null);
    setAnswerCorrect(false);
    setShowCheckedAnswer(false);
    setAllowSelectOption(true);
  }, [question]);

  //select option selection
  function handleOptionSelect(optionIndex) {
    setSelectedOption(optionIndex);
  }

  //go to the next question
  function gotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flushSync(() => {
      setAnswer(selectedOption);
    });
    setSelectedOption(null);
  }

  function updateExp() {
    let updatedExp;
    if (
      (selectedOption !== question.correctChoice - 1) ||
      (selectedOption === null)
    ) {
      updatedExp = userExp - expSystem.wrongPoints;
      setUserExp((updatedExp));
    } else {
      updatedExp = userExp + expSystem.correctPoints;
      setUserExp((updatedExp));
    }

  };


  //on click of check button
  function checkAnswerButtonClick() {
    if (
      (selectedOption != question.correctChoice - 1) |
      (selectedOption === null)
    ) {
      setAnswerCorrect(false);
    } else {
      setAnswerCorrect(true);
    }
    setShowCheckedAnswer(true);
    setAllowSelectOption(false);
  }

  function nextButtonClick() {
    gotoNextQuestion();
    setShowCheckedAnswer(false);
    setAllowSelectOption(true);
  }

  

  return (
    <div className="question">
      <ProgressBar
        width={(currentProgress / totalQuestions) * 100}
        className="quiz_progress"
      />
      <div className="question_content">
        <MCQFormat
          currQuestion={question}
          setOptionSelected={handleOptionSelect}
          selectedOption={selectedOption}
          allowSelectOption={allowSelectOption}
        />

        <div className="control">
          {!showCheckedAnswer && (
            <button
            type="button"
              className="quiz_next_btn"
              onClick={() => {
                checkAnswerButtonClick();
              }}
            >
              Check
            </button>
          )}
          {answerCorrect && showCheckedAnswer && (
            <div className="flex items-center bg-green-300 p-4 rounded w-full">
              <div className="flex-grow text-left  pl-5 text-[#333] text-bold rounded-[7px]  text-[1.6em]">
                Answer is correct!
              </div>
              <div className="ml-4">
                <button
                  className="quiz_next_btn"
                  type="button"
                  onClick={() => {
                    nextButtonClick();
                    updateExp();
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {!answerCorrect && showCheckedAnswer && (
            <div className="flex items-center bg-red-300 p-4 rounded w-full">
              <div className="flex-grow text-left  pl-5 text-[#333] text-bold rounded-[7px]  text-[1.6em]">
                Correct answer is {Number(question.correctChoice)}
              </div>
              <div className="ml-4">
                <button
                  className="quiz_next_btn"
                  type="button"
                  onClick={() => {
                    nextButtonClick();
                    updateExp();
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Question;
