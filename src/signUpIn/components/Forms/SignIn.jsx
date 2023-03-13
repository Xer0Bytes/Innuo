import React, {useState} from "react";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className="sign-in-form">

      <h2 className="signin_title">Sign in</h2>

      <div className="input-field signin_input">
        <i className="fas fa-user"></i>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="input-field signin_input">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <input type="submit" value="Login" className="signin_btn solid" />
      
    </form>
  );
};

export default SignIn;
