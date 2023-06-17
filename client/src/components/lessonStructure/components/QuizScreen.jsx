import { useState} from "react";
import QuizResult from "./QuizResult";
import Question from "./Question";
import Lesson from "./Lesson";
import getCurrentQuizData from "../../../utils/getCurrentQuizData.js";

function QuizScreen({ expSystem, retry, userExp, setUserExp, previousExp, module_id }) {
  const currentQuizData = getCurrentQuizData();
  const LessonList = currentQuizData[0];
  const QuestionList = currentQuizData[1];

  // import question array, lesson
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const isLessonEnd = currentLessonIndex === LessonList.length;
  // console.log("lesson length: " + LessonList.length);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionList.length)
  );
  const isQuestionEnd = currentQuestionIndex === QuestionList.length;

  //ignore this function since we dont calculate result
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
        <QuizResult
          userExp={userExp}
          previousExp ={previousExp}
          result={calculatedResult()}
          retry={retry}
          module_id={module_id}
        />
      ) : (
        <>
          {isLessonEnd ? (
            //pass the question if lesson has ended
            <Question
              question={QuestionList[currentQuestionIndex]}
              totalQuestions={LessonList.length + QuestionList.length}
              currentQuestionIndex={currentQuestionIndex + 1}
              currentProgress={currentQuestionIndex + LessonList.length}
              setAnswer={(index) => {
                setMarkedAnswers((arr) => {
                  let newArr = [...arr];
                  newArr[currentQuestionIndex] = index;
                  return newArr;
                });
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }}
              expSystem={expSystem}
              userExp={userExp}
              setUserExp={setUserExp}
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
