import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const FormsContainer = () => {
  return (
      <div className="forms-container">
        <div className="signin-signup">
          <SignIn />
          <SignUp />
        </div>
      </div>
  );
};

export default FormsContainer;
