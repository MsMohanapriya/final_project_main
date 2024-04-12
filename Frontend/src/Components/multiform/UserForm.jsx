// import React, { Component } from 'react';
// import FormUserDetails from './FormUserDetails';
// import FormPersonalDetails from './FormPersonalDetails';
// import Confirm from './Confirm';
// import Success from './Success';
// // import Box from '@mui/material/Box';
// // import Dashboard from '../Dashboard/Dashboard';
// export class UserForm extends Component {
//     state = {
//         step: 1,
//         userId: '',
//         userName: '',
//         mobileNumber: '',
//         email: '',
//         city: '',
//         state: '',
//         pin: '',
//         dateOfBirth: '',
//         gender: '',
//         reportingUserId: '',
//         reporterName: '',
//         roles: '',
//         designationId: '',
//         departmentId: '',
//         user_status: '',
//         password: ''
//         // firstName: '',
//         // lastName: '',
//         // email: '',
//         // occupation: '',
//         // city: '',
//         // bio: ''
//     };

//     // Proceed to next step
//     nextStep = () => {
//         const { step } = this.state;
//         this.setState({
//             step: step + 1
//         });
//     };

//     // Go back to prev step
//     prevStep = () => {
//         const { step } = this.state;
//         this.setState({
//             step: step - 1
//         });
//     };

//     // Handle fields change
//     handleChange = input => e => {
//         this.setState({ [input]: e.target.value });
//     };

//     handleSubmit = async (event) => {
//         if (event) {
//             event.preventDefault();
//         }

//         try {
//             // Check user role
//             if (roles !== 'admin') {
//                 throw new Error('Only admins can register new users');
//             }

//             // Make API call to register user
//             const response = await fetch('http://localhost:5000/api/registerUser', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
//                 },
//                 body: JSON.stringify({
//                     // Pass your form data from state
//                     userId: this.state.userId,
//                     userName: this.state.userName,
//                     // Add other fields as needed...
//                 }),
//             });

//             const res = await response.json();

//             // Handle success response
//             if (response.ok) {
//                 // Show success message or navigate to success page
//                 alert("User registration successful");
//                 // Redirect to success page or do something else...
//             } else {
//                 // Handle error response
//                 throw new Error(res.message);
//             }
//         } catch (error) {
//             // Handle error
//             console.error('Error registering user:', error.message);
//             alert("Error registering user: " + error.message);
//         }
//     };


//     render() {
//         const { step } = this.state;
//         const { userId,
//             userName,
//             mobileNumber,
//             email,
//             city,
//             state,
//             pin,
//             dateOfBirth,
//             gender,
//             reportingUserId,
//             reporterName,
//             roles,
//             designationId,
//             departmentId,
//             user_status,
//             password } = this.state;


//         const values = {
//             userId,
//             userName,
//             mobileNumber,
//             email,
//             city,
//             state,
//             pin,
//             dateOfBirth,
//             gender,
//             reportingUserId,
//             reporterName,
//             roles,
//             designationId,
//             departmentId,
//             user_status,
//             password
// };

//         switch (step) {
//             case 1:
//                 return (
//                     <FormUserDetails
//                         nextStep={this.nextStep}
//                         handleChange={this.handleChange}
//                         values={values}
//                     />
//                 );
//             case 2:
//                 return (
//                     <FormPersonalDetails
//                         nextStep={this.nextStep}
//                         prevStep={this.prevStep}
//                         handleChange={this.handleChange}
//                         values={values}
//                     />
//                 );
//             case 3:
//                 return (
//                     <Confirm
//                         nextStep={this.nextStep}
//                         prevStep={this.prevStep}
//                         values={values}
//                     />
//                 );
//             case 4:
//             // return <Success />;
//                 this.handleSubmit();
//             default:
//                 (console.log('This is a multi-step form built with React.'))
//         }
//     }
// }

// export default UserForm;


// import React, { useState, useEffect } from 'react';
// import FormUserDetails from './FormUserDetails';
// import FormPersonalDetails from './FormPersonalDetails';
// import Confirm from './Confirm';
// import Success from './Success';
// import Dashboard from '../Dashboard/Dashboard';
// import Box from '@mui/material/Box';

// const UserForm = () => {
//     const [userRole, setUserRole] = useState('');
//     useEffect(() => {
//         setUserRole(sessionStorage.getItem('roles'));
//     }, []);
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//         userId: '',
//         userName: '',
//         mobileNumber: '',
//         email: '',
//         city: '',
//         state: '',
//         pin: '',
//         dateOfBirth: '',
//         gender: '',
//         reportingUserId: '',
//         reporterName: '',
//         roles: '',
//         designationId: '',
//         departmentId: '',
//         user_status: '',
//         password: ''
//     });

