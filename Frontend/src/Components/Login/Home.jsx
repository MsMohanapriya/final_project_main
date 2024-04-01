import React, { useState, useEffect } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import './Home.css';

function HomePage() {
  const [role] = useState(sessionStorage.getItem('role')); // Assume user is not an admin by default
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      // If role is not defined, redirect to the login page
      navigate('/login');
    }
  }, [navigate, role]);

  return (
    <div>
  
  {role === 'admin' && (
    <div>
        <h1>Welcome to the Home Page</h1>
      <h2>Hello Admin!</h2>
      <div className="button-container">
        <Link to="/createuser" className="user-creation-button">Create User</Link>
        <Link to="/timesheet" className="timesheet-button">Time Sheet</Link>
      </div>
    </div>
  )}
  {role === 'user' && (
    <div>
        <h1>Welcome to the Home Page</h1>
      <h2>Hello User!</h2>
      {/* Regular user-specific content */}
    </div>
  )}
</div>

  );
}

export default HomePage;