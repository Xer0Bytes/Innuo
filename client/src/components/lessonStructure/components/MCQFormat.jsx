import React from "react";
import TestImg from "../assets/test.gif";

function MCQFormat({
  currQuestion,
  setOptionSelected,
  selectedOption,
  allowSelectOption,
}) {
  function selectTheOption(index) {
    if (allowSelectOption == true)
      setOptionSelected(index);
  }
  return (
    <form className="main">
      <div className="title">
        {/* insert condition here instead of 1 ================================ */}
        {1 ? (
          <span>
            <p>{currQuestion.title}</p>
            <span className="question-img">
              <img src={TestImg} className="w-[200px] rounded-lg"/>
            </span>
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="options">
        {currQuestion.options.map((option, index) => {
          return (
            <div
              className={index == selectedOption ? "option active" : "option"}
              key={index}
              onClick={() => selectTheOption(index)}
              >
              {/* insert condition here instead of 1 ================================ */}
              {1 ? (
                <span>
                  {option}
                  <div className="option-img">
                    <img src={TestImg} className="w-[200px] rounded-lg"/>
                  </div>
                </span>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
}

export default MCQFormat;
