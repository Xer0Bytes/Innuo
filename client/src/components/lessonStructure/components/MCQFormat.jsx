import React from "react";

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
  console.log(currQuestion + " eita mcq component e ashche");
  return (
    <form className="main">
      <div className="title">
        {/* insert condition here instead of 1 ================================ */}
        {1 ? (
          <span>
            <p>{currQuestion.questionText}</p>
            <span className="question-img">
              <img src={currQuestion.questionImageURL} className="w-[200px] rounded-lg"/>
            </span>
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="options">
        {currQuestion.choices.map((choice, index) => {
          return (
            <div
              className={index == selectedOption ? "option active" : "option"}
              key={index}
              onClick={() => selectTheOption(index)}
              >
              {/* insert condition here instead of 1 ================================ */}
              {1 ? (
                <span>
                  {choice.choiceText}
                  <div className="option-img">
                    <img src={choice.choiceImageURL} className="w-[200px] rounded-lg"/>
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
