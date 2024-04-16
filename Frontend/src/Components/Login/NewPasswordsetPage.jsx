// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import DialogBox from './DIalogBox';
// import Dashboard from '../Dashboard/Dashboard';

// function ChangePasswordPage() {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showDialog, setShowDialog] = useState(false);
//   const navigate = useNavigate();

//   const handleNewPasswordChange = (event) => {
//     setNewPassword(event.target.value);
//   };
//   // useEffect(() => {
//   //   if (!sessionStorage.getItem('accessToken')) {
//   //     navigate('/');
//   //   }
//   // }, [])
//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Add client-side validation if needed
//     if (newPassword !== confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }

//     try {
//       // Send API request to update password
//       const response = await fetch('http://localhost:5000/api/changepassword', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
//         },
//         body: JSON.stringify({ email:sessionStorage.getItem('email'),newPassword }),
//       });

//       if (response.ok) {
//         // Password changed successfully
//         navigate('/login'); // Navigate back to login page
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Password change failed');
//       }
//     } catch (error) {
//       setError(error.message || 'Password change failed');
//     }
//   };

//   return (

//     <>
//       {/* <Dashboard className='navbar' /> */}
    
//     <div className="App">
//       <h1>Change Password</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="newPassword">New Password</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={handleNewPasswordChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={handleConfirmPasswordChange}
//             required
//           />
//         </div>
//         {error && <p className="error">{error}</p>}
        
//         {showDialog && <DialogBox message="Password changed successfully" onClose={handleCloseDialog} />}
//         <button type="submit">Change Password</button>
//       </form>
//       <Link to="/">Back to Login</Link>
//     </div>
//     </>
//   );
// }

// export default ChangePasswordPage;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from '../Navbar/Dashboard';

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
        body: JSON.stringify({ email: sessionStorage.getItem('email'), newPassword }),
      });

      if (response.ok) {
        // Password changed successfully
        navigate('/'); // Navigate back to login page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Password change failed');
      }
    } catch (error) {
      setError(error.message || 'Password change failed');
    }
  };

  return (
    <>
      <Dashboard className='navbar' />
      <div style={{ fontFamily: 'Caudex, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ color: 'black', fontFamily: 'Caudex, sans-serif' }}>Change Password</h1>
        </div>
        <form style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: 'black' }}>New Password</label>
            <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px' }} required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: 'black' }}>Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px' }} required />
          </div>
          {error && <p className="error" style={{ color: '#dc3545', marginTop: '10px' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#19105b', color: '#ffffff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Change Password</button>
        </form>
        <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '10px', textDecoration: 'none', color: '#007bff' }}>Back to Login</Link>
      </div>
    </>
  );
}

export default ChangePasswordPage;
