import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme();

// In your render method



export class Success extends Component {
    continue = e => {
        e.preventDefault();
        // PROCESS FORM //
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <>
                    {/* <Dialog
                        open
                        fullWidth
                        maxWidth='sm'
                    > */}
                        <AppBar title="Success" />
                        <h1>Thank You For Your Submission</h1>
                        <p>You will get an email with further instructions.</p>
                    {/* </Dialog> */}
                </>
            </MuiThemeProvider>
        );
    }
}

export default Success;