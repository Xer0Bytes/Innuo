import React, { useState } from "react";
import TestImg from "../assets/react.svg";

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
    <div className="main">
      <div className="title">
        {/* insert condition here instead of 1 ================================ */}
        {1 ? (
          <span>
            <p>{currQuestion.title}</p>
            <span className="question-img">
              <img src={TestImg} />
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
                    <img src={TestImg} className="w-[200px]"/>
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
  );
}

export default MCQFormat;
