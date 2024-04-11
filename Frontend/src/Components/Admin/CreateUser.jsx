// import React, { useState, useEffect } from 'react';
// import './CreateUser.css';
// import DialogBox from '../Login/DIalogBox';

// function CreateUser() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [error, setError] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [employeeId, setEmployeeID] = useState('');
//   const [roleCategory, setRoleCategory] = useState('');
//   const [department, setDepartment] = useState('');
//   const [showDialog, setShowDialog] = useState(false);

//   useEffect(() => {
//     setUserRole(sessionStorage.getItem('role'));
//   }, []);

//   const handleFirstNameChange = (event) => {
//     setFirstName(event.target.value);
//   };

//   const handleLastNameChange = (event) => {
//     setLastName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };
//   const handleEmployeeIdChange = (event) => {
//     setEmployeeID(event.target.value);
//   };
//   const handleDepartmentChange = (event) => {
//     setDepartment(event.target.value);
//   };
//   const handleRoleCategoryChange = (event) => {
//     setRoleCategory(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       if (userRole !== 'admin') {
//         throw new Error('Only admins can register new users');
//       }

//       const response = await fetch('http://localhost:5000/api/registerUser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
//         },
//         body: JSON.stringify({
//           first_name: firstName,
//           last_name: lastName,
//           role: role,
//           email: email,
//           password: password,
//           phone_number: phoneNumber,
//           employeeId: employeeId,
//           department: department,
//           roleCategory: roleCategory
//         }),
//       });

//       const res = await response.json();

//       if (res.message === "User created successfully") {
//         setShowDialog(true);
//         setFirstName('');
//         setLastName('');
//         setEmail('');
//         setRole('');
//         setPassword('');
//         setPhoneNumber('');
//         setDepartment('');
//         setEmployeeID('');
//         setRoleCategory('');
//       } else {
//         setError('Error in creating user');
//       }

//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleCloseDialog = () => {
//     setShowDialog(false);
//   };


//   return (
//     <div className='create-user'>
//       {userRole === 'admin' ? (

//         <div className="container">
//           <div className="title-bar">
//           <h1>Register New User</h1>
//           </div>

//           <form onSubmit={handleSubmit} className="row">
//             <div className="col-md-4">
//               <div className="form-group">
//                 <label htmlFor="employeeId">Employee ID</label>
//                 <input
//                   type="text"
//                   id="employeeId"
//                   value={employeeId}
//                   onChange={handleEmployeeIdChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   value={firstName}
//                   onChange={handleFirstNameChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   value={lastName}
//                   onChange={handleLastNameChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="department">Department</label>
//                 <input
//                   type="text"
//                   id="department"
//                   value={department}
//                   onChange={handleDepartmentChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="form-group">
//                 <label htmlFor="role">Role</label>
//                 <select
//                   id="role"
//                   value={role}
//                   onChange={handleRoleChange}
//                   required
//                 >
//                   <option value="">Select a role</option>
//                   <option value="admin">Admin</option>
//                   <option value="user">User</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="roleCategory">Role Category</label>
//                 <input
//                   type="text"
//                   id="roleCategory"
//                   value={roleCategory}
//                   onChange={handleRoleCategoryChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phoneNumber">Mobile Number</label>
//                 <input
//                   type="text"
//                   id="phoneNumber"
//                   value={phoneNumber}
//                   onChange={handlePhoneNumberChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   required
//                 />
//               </div>
//               {error && <p>{error}</p>}
//               {showDialog && <DialogBox message="User created successfully" onClose={handleCloseDialog} />}
//               <button type="submit">Submit</button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <p>You are not permitted to register new users.</p>
//       )}
//     </div>
//   );
// }

// export default CreateUser;

