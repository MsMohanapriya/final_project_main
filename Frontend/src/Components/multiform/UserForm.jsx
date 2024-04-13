


import React, { useState, useEffect } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import Dashboard from '../Dashboard/Dashboard';
import Box from '@mui/material/Box';

import 'react-toastify/dist/ReactToastify.css';


const UserForm = () => {
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
        setUserRole(sessionStorage.getItem('roles'));
    }, []);
    useEffect(() => {
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/');
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
