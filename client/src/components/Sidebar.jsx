import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Home, PostAdd, Settings, Help, AccountCircle, Login, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Stats from '@mui/icons-material/BarChart';
import logo from '../assets/logo.png';

const Sidebar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Logo en haut */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
        <img src={logo} alt="Logo" style={{ width: '50%', height: 'auto' }} />
      </Box>

      {/* Liste des menus */}
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/create-post">
          <ListItemIcon><PostAdd /></ListItemIcon>
          <ListItemText primary="Create Post" />
        </ListItem>
        <ListItem button component={Link} to="/my-posts">
          <ListItemIcon><PostAdd /></ListItemIcon>
          <ListItemText primary="My Posts" />
        </ListItem>
        <ListItem button component={Link} to="/stats">
          <ListItemIcon><Stats /></ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/support">
          <ListItemIcon><Help /></ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
        <Divider />
        {user ? (
          <>
            <ListItem button onClick={handleMenuClick}>
              <ListItemIcon>
                <Avatar src={user.avatar} alt={user.name} />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItem>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/subscription">Change Subscription</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/profile">Change Profile</MenuItem>
              <MenuItem onClick={() => { handleClose(); onLogout(); }}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemIcon><Login /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
