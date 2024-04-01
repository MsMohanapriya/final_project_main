import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import Toolbar from '@mui/material/Toolbar';
import AddDeleteTableRows from '../add-delete-table-rows/AddDeleteTableRows';
import { Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
const drawerWidth = 180;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
  <div class="bg-white">
    <div id="sidebar" class="sidebar hide">
        <Box style={{color:"white"}}
    >
      <div style={{marginTop:'10%',marginLeft:'10%'}}> <img  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAABHNCSVQICAgIfAhkiAAAAjZJREFUSEu1lj1IHFEUhR2wEIloYSGCsChEJAYTAoqCGDAoBCL+BBLSWRqEVBY2Foq9naWVkDpCGlEECy0UTGxcjPiDxSYkFlkhFsL6HXm7mHVn3nV298Jlduedc7+5b97Mm6CixJHJZBKUHCL7yA4yEZSKQfE6ak2Tk/k1SwIB8JTCK2RtoYsuGgKgh8JLYQBBi4IAeEKNz1GAUkCWKdLpu6+xO6GLYYrP+wBFdQJE0/S4bBAANRRftQBidwLkOeaFckNGAUyUG/IBgNIUsVYX0/WO6kpTxIW8pfqYiRD3iaeTEbx6TkwRt5M3VFeaIi7kNdWVpgho/Z9TnnL8Qi4HQfAtyo1nkPEBE0H3BMOvAuKvnJsBdlaoEJ5XnO9/COQoRPyX8xOAtvPHgbzknNIU6mTPo1RHmsZc4Onlj9IUgmx6lGnGPwE6zOrwdPNbO6IpBNH8++InkPE7EG1UXT5TdlwQ7c/VBsMioA3p8LzgoLREWpAplK0G9RmQWQd5xlFpiZQgej3oQ8wSc4Au8LQj1meQJZKCNKD8aFGjWQJyjKeN30pLrN2+VjC959BkcKwD2UWvvd2yv/9Bv5WFNGLS96svdjDtAGlG2OITM76NPp17QTqj1n9UfMe0jzaBSBkVB2hTEvz3FnY3VFcZFkmMSQPkHN2PbJF7r3q3EMJu6jHmEw8k10EoxC2EKjcdWnl34yQCoqnR+FX+NERuWlxxJYZ68pHLlObZdasLuHT5m/PXYXN8A0QF5eZCS3rAAAAAAElFTkSuQmCC' alt='-'></img> </div>
      <List >
       
        {['Dashboard', 'Timesheet', 'Leave', 'Work From Home','Feedback','Survey','Service Desks','Forms','Travel','Expenses','Resourcesing'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider style={{backgroundColor:'white'}} />
      <List>
        {['Username'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
            <ListItemText primary={text} />
              <ListItemIcon>
                {index % 2 === 0 ? <LoginIcon style={{color:'white'}} /> : <MailIcon />}
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div style={{backgroundColor:'#561560',minHeight:'30%'}} >

      </div>
    </Box>
    </div>
  </div>

  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor:"white"}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{backgroundColor:"white",minHeight:'50px',margin: '0px !important'}}>
          <IconButton
            color="#19105B"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div" color="#19105B  " style={{fontWeight:"bold",paddingTop:"1%"}}>
            Timesheet
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        //  sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <AddDeleteTableRows/>
      </Box>
    </Box>
  );
}



export default ResponsiveDrawer;
