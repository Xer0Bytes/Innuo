import { useState } from "react";

import QuestionList from "../data/questions.json";
import QuizResult from "./QuizResult.jsx";
import Question from "./Question.jsx";

function QuizScreen({retry}){
    const [currentQuestionIndex, setCurrentQuestion] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState(new Array(QuestionList.length));
    const isQuestionEnd = currentQuestionIndex === QuestionList.length;

    function calculatedResult(){
        let correct = 0;
        QuestionList.forEach((question, index)=>{
            if(question.correctOptionIndex == markedAnswers[index]){
                correct++;
            }
        });
        return {
            total:QuestionList.length,
            correct:correct,
            percentage: Math.trunc((correct / QuestionList.length) * 100)
        };
    }
    
    return (
        <div className="quiz-screen">
            {
                isQuestionEnd ? (
                    <QuizResult
                         return={calculatedResult()}
                         retry={retry}
                    />
                ) : (
                    <Question
                        question={QuestionList[currentQuestionIndex]}
                        totalQuestions={QuestionList.length}
                        currentQuestionIndex={currentQuestionIndex+1}
                        setAnswer={(index)=>{
                            setMarkedAnswers((arr)=>{
                                let newArr = [...arr];
                                newArr[currentQuestionIndex] = index;
                                return newArr;
                            });
                            setCurrentQuestionIndex(currentQuestionIndex+1);
                        }}
                    />
                )
            }
        </div>

    );
}

export default QuizScreen;