//react stuff
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//component imports
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Signup from "./components/signUpIn/components/Signup/Signup";
import Login from "./components/signUpIn/components/Login/Login";
import EmailVerify from "./components/signUpIn/components/EmailVerify";
import ForgotPassword from "./components/signUpIn/components/ForgotPassword/ForgotPassword";
import PasswordReset from "./components/signUpIn/components/PasswordReset/PasswordReset";
import Dashboard, {
  UserDashboard,
} from "./components/userDashboard/UserDashboard";
import Quiz from "./components/lessonStructure/Quiz";
import Profile from "./components/profile/Profile.jsx";
import Ranking from "./components/ranking/Ranking.jsx";
import Achievements from "./components/achievements/Achievements.jsx";
import { Contribute } from "./components/contribute/Contribute.jsx";

//css import
import "./App.css";
import getCurrentUser from "./utils/getCurrentUser.js";
import NotFound from "./components/signUpIn/components/NotFound/NotFound.jsx";
import AdminDashboard from "./components/adminDashboard/AdminDashboard.jsx";

function App() {
  const currentUser = getCurrentUser();
  const admin = currentUser ? currentUser.isAdmin : false;
  // const user = 1;
  return (
    <BrowserRouter>
      <Routes>
        {/* non admin users route */}
        {currentUser && !admin && (
          <Route path="/userDashboard" exact element={<Dashboard />} />
        )}
        {currentUser && !admin && (
          <Route
            path="/quiz/:module_name/:module_id"
            exact
            element={<Quiz />}
          />
        )}
        {currentUser && !admin && (
          <Route path="/ranking" exact element={<Ranking />} />
        )}
        {currentUser && !admin && (
          <Route path="/achievements" exact element={<Achievements />} />
        )}
        {currentUser && !admin && (
          <Route path="/contribute" exact element={<Contribute />} />
        )}
        {currentUser && !admin && (
          <Route path="/profile" element={<Profile />} />
        )}

        
        {/* admin routes  */}
        {admin && <Route path="/adminDashboard" element={<AdminDashboard />} />}


        {/* without login pages  */}
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/register" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/EmailVerify/:id/:unique" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/VerifyReset/:id/:unique" element={<PasswordReset />} />


        {/* no matches found  */}
        {currentUser && !admin && (
          <Route path="*" element={<UserDashboard />} />
        )}
        {admin && <Route path="*" element={<AdminDashboard />} />}
        {currentUser === null && <Route path="*" element={<UserDashboard />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
