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
  // setUserExp(([prevExp, isWrong]) => {
  //   const updatedExp = isWrong
  //     ? prevExp - expSystem.wrongPoints
  //     : prevExp + expSystem.correctPoints;
  //   console.log("current xp: " + updatedExp);
  //   return updatedExp;
  // });
  // console.log("og exp is " + userExp);
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
