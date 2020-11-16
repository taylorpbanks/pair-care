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
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Info,
  ListAlt,
  Share,
  ImportContacts,
} from '@material-ui/icons';
import './Header.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
    color: '#545454',
    marginBottom: '2px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#545454',
    paddingRight: '30px',
  },
  desktopLink: {
    textDecoration: 'none',
    color: '#545454',
  }
}));

export default function Header({authState}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const open = Boolean(anchorEl);
  const [isDrawerOpen, toggleIsDrawerOpen] = React.useState();

  const navigation = [
    { id: 0, label: 'My List', path: '/my-list', icon: <ListAlt />, requiredAuth: true },
    { id: 1, label: 'Shared Lists', path: '/shared-lists', icon: <Share />, requiredAuth: true },
    { id: 2, label: 'About', path: '/about', icon: <Info />, requiredAuth: false },
    { id: 3, label: 'Resources', path: '/resources', icon: <ImportContacts />, requiredAuth: false },
  ]

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    Auth.signOut();
    localStorage.clear();
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
            {navigation.map((nav, index) => (!nav.requiredAuth || (nav.requiredAuth && authState !== 'signIn')) ? (
              <Link
                key={`nav-${nav.path}-${index}`}
                to={nav.path}
                className={classes.navLink}
                onClick={(event) => {toggleDrawer(event);setSelectedTab(nav.id);}}
              >
                <ListItem button key={nav.label}>
                  <ListItemIcon>{nav.icon}</ListItemIcon>
                  <ListItemText primary={nav.label} />
                </ListItem>
              </Link>
              ) : (<div/>)
            )}
          </List>
        </Drawer>
        <Toolbar>
          <IconButton
            className="mobile-menu"
            edge="start"
            onClick={(event) => toggleDrawer(event)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <a className="logo-container" href="/" style={{textDecoration: 'none', fontSize: '1.5em'}}>
            <img
              src={require("../img/pc-logo.png")}
              alt="pair-card logo"
              style={{maxWidth: '150px'}}
            />
          </a>

          <div className="nav-wrapper">
            {navigation.map((nav, index) => (!nav.requiredAuth || (nav.requiredAuth && authState !== 'signIn')) ? (
              <div key={`wrapper-${nav.path}-${index}`} className="nav-item-wrapper">
                <Link
                  to={nav.path}
                  className={`${classes.desktopLink} ${selectedTab === nav.id ? 'active' : ''}`}
                  onClick={(event) => {setSelectedTab(nav.id);}}
                >
                  {nav.label}
                </Link>
              </div>
              ) : (null)
            )}
          </div>

          {authState === 'signIn' && (
          <Link to="/login" style={{textDecoration: 'none'}}>
            <Button
              style={{ borderRadius: '50px', color: 'white' }}
              size="small"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            </Link>
          )}
          {authState !== 'signIn' && (<div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle style={{color: '#226d77'}} />
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
                <Link to="/profile" className={classes.navLink} onClick={(event) => {setSelectedTab(null);}}>
                  Profile
                </Link>
              </MenuItem>
            </Menu>

            <IconButton
              aria-label="log out"
              color="inherit"
              onClick={() => {handleSignOut()}}
            >
              <ExitToApp style={{color: '#226d77'}} />
            </IconButton>
          </div>
        )}
        </Toolbar>
      </AppBar>
    </div>
  );
}