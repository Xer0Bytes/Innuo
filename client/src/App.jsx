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
import UserDashboard from "./components/userDashboard/UserDashboard";
import Quiz from "./components/lessonStructure/Quiz";
import Profile from "./components/profile/Profile.jsx";
import Ranking from "./components/ranking/Ranking.jsx";
import Achievements from "./components/achievements/Achievements.jsx";
import ContributePage from "./components/contributePage/ContributePage.jsx"
import NotFound from "./components/signUpIn/components/NotFound/NotFound.jsx";
import AdminDashboard from "./components/adminDashboard/AdminDashboard.jsx";
import AdminProfile from "./components/adminProfile/AdminProfile.jsx";

//css import
import "./App.css";

//utils import
import getCurrentUser from "./utils/getCurrentUser.js";

function App() {
  const currentUser = getCurrentUser();
  const admin = currentUser ? currentUser.isAdmin : false;
  // const user = 1;
  return (
    <BrowserRouter>
      <Routes>
        {/* non admin users route */}
        <Route path="/userDashboard" element={<NormalUser><UserDashboard /></NormalUser>} />
        <Route path="/quiz/:module_name/:module_id" element={<NormalUser><Quiz /></NormalUser>} />
        <Route path="/ranking" element={<NormalUser><Ranking /></NormalUser>} />
        <Route path="/achievements" element={<NormalUser><Achievements /></NormalUser>} />
        <Route path="/profile" element={<NormalUser><Profile /></NormalUser>} />

        {/* contributor user */}
        <Route path="/contribute"  element={<ContributorUser><ContributePage /></ContributorUser>} />

        {/* admin routes  */}
        <Route path="/adminDashboard" element={<AdminUser><AdminDashboard /></AdminUser>} />
        <Route path="/adminProfile" element={<AdminUser><AdminProfile /></AdminUser>} />

        {/* without login pages  */}
        <Route path="/" element={<PublicUser><LandingPage /></PublicUser>} />
        <Route path="/register" element={<PublicUser><Signup /></PublicUser>} />
        <Route path="/login" element={<PublicUser><Login /></PublicUser>} />
        <Route path="/EmailVerify/:id/:unique" element={<ExceptionRoutes><EmailVerify /></ExceptionRoutes>} />
        <Route path="/forgot-password" element={<PublicUser><ForgotPassword /></PublicUser>} />
        <Route path="/VerifyReset/:id/:unique" element={<ExceptionRoutes><PasswordReset /></ExceptionRoutes>} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function PublicUser ({children}){
  //is user;
  const currentUser = getCurrentUser();
  if(currentUser===null || currentUser===undefined){
    return <>{children}</>
  } else if(currentUser.isAdmin) {
    return <Navigate to="/adminDashboard"/>
  }else if(currentUser.isContributer) {
    return <Navigate to="/userDashboard"/>
  }else {
    return <Navigate to="/userDashboard"/>
  }
}

function NormalUser ({children}){
  //is user;
  const currentUser = getCurrentUser();
  if(currentUser!==null && currentUser!==undefined && currentUser.isAdmin===false){
    return <>{children}</>
  } else if(currentUser===null || currentUser===undefined) {
    return <Navigate to="/login"/>
  } else if(currentUser.isAdmin===true){
    return <Navigate to="/adminDashboard"/>
  }else {
    return <Navigate to="/userDashboard"/>
  }
}

function ContributorUser ({children}){
  //is user;
  const currentUser = getCurrentUser();
  if(currentUser!==null && currentUser!==undefined && currentUser.isContributer===true && currentUser.isAdmin===false){
    return <>{children}</>
  } else if(currentUser===null || currentUser===undefined) {
    return <Navigate to="/login"/>
  } else if(currentUser.isAdmin===true){
    return <Navigate to="/adminDashboard"/>
  } else {
    return <Navigate to="/userDashboard"/>
  }
}

function AdminUser ({children}){
  //is user;
  const currentUser = getCurrentUser();
  if(currentUser!==null && currentUser!==undefined && currentUser.isAdmin===true && currentUser.isContributer===false){
    return <>{children}</>
  } else if(currentUser===null || currentUser===undefined) {
    return <Navigate to="/login"/>
  } else if(currentUser.isContributer===true){
    return <Navigate to="/userDashboard"/>
  }else {
    return <Navigate to="/userDashboard"/>
  }
}

function ExceptionRoutes ({children}){
  const currentUser = getCurrentUser();
  if(currentUser!==null && currentUser!==undefined){
    localStorage.clear();
  }
  return <PublicUser>{children}</PublicUser>
}


