import React, { Component, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';


// Create a theme instance
const theme = createTheme();

export const FormPersonalDetails = (props) => {
    // continue = e => {
    //     e.preventDefault();
    //     this.props.nextStep();
    // };

    // back = e => {
    //     e.preventDefault();
    //     this.props.prevStep();
    // };

    const { values, handleChange, nextStep, prevStep } = props;

    const [designationId, setDesignationId] = useState('');
    const [designation, setDesignation] = useState('');

    const handleDesignationChange = (event) => {
        const selectedDesignationId = event.target.value;
        setDesignationId(selectedDesignationId);
        // Optionally, if you want to update the designation name as well
        const selectedDesignation = event.target.options[event.target.selectedIndex].text;
        setDesignation(selectedDesignation);
    };

    //  handleDesignationChange = (event) => {
    //     const selectedDesignationId = event.target.value;
    //     setDesignationId(selectedDesignationId);
    //     // Optionally, if you want to update the designation name as well
    //     const selectedDesignation = event.target.options[event.target.selectedIndex].text;
    //     setDesignation(selectedDesignation);
    // };
     const handleDepartmentChange = (event) => {
        const selectedDepartmentId = event.target.value;
        setDepartmentId(selectedDepartmentId);
        // Optionally, if you want to update the designation name as well
        const selectedDepartment = event.target.options[event.target.selectedIndex].text;
        setDepartment(selectedDepartment);
    };
    const continueStep = (e) => {
        e.preventDefault();
        nextStep();
    };

    const backStep = (e) => {
        e.preventDefault();
        prevStep();
    };

    
        

        return (
            <MuiThemeProvider theme={theme}>
                <>
                    {/* <Dialog
                        open
                        fullWidth
                        maxWidth='sm'
                    > */}
                        <AppBar title="Enter Personal Details" />
                        <TextField
                            id="gender"
                            select
                            label="Gender"
                            defaultValue={values.gender}
                            onChange={handleChange('gender')}
                            fullWidth
                            required
                        >
                            <MenuItem value="">Select Gender</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </TextField>
                        <br />
                        <TextField
                            id="reportingUserId"
                            label="Reporting User ID"
                            variant="outlined"
                            defaultValue={values.reportingUserId}
                            onChange={handleChange('reportingUserId')}
                            fullWidth
                            required
                        />
                        <br />
                        <TextField
                            id="reporterName"
                            label="Reporter Name"
                            variant="outlined"
                            defaultValue={values.reporterName}
                            onChange={handleChange('reporterName')}
                            fullWidth
                            required
                        />
                        <br />
                        <TextField
                            id="roles"
                            select
                            label="Roles"
                            defaultValue={values.roles}
                            onChange={handleChange('roles')}
                            fullWidth
                            required
                        >
                            <MenuItem value="">Select Role</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </TextField>
                        <br />
                        <TextField
                            id="designation"
                            select
                            label="Designation"
                            defaultValue={values.designationId}
                            onChange={handleDesignationChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="">Select Designation</MenuItem>
                            <MenuItem value="1">Business Administrator</MenuItem>
                            <MenuItem value="2">CEO</MenuItem>
                            <MenuItem value="3">Consultant</MenuItem>
                            <MenuItem value="4">Intern</MenuItem>
                            <MenuItem value="5">Manager</MenuItem>
                            <MenuItem value="6">Senior Associate Consultant</MenuItem>
                            <MenuItem value="7">Senior Consultant</MenuItem>
                            <MenuItem value="8">Solutions Consultant</MenuItem>
                            <MenuItem value="9">Software Engineer</MenuItem>
                            <MenuItem value="10">Solution Enabler</MenuItem>
                            <MenuItem value="11">Senior Software Engineer</MenuItem>
                        </TextField>
                        <br />
                        <TextField
                            id="department"
                            select
                            label="Department"
                            defaultValue={values.departmentId}
                            onChange={handleDepartmentChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="">Select Department</MenuItem>
                            <MenuItem value="1">Administration</MenuItem>
                            <MenuItem value="2">Delivery</MenuItem>
                            <MenuItem value="3">Operations</MenuItem>
                        </TextField>
                        <br />
                        <TextField
                            id="user_status"
                            select
                            label="User Status"
                            defaultValue={values.user_status}
                            onChange={handleChange('user_status')}
                            fullWidth
                            required
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="left">Left</MenuItem>
                        </TextField>
                        <br />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            defaultValue={values.password}
                            onChange={handleChange('password')}
                            fullWidth
                            required
                        />
                        <br />

                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={backStep}
                        >Back</Button>

                        <Button
                            color="primary"
                            variant="contained"
                            onClick={continueStep}
                        >Continue</Button>
                    {/* </Dialog> */}
                </>
            </MuiThemeProvider>
        );
    }


export default FormPersonalDetails;