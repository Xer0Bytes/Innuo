import React from "react";
import ProgressBar from "./ProgressBar";

const Lesson = ({ lesson, currLessonIndex, changeIndex, total }) => {
  function nextLessonButtonClick() {
    changeIndex(currLessonIndex + 1);
  }
  return (
    <>
      <div className="question">
        <ProgressBar
          width={((currLessonIndex) / total) * 100}
          className="quiz_progress"
        />
        <div className="question_content">
          <div className="main">
            <div className="title">
              <span className="my-2">
                <p className="text-[#333] text-bold text-[1.6em]">
                  {lesson.lessonText}
                </p>
                <div className="flex items-center ">
                  <img src={lesson.lessonImageURL} className="mx-auto w-[370px] rounded-lg" />
                </div>
              </span>
            </div>
          </div>

          <div className="control">
            <button
              className="quiz_next_btn mt-2"
              onClick={() => {
                nextLessonButtonClick();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson;
