import React from "react";

function MCQFormat({
  currQuestion,
  setOptionSelected,
  selectedOption,
  allowSelectOption,
}) {
  function selectTheOption(index) {
    if (allowSelectOption == true) setOptionSelected(index);
  }
  return (
    <form className="main">
      <div className="title">
        <span>
          <p>{currQuestion.questionText}</p>
          <span className="question-img">
            <img
              src={currQuestion.questionImageURL}
              className="w-[200px] rounded-lg"
            />
          </span>
        </span>
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
                  <div className="flex items-center gap-4">
                    <span className="text-3xl mx-auto">
                      <span className="font-bold">
                        {Number(index) + 1}. &nbsp;
                      </span>
                      {choice.choiceText}
                    </span>
                    {choice.choiceImageURL && (
                      <div className="option-img">
                        <img
                          src={choice.choiceImageURL}
                          className="w-[200px] rounded-lg"
                        />
                      </div>
                    )}
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
