import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Link,
} from "react-router-dom";
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Home,
  Info,
  ListAlt,
  Share,
  ImportContacts,
  Person,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
    color: '#545454',
    marginBottom: '2px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    maxWidth: '100px',
    margin: 'auto'
  },
  navLink: {
    textDecoration: 'none',
    color: '#545454',
    paddingRight: '30px',
  },
}));

export default function Header({authState}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isDrawerOpen, toggleIsDrawerOpen] = React.useState();

  const navigation = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'My List', path: '/my-list', icon: <ListAlt /> },
    { label: 'Shared Lists', path: '/shared-lists', icon: <Share /> },
    { label: 'About', path: '/about', icon: <Info /> },
    { label: 'Resources', path: '/resources', icon: <ImportContacts /> },
    { label: 'Profile', path: '/profile', icon: <Person /> },
  ]

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    toggleIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Drawer anchor="left" open={isDrawerOpen} onClose={(event) => toggleDrawer(event)}>
          <List>
            {navigation.map((nav, index) => (
              <Link key={nav.path} to={nav.path} className={classes.navLink} onClick={(event) => toggleDrawer(event)}>
                <ListItem button key={nav.label}>
                  <ListItemIcon>{nav.icon}</ListItemIcon>
                  <ListItemText primary={nav.label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={(event) => toggleDrawer(event)}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <a className={classes.title} href="/">
            <img
              src={require("../img/paircare-logo-color.png")}
              alt="pair-care logo"
              style={{ maxWidth: '100px' }}
            />
          </a>
          {authState !== 'signIn' && (<div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/profile" className={classes.navLink}>
                  Profile
                </Link>
              </MenuItem>
            </Menu>

            <IconButton
              aria-label="log out"
              color="inherit"
              onClick={() => {Auth.signOut()}}
            >
              <ExitToApp />
            </IconButton>
          </div>
        )}
        </Toolbar>
      </AppBar>
    </div>
  );
}