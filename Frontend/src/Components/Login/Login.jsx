

// import React, { useState } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import './Login.css';

// function LoginPage() {
//   sessionStorage.clear();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   // const [userName, setUserName] = useState('')
//   const navigate = useNavigate();

  

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
      
//       const res = await response.json();
//       console.log(res)

//       if (res.message === 'Username or password incorrect') {
//         alert('Invalid email or password');
//       }
//       else{
//         const { accessToken,roles, userId, userName, requirePasswordChange} = res;
//         console.log(accessToken,roles,email,userId, userName);
//         sessionStorage.setItem('accessToken', accessToken);
//         sessionStorage.setItem('roles', roles);
//         sessionStorage.setItem('email', email);
//         sessionStorage.setItem('userId', userId);
//         sessionStorage.setItem('userName', userName);
        
//         if (requirePasswordChange) {
//           navigate('/changepassword'); // Navigate to change password page
//         } else {
//           console.log("login sucess");
//           navigate('/dashboard'); // Navigate to home page
//         }
//         // if (requirePasswordChange) {
//         //   // Set isFirstLogin to true if it's the user's first login
//         //   sessionStorage.setItem('isFirstLogin', 'true');
//         //   navigate('/changepassword'); // Navigate to change password page
//         // } else {
//         //   navigate('/home'); // Navigate to home page
//         // }

//       }
      
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="App">
//       <div className='loginstyle'><h1 style={{color:'black'}}>Login</h1></div>
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={handleEmailChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button className= 'submitbutton' type="submit">Login</button>
//       </form>
//       <Link to="/forget-password/email">Forgot Password?</Link>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:5000/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const res = await response.json();

      if (res.message === 'Username or password incorrect') {
        alert('Invalid email or password');
      } else {
        const { accessToken, roles, userId, userName, requirePasswordChange } = res;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('roles', roles);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userName', userName);
        
        if (requirePasswordChange) {
          navigate('/changepassword');
        } else {
          console.log("login success");
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{fontFamily: 'Caudex, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: 'black',fontFamily: 'Caudex, sans-serif' }}>Login</h1>
      </div>
      <form style={{ fontFamily: 'Caudex, sans-serif',width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px',fontFamily: 'Caudex, sans-serif', fontWeight: 'bold' ,color: 'black'}}>Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px'}} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontFamily: 'Caudex, sans-serif',fontWeight: 'bold',color: 'black' }}>Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px' }} required />
        </div>
        {error && <p className="error" style={{ color: '#dc3545', marginTop: '10px' }}>{error}</p>}
        <button type="submit" style={{fontFamily: 'Caudex, sans-serif', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Login</button>
      </form>
      <Link to="/forget-password/email" style={{ display: 'block', textAlign: 'center', marginTop: '10px', textDecoration: 'none', color: '#007bff' }}>Forgot Password?</Link>
    </div>
  );
}

export default LoginPage;
