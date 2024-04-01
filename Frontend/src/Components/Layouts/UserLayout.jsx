// UserLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const UserLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>User Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/timesheet">Timesheet</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>User Footer</p>
      </footer>
    </div>
  );
}

export default UserLayout;
