import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { List, ListItem, ListItemText } from '@mui/material/';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme();

export class Confirm extends Component {
    // continue = e => {
    //     e.preventDefault();
    //     // PROCESS FORM //
    //     this.props.nextStep();
    // };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {
            values: { userId,
                userName,
                mobileNumber,
                email,
                city,
                state,
                pin,
                dateOfBirth,
                gender,
                reportingUserId,
                reporterName,
                roles,
                designationId,
                departmentId,
                user_status,
                password }
        } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <>
                    {/* <Dialog
                        open
                        fullWidth
                        maxWidth='sm'
                    > */}
                        <AppBar title="Confirm User Data" />
                        <List>
                            <ListItem>
                                <ListItemText primary="User ID" secondary={userId} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="User Name" secondary={userName} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Mobile Number" secondary={mobileNumber} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email" secondary={email} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="City" secondary={city} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="State" secondary={state} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="PIN" secondary={pin} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Date of Birth" secondary={dateOfBirth} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Gender" secondary={gender} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Reporting User ID" secondary={reportingUserId} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Reporter Name" secondary={reporterName} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Roles" secondary={roles} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Designation ID" secondary={designationId} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Department ID" secondary={departmentId} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="User Status" secondary={user_status} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Password" secondary={password} />
                            </ListItem>

                        </List>
                        <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={this.back}
                            style={{ padding: '10px', backgroundColor: '#FF6196', color: '#ffffff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                        >Back</Button>

                        <Button
                            color="primary"
                            variant="contained"
                            style={{ padding: '10px', backgroundColor: '#19105b', color: '#ffffff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                            onClick={(e) => {
                                e.preventDefault()
                                console.log(e)
                                // this.continue(e);
                                this.props.handleSubmit();
                            }}
                        >Submit</Button>
                        </div>
                    {/* </Dialog> */}
                </>
            </MuiThemeProvider>
        );
    }
}

export default Confirm;