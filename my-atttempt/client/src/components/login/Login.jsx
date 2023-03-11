import React, { useState } from 'react';
import axios from 'axios';
import {useHistory, Link} from "react-router-dom"

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        alert('Login successful');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.log(error);
      alert('Login failed');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      if (response.data.success) {
        alert('An email with instructions to reset your password has been sent');
      } else {
        alert('Forgot password failed');
      }
    } catch (error) {
      console.log(error);
      alert('Forgot password failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
    </form>
  );
}

export default LoginForm;

