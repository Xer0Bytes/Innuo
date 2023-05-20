import { useState } from "react";
import QuestionList from "../data/questions.json";
import LessonList from "../data/lesson.json";
import QuizResult from "./QuizResult";
import Question from "./Question";
import Lesson from "./Lesson";

function QuizScreen({ xpPoints, retry }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const isLessonEnd = currentLessonIndex === LessonList.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionList.length)
  );
  const isQuestionEnd = currentQuestionIndex === QuestionList.length;

  function calculatedResult() {
    let correct = 0;
    QuestionList.forEach((question, index) => {
      if (question.correctOptionIndex == markedAnswers[index]) {
        correct++;
      }
    });
    return {
      total: QuestionList.length,
      correct: correct,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
    };
  }

  return (
    <div className="quiz-screen">
      {isQuestionEnd && isLessonEnd ? (
        <QuizResult xpPoints={xpPoints} result={calculatedResult()} retry={retry} />
      ) : (
        <>
          {isLessonEnd ? (
            //pass the question if lesson has ended
            <Question
              question={QuestionList[currentQuestionIndex]}
              totalQuestions={LessonList.length + QuestionList.length}
              currentQuestionIndex={currentQuestionIndex + 1}
              currentProgress = {currentQuestionIndex + LessonList.length}
              setAnswer={(index) => {
                setMarkedAnswers((arr) => {
                  let newArr = [...arr];
                  newArr[currentQuestionIndex] = index;
                  return newArr;
                });
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }}
            />
          ) : (
            //if quiz has not ended continue with the next lesson
            <Lesson
              lesson={LessonList[currentLessonIndex]}
              currLessonIndex={currentLessonIndex}
              changeIndex={setCurrentLessonIndex}
              total={LessonList.length + QuestionList.length}
            />
          )}
        </>
      )}
    </div>
  );
}

export default QuizScreen;
