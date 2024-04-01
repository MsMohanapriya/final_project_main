// AdminLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/createuser">Create User</Link></li>
            <li><Link to="/userdetails">User Details</Link></li>
            <li><Link to="/timesheet">Timesheet</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>Admin Footer</p>
      </footer>
    </div>
  );
}

export default AdminLayout;
