

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  sessionStorage.clear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const res = await response.json();
      console.log(res)

      if (res.message === 'Username or password incorrect') {
        alert('Invalid email or password');
      }
      else{
        const { accessToken,role , requirePasswordChange} = res;
        console.log(accessToken,role,email);
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('email',email);
        if (requirePasswordChange) {
          navigate('/changepassword'); // Navigate to change password page
        } else {
          console.log("login sucess");
          navigate('/home'); // Navigate to home page
        }
        // if (requirePasswordChange) {
        //   // Set isFirstLogin to true if it's the user's first login
        //   sessionStorage.setItem('isFirstLogin', 'true');
        //   navigate('/changepassword'); // Navigate to change password page
        // } else {
        //   navigate('/home'); // Navigate to home page
        // }

      }
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <div className='loginstyle'><h1>Login</h1></div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <Link to="/forget-password/email">Forgot Password?</Link>
    </div>
  );
}

export default LoginPage;

