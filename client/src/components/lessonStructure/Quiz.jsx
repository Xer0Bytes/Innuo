import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Quiz.css'
import QuizScreen from './components/QuizScreen'
import JoinScreen from './components/JoinScreen'

function Quiz() {
  const { module_name } = useParams();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const[userExp, setUserExp] = useState(0);
  return (
    <>
      <div className="quiz-container"> 
      {/* no css for quiz-container  */}
        {isQuizStarted ? (
          <QuizScreen xpPoints= {15} userExp={userExp} setUserExp={setUserExp} retry={() => setIsQuizStarted(false)} />
        ) : (
          <JoinScreen module_name={module_name} start={() => setIsQuizStarted(true)} />
        )}
      </div>
    </>
  );
}

export default Quiz;
