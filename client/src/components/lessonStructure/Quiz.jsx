import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Quiz.css'
import QuizScreen from './components/QuizScreen'
import JoinScreen from './components/JoinScreen'

function Quiz() {
  const { lesson } = useParams();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  return (
    <>
      <div className="quiz-container"> 
      {/* no css for quiz-container  */}
        {isQuizStarted ? (
          <QuizScreen xpPoints= {15} retry={() => setIsQuizStarted(false)} />
        ) : (
          <JoinScreen lesson_name={lesson} start={() => setIsQuizStarted(true)} />
        )}
      </div>
    </>
  );
}

export default Quiz;
