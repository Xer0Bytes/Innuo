import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Quiz.css";
import QuizScreen from "./components/QuizScreen";
import JoinScreen from "./components/JoinScreen";
import getExp from "../../utils/getExp";
import getCurrentUser from "../../utils/getCurrentUser";
function Quiz() {
  const { module_name } = useParams();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const currentUser = getCurrentUser();
  const [userExp, setUserExp] = useState(currentUser.experiencePoints);
  const previousExp = currentUser.experiencePoints;
  
  const exp = getExp();
  return (
    <>
      <div className="quiz-container">
        {/* no css for quiz-container  */}
        {isQuizStarted ? (
          <QuizScreen
            expSystem={exp}
            userExp={userExp}
            setUserExp={setUserExp}
            retry={() => setIsQuizStarted(false)}
            previousExp={previousExp}
          />
        ) : (
          <JoinScreen
            module_name={module_name}
            start={() => setIsQuizStarted(true)}
          />
        )}
      </div>
    </>
  );
}

export default Quiz;
