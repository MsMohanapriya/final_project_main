import { React, useEffect,useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import ForumSharpIcon from '@mui/icons-material/ForumSharp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import AssignmentIndSharpIcon from '@mui/icons-material/AssignmentIndSharp';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const SideList = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const [showing, setShowing] = useState([]);
    useEffect(() => {
        // Side effect code here
        const roles = sessionStorage.getItem('roles');
        const user = ['Dashboard', 'Timesheet', 'Feedback', ];
        const admin = ['Dashboard', 'Timesheet', 'CreateUser', 'CreateProject', 'AllocateProject', 'CreateFeedback'];
        if (roles === "admin")
            setShowing(admin);
        else
            setShowing(user);
    }, []);

  return (
      <>
          
          <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                  <IconButton onClick={()=>setOpen(false)}>
                       <ChevronLeftIcon />
                  </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                  {showing.map((text, index) => (
                      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                              sx={{
                                  minHeight: 48,
                                  justifyContent: open ? 'initial' : 'center',
                                  px: 2.5,
                              }}
                          component={Link} to={`/${text.toLowerCase()}`}
                          >
                              <ListItemIcon
                                  sx={{
                                      minWidth: 0,
                                      mr: open ? 3 : 'auto',
                                      justifyContent: 'center',
                                  }}
                              >
                                  {text === 'Dashboard' && <DashboardIcon />}
                                  {text === 'Timesheet' && <TimelineIcon />}
                                  {text === 'CreateFeedback' && <ForumSharpIcon />}
                                  {text === 'CreateUser' && <PersonAddAltSharpIcon />}
                                  {text === 'AllocateProject' && <AssignmentIndSharpIcon />}
                                  {text === 'CreateProject' && <PlaylistAddSharpIcon />}
                                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                              </ListItemIcon>
                              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                      </ListItem>
                  ))}
              </List>
              <Divider />
              {/* <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                              sx={{
                                  minHeight: 48,
                                  justifyContent: open ? 'initial' : 'center',
                                  px: 2.5,
                              }}
                          >
                              <ListItemIcon
                                  sx={{
                                      minWidth: 0,
                                      mr: open ? 3 : 'auto',
                                      justifyContent: 'center',
                                  }}
                              >
                                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                              </ListItemIcon>
                              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                             
                          </ListItemButton>
                         
                      </ListItem>
                      
                  ))}
              </List> */}
              <>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                          sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                          }}
                          onClick={() => navigate("/login")} // Attach onClick handler to the ListItemButton
                      >
                          <ListItemIcon
                              sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : 'auto',
                                  justifyContent: 'center',
                              }}
                          >
                              <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                  </ListItem>
              </>
          </Drawer>
          {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader /> */}
              {/* <Typography paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                  enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                  imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                  Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                  Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                  adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                  nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                  leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                  feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                  consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                  sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                  Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                  eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                  neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                  sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                  tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                  gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                  et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                  tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                  eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                  posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography> */}
          {/* </Box> */}
      </>
  )
}

export default SideList;