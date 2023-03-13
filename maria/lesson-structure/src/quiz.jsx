import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import QuizScreen from "./components/QuizScreen.jsx";
import JoinScreen from "./components/JoinScreen.jsx";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  return (
    <>
      <Navbar />
      <div className="quiz-container">
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