//     const handleChange = input => e => {
//         setFormData({ ...formData, [input]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (formData.roles !== 'admin') {
//                 throw new Error('Only admins can register new users');
//             }

//             const response = await fetch('http://localhost:5000/api/registerUser', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const res = await response.json();

//             if (response.ok) {
//                 alert("User registration successful");
//             } else {
//                 throw new Error(res.message);
//             }
//         } catch (error) {
//             console.error('Error registering user:', error.message);
//             alert("Error registering user: " + error.message);
//         }
//     };

//     const nextStep = () => {
//         setStep(step + 1);
//     };

//     const prevStep = () => {
//         setStep(step - 1);
//     };
//     return (
//         <Dashboard className='navbar'>
//             <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
//                 {step === 1 && (
//                     <FormUserDetails
//                         nextStep={nextStep}
//                         handleChange={handleChange}
//                         values={formData}
//                     />
//                 )}
//                 {step === 2 && (
//                     <FormPersonalDetails
//                         nextStep={nextStep}
//                         prevStep={prevStep}
//                         handleChange={handleChange}
//                         values={formData}
//                     />
//                 )}
//                 {step === 3 && (
//                     <Confirm
//                         nextStep={nextStep}
//                         prevStep={prevStep}
//                         values={formData}
//                     />
//                 )}
//                 {step === 4 && (
//                     <Success />
//                     // Or return a Success component if you have one
//                 )}
//             </Box>
//         </Dashboard>
//     );
// };
// //     switch (step) {
// //         case 1:
// //             return (
// //                 <FormUserDetails
// //                     nextStep={nextStep}
// //                     handleChange={handleChange}
// //                     values={formData}
// //                 />
// //             );
// //         case 2:
// //             return (
// //                 <FormPersonalDetails
// //                     nextStep={nextStep}
// //                     prevStep={prevStep}
// //                     handleChange={handleChange}
// //                     values={formData}
// //                 />
// //             );
// //         case 3:
// //             return (
// //                 <Confirm
// //                     nextStep={nextStep}
// //                     prevStep={prevStep}
// //                     values={formData}
// //                 />
// //             );
// //         case 4:
// //             handleSubmit();
// //             return (
// //                 <Dashboard className='navbar'>
// //                     <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
// //                         <Success />
// //                     </Box>
// //                 </Dashboard>
// //             );
// //             // Or return a Success component if you have one
// //         default:
// //             return null;
// //     }
// // };

// export default UserForm;


import React, { useState, useEffect } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import Dashboard from '../Dashboard/Dashboard';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserForm = () => {
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
        setUserRole(sessionStorage.getItem('roles'));
    }, []);
    useEffect(() => {
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/login');
        }
    }, [])

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        mobileNumber: '',
        email: '',
        city: '',
        state: '',
        pin: '',
        dateOfBirth: '',
        gender: '',
        reportingUserId: '',
        reporterName: '',
        roles: '',
        designationId: '',
        departmentId: '',
        user_status: '',
        password: ''
    });

    const handleChange = input => e => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const handleSubmit = async () => {
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
                body: JSON.stringify(formData),
            });
            console.log("Successfully sent!")

            const res = await response.json();

            if (response.ok) {
                alert("User registration successful");
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
            alert("Error registering user: " + error.message);
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <>
            <Dashboard className='navbar' />
            <Box component="main" sx={{
                flexGrow: 2, paddingLeft: 15, paddingRight: 15, paddingTop: 20, margin: 'auto', // Center horizontally
                fullWidth:100,
                        maxWidth: 'sm'
            }}>

            
                {step === 1 && (
                    <FormUserDetails
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={formData}
                    />
                )}
                {step === 2 && (
                    <FormPersonalDetails
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={formData}
                    />
                )}
                {step === 3 && (
                    <Confirm
                        nextStep={nextStep}
                        prevStep={prevStep}
                        values={formData}
                        handleSubmit={handleSubmit}
                    />
                )}
                {step === 4 && (
                    // < showDialog && <DialogBox message="User created successfully" onClose={handleCloseDialog} />/>
                    <Success />
                    // Or return a Success component if you have one
                )}
            </Box>

        </>

    );
};

export default UserForm;
