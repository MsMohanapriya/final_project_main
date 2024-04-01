import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add client-side validation if needed
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Send API request to update password
      const response = await fetch('http://localhost:5000/api/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ email:sessionStorage.getItem('email'),newPassword }),
      });

      if (response.ok) {
        // Password changed successfully
        navigate('/login'); // Navigate back to login page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Password change failed');
      }
    } catch (error) {
      setError(error.message || 'Password change failed');
    }
  };

  return (
    <div className="App">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Change Password</button>
      </form>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}

export default ChangePasswordPage;
