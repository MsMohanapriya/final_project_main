import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import LoginIcon from '@mui/icons-material/Login';

export default function TemporaryDrawer({ state, setstate, toggleDrawer }) {
  const [showing, setShowing] = useState([]);
  useEffect(() => {
    // Side effect code here
    const role = sessionStorage.getItem('role');
    if (role === "admin")
      setShowing(admin);
    else
      setShowing(user);
  }, []);

  const user = ['Dashboard', 'Timesheet', 'Feedback', 'Logout'];
  const admin = ['Dashboard', 'Timesheet', 'CreateUser', 'CreateProject', 'AllocateProject', 'CreateFeedback', 'Logout'];
  const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName'));

  const list = (anchor) => (
    <div className='sidebar'>
      <Box style={{ color: 'white' }}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200 }}
        // sx={{
        //   color: 'white',
        //   width: 'auto',
        //   // Set the height to 100vh when the screen is large (static sidebar)
        //   height: '100vh',
        //   // Set the height to auto when the screen is small (responsive sidebar)
        //   '@media (max-width: 768px)': {
        //     height: 'auto',
        //   },
        // }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div style={{ marginTop: '10%', marginLeft: '10%' }}>
          <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAABHNCSVQICAgIfAhkiAAAAjZJREFUSEu1lj1IHFEUhR2wEIloYSGCsChEJAYTAoqCGDAoBCL+BBLSWRqEVBY2Foq9naWVkDpCGlEECy0UTGxcjPiDxSYkFlkhFsL6HXm7mHVn3nV298Jlduedc7+5b97Mm6CixJHJZBKUHCL7yA4yEZSKQfE6ak2Tk/k1SwIB8JTCK2RtoYsuGgKgh8JLYQBBi4IAeEKNz1GAUkCWKdLpu6+xO6GLYYrP+wBFdQJE0/S4bBAANRRftQBidwLkOeaFckNGAUyUG/IBgNIUsVYX0/WO6kpTxIW8pfqYiRD3iaeTEbx6TkwRt5M3VFeaIi7kNdWVpgho/Z9TnnL8Qi4HQfAtyo1nkPEBE0H3BMOvAuKvnJsBdlaoEJ5XnO9/COQoRPyX8xOAtvPHgbzknNIU6mTPo1RHmsZc4Onlj9IUgmx6lGnGPwE6zOrwdPNbO6IpBNH8++InkPE7EG1UXT5TdlwQ7c/VBsMioA3p8LzgoLREWpAplK0G9RmQWQd5xlFpiZQgej3oQ8wSc4Au8LQj1meQJZKCNKD8aFGjWQJyjKeN30pLrN2+VjC959BkcKwD2UWvvd2yv/9Bv5WFNGLS96svdjDtAGlG2OITM76NPp17QTqj1n9UfMe0jzaBSBkVB2hTEvz3FnY3VFcZFkmMSQPkHN2PbJF7r3q3EMJu6jHmEw8k10EoxC2EKjcdWnl34yQCoqnR+FX+NERuWlxxJYZ68pHLlObZdasLuHT5m/PXYXN8A0QF5eZCS3rAAAAAAElFTkSuQmCC' alt='-'></img> </div>
        <List>
          {showing.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider style={{ backgroundColor: 'white' }} />
        <List>
          {['Username'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  {index % 2 === 0 ? <LoginIcon style={{ color: 'white' }} /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={sessionStorage.getItem('firstname')} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div style={{ backgroundColor: '#561560', minHeight: '30%' }} ></div>
      </Box>
    </div>
  );

  return (
    <div >
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}


// // TemporaryDrawer.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
// import LoginIcon from '@mui/icons-material/Login';

// const TemporaryDrawer = ({ state, setState, toggleDrawer, role }) => {
//   const [showing, setShowing] = useState([]);

//   useEffect(() => {
//     if (role === 'admin') {
//       setShowing(['Dashboard', 'Timesheet', 'CreateUser', 'CreateProject', 'AllocateProject', 'CreateFeedback', 'Logout']);
//     } else {
//       setShowing(['Dashboard', 'Timesheet', 'Feedback', 'Logout']);
//     }
//   }, [role]);

//   return (
//     <div>
//       {['left'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
//             <div role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
//               <Box sx={{ width: 240 }}>
//                 <List>
//                   {showing.map((text, index) => (
//                     <ListItem key={text} disablePadding>
//                       <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
//                         <ListItemText primary={text} />
//                       </ListItemButton>
//                     </ListItem>
//                   ))}
//                 </List>
//                 <Divider />
//                 <List>
//                   <ListItem disablePadding>
//                     <ListItemButton component={Link} to="/login">
//                       <ListItemIcon>
//                         <LoginIcon />
//                       </ListItemIcon>
//                       <ListItemText primary={sessionStorage.getItem('firstName')} />
//                     </ListItemButton>
//                   </ListItem>
//                 </List>
//               </Box>
//             </div>
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default TemporaryDrawer;
