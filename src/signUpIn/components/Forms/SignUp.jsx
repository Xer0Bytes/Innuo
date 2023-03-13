import React, {useState} from "react";


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  return (
    <form className="sign-up-form">

      <h2 className="signup_title">Sign up</h2>

      <div className="input-field signup_input">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="input-field signup_input">
        <i className="fas fa-envelope"></i>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="input-field signup_input">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className="input-field signup_input">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}/>
      </div>

      <input type="submit" className="signup_btn" value="Sign up" />

    </form>
  );
};

export default SignUp;