import React, { useState, useEffect } from 'react';
import './CreateUser.css';
import DialogBox from '../Login/DIalogBox';
import ButtonAppBar from '../navbar/navbar';
import Box from '@mui/material/Box';
import Dashboard from '../Dashboard/Dashboard';
function CreateUser() {
  const [user_id, setUser_id] = useState('');
  const [userName, setUserName] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [reportingUserId, setReportingUserId] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [roles, setRoles] = useState('');
  const [designationId, setDesignationId] = useState('');
  const [designation, setDesignation] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [department, setDepartment] = useState('');
  const [user_status, setUser_status] = useState('active');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setUserRole(sessionStorage.getItem('roles'));
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


  const handleDepartmentChange = (event) => {
    const selectedDepartmentId = event.target.value;
    setDepartmentId(selectedDepartmentId);
    // Optionally, if you want to update the designation name as well
    const selectedDepartment = event.target.options[event.target.selectedIndex].text;
    setDepartment(selectedDepartment);
  };


  const handleRoleCategoryChange = (event) => {
    setRoleCategory(event.target.value);
  };

  const handleDesignationChange = (event) => {
    const selectedDesignationId = event.target.value;
    setDesignationId(selectedDesignationId);
    // Optionally, if you want to update the designation name as well
    const selectedDesignation = event.target.options[event.target.selectedIndex].text;
    setDesignation(selectedDesignation);
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
          user_id: user_id,
          userName: userName,
          dateOfJoin: dateOfJoin,
          mobileNumber: mobileNumber,
          email: email,
          city: city,
          state: state,
          pin: pin,
          dateOfBirth: dateOfBirth,
          gender: gender,
          reportingUserId: reportingUserId,
          reporterName: reporterName,
          roles: roles,
          designationId: designationId,
          designation: designation,
          departmentId: departmentId,
          department: department,
          user_status: user_status,
          password: password
        }),
      });

      const res = await response.json();

      if (res.message === "User created successfully") {
        setShowDialog(true);
        setUser_id('');
        setUserName('');
        setDateOfJoin('');
        setMobileNumber('');
        setEmail('');
        setCity('');
        setState('');
        setPin('');
        setDateOfBirth('');
        setGender('');
        setReportingUserId('');
        setReporterName('');
        setRoles('');
        setDesignationId('');
        setDesignation('');
        setDepartmentId('');
        setDepartment('');
        setUser_status('active');
        setPassword('');
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
    
      <>
        {/* <ButtonAppBar className='navbar'/> */}
        <Dashboard className='navbar' />


      <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
          <div className='create-user'>

            {userRole === 'admin' ? (
              <div className="container">
                <div className="title-bar black-text">
                  <h1>Register New User</h1>
                </div>
                <form onSubmit={handleSubmit} className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="user_id">User ID</label>
                      <input
                        type="text"
                        id="user_id"
                        value={user_id}
                        onChange={(e) => setUser_id(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userName">User Name</label>
                      <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfJoin">Date of Join</label>
                      <input
                        type="date"
                        id="dateOfJoin"
                        value={dateOfJoin}
                        onChange={(e) => setDateOfJoin(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobileNumber">Mobile Number</label>
                      <input
                        type="text"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pin">PIN</label>
                      <input
                        type="text"
                        id="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="reportingUserId">Reporting User ID</label>
                      <input
                        type="text"
                        id="reportingUserId"
                        value={reportingUserId}
                        onChange={(e) => setReportingUserId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reporterName">Reporter Name</label>
                      <input
                        type="text"
                        id="reporterName"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="roles">Roles</label>
                      <select
                        id="roles"
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="designation">Designation</label>
                      <select
                        id="designation"
                        value={designationId}
                        onChange={handleDesignationChange}
                        required
                      >
                        <option value="">Select Designation</option>
                        <option value="1">Business Administrator</option>
                        <option value="2">CEO</option>
                        <option value="3">Consultant</option>
                        <option value="4">Intern</option>
                        <option value="5">Manager</option>
                        <option value="6">Senior Associate Consultant</option>
                        <option value="7">Senior Consultant</option>
                        <option value="8">Solutions Consultant</option>
                        <option value="9">Software Engineer</option>
                        <option value="10">Solution Enabler</option>
                        <option value="11">Senior Software Engineer</option>
                      </select>
                    </div>
                    {/* <div className="col-md-4">


                </div> */}
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <select
                        id="department"
                        value={departmentId}
                        onChange={handleDepartmentChange}
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="1">Administration</option>
                        <option value="2">Delivery</option>
                        <option value="3">Operations</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="user_status">User Status</label>
                      <select
                        id="user_status"
                        value={user_status}
                        onChange={(e) => setUser_status(e.target.value)}
                        required
                      >
                        <option value="active">Active</option>
                        <option value="left">Left</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p>{error}</p>}
                    {showDialog && <DialogBox message="User created successfully" onClose={handleCloseDialog} />}
                    <button type="submit" className="submit-button">Submit</button>
                  </div>
                </form>
              </div>
            ) : (
              <p>You are not permitted to register new users.</p>
            )}
          </div>
      
    
  
      
    </Box >
  </>
  );
}

export default CreateUser;
