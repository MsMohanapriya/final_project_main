// import React, { Component } from 'react';
// import Dialog from '@mui/material/Dialog';
// import AppBar from '@mui/material/AppBar';
// import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// import { createTheme } from '@mui/material/styles';

// // Create a theme instance
// const theme = createTheme();



// export class FormUserDetails extends Component {
//     continue = e => {
//         e.preventDefault();
//         this.props.nextStep();
//     };

//     render() {
//         const { values, handleChange } = this.props;
//         return (
//             // >
//                 <>
//                     {/* <Dialog
//                         open
//                         fullWidth
//                         maxWidth='sm'
//                     > */}
//                         <AppBar title="Enter User Details" />
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         placeholder="Enter User ID"
//                         label="User ID"
//                         onChange={handleChange('userId')}
//                         defaultValue={values.user_id}
//                         margin="normal"
//                         fullWidth
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         placeholder="Enter User Name"
//                         label="User Name"
//                         onChange={handleChange('userName')}
//                         defaultValue={values.userName}
//                         margin="normal"
//                         fullWidth
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         id="mobileNumber"
//                         label="Mobile Number"
//                         variant="outlined"
//                         value={values.mobileNumber}
//                         onChange={handleChange('mobileNumber')}
//                         required
//                         fullWidth
//                         type="text"
//                         inputProps={{
//                             maxLength: 10, // Limiting the input to 10 characters for mobile number
//                         }}
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         placeholder="Enter Your Email"
//                         label="Email"
//                         onChange={handleChange('email')}
//                         defaultValue={values.email}
//                         margin="normal"
//                         fullWidth
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         id="city"
//                         label="City"
//                         variant="outlined"
//                         defaultValue={values.city}
//                         onChange={handleChange('city')}
//                         required
//                         fullWidth
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         id="state"
//                         label="State"
//                         variant="outlined"
//                         defaultValue={values.state}
//                         onChange={handleChange('state')}
//                         required
//                         fullWidth
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         id="pin"
//                         label="PIN"
//                         variant="outlined"
//                         defaultValue={values.pin}
//                         onChange={handleChange('pin')}
//                         required
//                         fullWidth
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <TextField
//                         id="dateOfBirth"
//                         label="Date of Birth"
//                         variant="outlined"
//                         type="date"
//                         defaultValue={values.dateOfBirth}
//                         onChange={handleChange('dateOfBirth')}
//                         required
//                         fullWidth
//                     />
//                 </div>
//                 <div style={{ margin: '20px' }}>
//                     <Button
//                         color="primary"
//                         variant="contained"
//                         onClick={this.continue}
//                     >
//                         Continue
//                     </Button>
//                 </div>
//                 </>
//             // </MuiThemeProvider>
//         );
//     }
// }

// export default FormUserDetails;

import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };



    areRequiredFieldsFilled = () => {
        const { values } = this.props;
        return (
            values.userId &&
            values.userName &&
            values.mobileNumber &&
            values.email &&
            values.city &&
            values.state &&
            values.pin &&
            values.dateOfBirth
        );
    };

    render() {
        const { values, handleChange } = this.props;
        const allFieldsFilled = this.areRequiredFieldsFilled();

        return (
            <>
                <AppBar title="Enter User Details" style={{ marginBottom: '20px' }} />
                <div style={{ fontFamily: 'Caudex, sans-serif', width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
                    <TextField
                        placeholder="Enter User ID"
                        label="User ID"
                        onChange={handleChange('userId')}
                        defaultValue={values.user_id}
                        margin="normal"
                        required
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        placeholder="Enter User Name"
                        label="User Name"
                        onChange={handleChange('userName')}
                        defaultValue={values.userName}
                        margin="normal"
                        fullWidth
                        required
                        style={{ marginBottom: '20px' }}
                    />
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
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        placeholder="Enter Your Email"
                        label="Email"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                        margin="normal"
                        required
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        defaultValue={values.city}
                        onChange={handleChange('city')}
                        required
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        id="state"
                        label="State"
                        variant="outlined"
                        defaultValue={values.state}
                        onChange={handleChange('state')}
                        required
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        id="pin"
                        label="PIN"
                        variant="outlined"
                        defaultValue={values.pin}
                        onChange={handleChange('pin')}
                        required
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        id="dateOfBirth"
                        label="Date of Birth"
                        variant="outlined"
                        type="date"
                        defaultValue={values.dateOfBirth}
                        onChange={handleChange('dateOfBirth')}
                        required
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                   

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.continue}
                        disabled={!allFieldsFilled} // Disable button if any required field is empty
                        style={{ width: '100%', padding: '10px', backgroundColor: '#19105b', color: '#ffffff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                    >
                        Continue
                    </Button>
                </div>
            </>
        );
    }
}

export default FormUserDetails;
