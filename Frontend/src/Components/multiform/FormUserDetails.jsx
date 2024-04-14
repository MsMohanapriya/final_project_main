import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme();



export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            // >
                <>
                    {/* <Dialog
                        open
                        fullWidth
                        maxWidth='sm'
                    > */}
                        <AppBar title="Enter User Details" />
                <div style={{ margin: '20px' }}>
                    <TextField
                        placeholder="Enter User ID"
                        label="User ID"
                        onChange={handleChange('userId')}
                        defaultValue={values.user_id}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        placeholder="Enter User Name"
                        label="User Name"
                        onChange={handleChange('userName')}
                        defaultValue={values.userName}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        id="mobileNumber"
                        label="Mobile Number"
                        variant="outlined"
                        value={values.mobileNumber}
                        onChange={handleChange('mobileNumber')}
                        required
                        fullWidth
                        type="text"
                        inputProps={{
                            maxLength: 10, // Limiting the input to 10 characters for mobile number
                        }}
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        placeholder="Enter Your Email"
                        label="Email"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        defaultValue={values.city}
                        onChange={handleChange('city')}
                        required
                        fullWidth
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        id="state"
                        label="State"
                        variant="outlined"
                        defaultValue={values.state}
                        onChange={handleChange('state')}
                        required
                        fullWidth
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        id="pin"
                        label="PIN"
                        variant="outlined"
                        defaultValue={values.pin}
                        onChange={handleChange('pin')}
                        required
                        fullWidth
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        id="dateOfBirth"
                        label="Date of Birth"
                        variant="outlined"
                        type="date"
                        defaultValue={values.dateOfBirth}
                        onChange={handleChange('dateOfBirth')}
                        required
                        fullWidth
                    />
                </div>
                <div style={{ margin: '20px' }}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.continue}
                    >
                        Continue
                    </Button>
                </div>
                </>
            // </MuiThemeProvider>
        );
    }
}

export default FormUserDetails;