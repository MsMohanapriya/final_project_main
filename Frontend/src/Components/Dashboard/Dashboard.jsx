
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMemo, useState, useEffect } from 'react';
import SideList from './SideList';
import { Brightness2, Palette } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { Tooltip } from 'primereact/tooltip';
import HomePage from '../Login/Home';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import AppBar from '@mui/material/AppBar';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, []);

    const [open, setOpen] = useState(true);
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(1);
    const settings = ['Profile', 'Logout'];
    // const [dark, setDark] = useState(true);


    // const darkTheme = useMemo(() => createTheme({
    //     Palette: {
    //         mode: dark ? 'dark' : 'light'
    // }
    // }), [dark])


    // const handleOpenUserMenu = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // };
    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
   
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (



        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: '#19105B' }} position="fixed" open={open}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Tooltip title="Go back to home page">
                        <IconButton sx={{ mr: 1 }} onClick={() => navigate('home')}>

                            <HomePage />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAABHNCSVQICAgIfAhkiAAAAjZJREFUSEu1lj1IHFEUhR2wEIloYSGCsChEJAYTAoqCGDAoBCL+BBLSWRqEVBY2Foq9naWVkDpCGlEECy0UTGxcjPiDxSYkFlkhFsL6HXm7mHVn3nV298Jlduedc7+5b97Mm6CixJHJZBKUHCL7yA4yEZSKQfE6ak2Tk/k1SwIB8JTCK2RtoYsuGgKgh8JLYQBBi4IAeEKNz1GAUkCWKdLpu6+xO6GLYYrP+wBFdQJE0/S4bBAANRRftQBidwLkOeaFckNGAUyUG/IBgNIUsVYX0/WO6kpTxIW8pfqYiRD3iaeTEbx6TkwRt5M3VFeaIi7kNdWVpgho/Z9TnnL8Qi4HQfAtyo1nkPEBE0H3BMOvAuKvnJsBdlaoEJ5XnO9/COQoRPyX8xOAtvPHgbzknNIU6mTPo1RHmsZc4Onlj9IUgmx6lGnGPwE6zOrwdPNbO6IpBNH8++InkPE7EG1UXT5TdlwQ7c/VBsMioA3p8LzgoLREWpAplK0G9RmQWQd5xlFpiZQgej3oQ8wSc4Au8LQj1meQJZKCNKD8aFGjWQJyjKeN30pLrN2+VjC959BkcKwD2UWvvd2yv/9Bv5WFNGLS96svdjDtAGlG2OITM76NPp17QTqj1n9UfMe0jzaBSBkVB2hTEvz3FnY3VFcZFkmMSQPkHN2PbJF7r3q3EMJu6jHmEw8k10EoxC2EKjcdWnl34yQCoqnR+FX+NERuWlxxJYZ68pHLlObZdasLuHT5m/PXYXN8A0QF5eZCS3rAAAAAAElFTkSuQmCC' alt='-' style={{ marginRight: '8px' }} />
                        NewZone
                    </Typography>
                   
                    {/* <IconButton onClick={()=> setDark(!dark)}>
                            {dark ? <Brightness2 /> : <Brightness4 />}
                        </IconButton> */}
                    
                </Toolbar>
            </AppBar>
            
            <SideList {...{ open, setOpen }} />
        </Box>

    );
}
export default Dashboard;