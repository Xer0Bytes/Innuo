import React from "react";
import LandingPage from "./landingPage/LandingPage.jsx";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./signUpIn/components/Dashboard/Dashboard";
import Signup from "./signUpIn/components/Signup/Signup";
import Login from "./signUpIn/components/Login/Login";
import EmailVerify from "./signUpIn/components/EmailVerify";
import ForgotPassword from "./signUpIn/components/ForgotPassword/ForgotPassword";
import PasswordReset from "./signUpIn/components/PasswordReset/PasswordReset";

function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}>
          {/* <Route path="/register" element={<Signup/>} /> */}
        </Route>
        <Route path="/register" element={<Signup />}></Route>
        {
         user && 
        <Route path="/user-dashboard" exact element={<Main />} />}
        <Route path="/register" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        {/* <Route path="/password-reset" element={<PasswordReset />} /> */}
        {/* <Route component={Error} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
