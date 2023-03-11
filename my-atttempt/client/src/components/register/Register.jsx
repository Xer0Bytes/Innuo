import React, { useState } from 'react';
import axios from 'axios';
import {useHistory, Link} from "react-router-dom"

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/register', { name, email, password });
      if (response.data.success) {
        setIsRegistered(true);
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.log(error);
      alert('Registration failed');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verify-otp', { email, otp });
      if (response.data.success) {
        alert('Registration successful');
      } else {
        alert('OTP verification failed');
      }
    } catch (error) {
      console.log(error);
      alert('OTP verification failed');
    }
  };

  return (
    <div>
      {!isRegistered ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <label>
            OTP:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </label>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
