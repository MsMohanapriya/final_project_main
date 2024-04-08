import React, { useState, useEffect } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import './Home.css';
import ButtonAppBar from '../navbar/navbar';



const timeSheetListItems = ['Dashboard', 'Timesheet', 'Leave', 'Work From Home', 'Feedback', 'Survey', 'Service Desks', 'Forms', 'Travel', 'Expenses', 'Resourcesing'];

// List items for admin navigation bar
const adminListItems = ['Create User', 'Create Project', 'Allocate Project', 'Feedback'];


function HomePage() {
  const [roles] = useState(sessionStorage.getItem('roles')); // Assume user is not an admin by default
  const navigate = useNavigate();

  useEffect(() => {
    if (!roles) {
      // If role is not defined, redirect to the login page
      navigate('/login');
    }
  }, [navigate, roles]);

  return (
    
    <div>
      {/* <ButtonAppBar title="ADMIN DASHBOARD" listItems={adminListItems} /> */}
  
      {roles === 'admin' && (
        
    <div>
        <h1>Welcome to the Home Page</h1>
      <h2>Hello Admin!</h2>
      <div className="button-container">
        <Link to="/createuser" className="user-creation-button">Create User</Link>
        <Link to="/timesheet" className="timesheet-button">Time Sheet</Link>
        <Link to="/createproject" className="project-creation-button">Create Project</Link>
            <Link to="/allocateProject" className="project-allocation-button">Allocate Project</Link>
            <Link to="/createFeedbackQuestions" className="create-feedback-button">Create Feedback</Link>
      </div>
    </div>
  )}
  {roles === 'user' && (
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