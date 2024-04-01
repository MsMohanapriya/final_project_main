import React, { useState, useEffect } from 'react';
import './CreateUser.css';
import DialogBox from './DIalogBox';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');
  const [employeeId, setEmployeeID] = useState('');
  const [roleCategory, setRoleCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setUserRole(sessionStorage.getItem('role'));
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleEmployeeIdChange = (event) => {
    setEmployeeID(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleRoleCategoryChange = (event) => {
    setRoleCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (userRole !== 'admin') {
        throw new Error('Only admins can register new users');
      }

      const response = await fetch('http://localhost:5000/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ 
          first_name: firstName, 
          last_name: lastName, 
          role: role, 
          email: email, 
          password: password, 
          phone_number: phoneNumber,
          employeeId: employeeId,
          department: department,
          roleCategory: roleCategory
        }),
      });

      const res = await response.json();

      if (res.message === "User created successfully") {
        setShowDialog(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setRole('');
        setPassword('');
        setPhoneNumber('');
        setDepartment('');
        setEmployeeID('');
        setRoleCategory('');
      } else {
        setError('Error in creating user');
      }

    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className='create-user'>
      {userRole === 'admin' ? (
        <div>
          <h1>Register New User</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-half">
              <div>
                <label htmlFor="employeeId">Employee ID</label>
                <input
                  type="text"
                  id="employeeId"
                  value={employeeId}
                  onChange={handleEmployeeIdChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  value={department}
                  onChange={handleDepartmentChange}
                  required
                />
              </div>
            </div>
            <div className="form-half">
              <div>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label htmlFor="roleCategory">Role Category</label>
                <input
                  type="text"
                  id="roleCategory"
                  value={roleCategory}
                  onChange={handleRoleCategoryChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Mobile Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              {error && <p>{error}</p>}
              {showDialog && <DialogBox message="User created successfully" onClose={handleCloseDialog} />}
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      ) : (
        <p>You are not permitted to register new users.</p>
      )}
    </div>
  );
}

export default CreateUser;
