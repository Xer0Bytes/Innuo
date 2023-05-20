import React from "react";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signUpIn/components/Signup/Signup";
import Login from "./components/signUpIn/components/Login/Login";
import EmailVerify from "./components/signUpIn/components/EmailVerify";
import ForgotPassword from "./components/signUpIn/components/ForgotPassword/ForgotPassword";
import PasswordReset from "./components/signUpIn/components/PasswordReset/PasswordReset";
import Dashboard from "./components/userDashboard/UserDashboard";
import Quiz from "./components/lessonStructure/Quiz";
import Profile from "./components/profile/Profile.jsx";
import Ranking from "./components/ranking/Ranking.jsx";
import Achievements from "./components/achievements/Achievements.jsx";
import "./App.css";
import { Contribute } from "./components/contribute/Contribute.jsx";

function App() {
  // const user = localStorage.getItem("token");
  const user=1;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Signup />}></Route>

        {user && <Route path="/userDashboard" exact element={<Dashboard />} />}
        {user && <Route path="/quiz/:module_name" exact element={<Quiz />} />}
        {user && <Route path="/ranking" exact element={<Ranking />} />}
        {user && (
          <Route path="/achievements" exact element={<Achievements />} />
        )}
        {user && <Route path="/contribute" exact element={<Contribute />} />}
        {user && <Route path="/profile" element={<Profile />} />}

        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/register" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />


        <Route path="/EmailVerify/:email/:token" element={<EmailVerify />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/password-reset/:email/:token"
          element={<PasswordReset />}
        />

        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
