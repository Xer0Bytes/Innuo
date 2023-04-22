import { useState } from 'react'
import './Quiz.css'
import QuizScreen from './components/QuizScreen'
import JoinScreen from './components/JoinScreen'

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  return (
    <>
      <div className="quiz-container"> 
      {/* no css for quiz-container  */}
        {isQuizStarted ? (
          <QuizScreen retry={() => setIsQuizStarted(false)} />
        ) : (
          <JoinScreen start={() => setIsQuizStarted(true)} />
        )}
      </div>
    </>
  );
}

export default App;
