import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/profile/actions';
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
  LiveHelp,
  ListAlt,
  Share,
  ImportContacts,
  ScreenShare,
} from '@material-ui/icons';
import './Header.css';
import { useLocation } from 'react-router-dom'

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
    display: 'block',
  },
  desktopLink: {
    textDecoration: 'none',
    color: '#545454',
  }
}));

const Header = ({ authState, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDrawerOpen, toggleIsDrawerOpen] = React.useState();

  const navigation = [
    { id: 0, label: 'My List', path: '/my-list', icon: <ListAlt />, requiredAuth: true },
    {
      id: 1,
      label: 'Shared Lists',
      icon: <Share />,
      requiredAuth: true,
      dropdown: [
        { label: 'Shared With Me', icon: <ScreenShare />, path: '/shared-lists', id: 11 },
        { label: 'Share My List', icon: <Share />, path: '/share-my-list', id: 12 },
      ]
    },
    { id: 2, label: 'FAQs', path: '/faq', icon: <LiveHelp />, requiredAuth: false },
    { id: 3, label: 'Quick Recs', path: '/quick-recommendations', icon: <ImportContacts />, requiredAuth: false },
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
    logout();
  };

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    toggleIsDrawerOpen(!isDrawerOpen);
  };

  const getCurrentTab = (pathname) => {
    switch(pathname) {
      case '/my-list':
        return 0;
      case '/faq':
        return 2;
      case '/share-my-list':
        return 1;
      case '/shared-lists':
        return 1;
      case '/quick-recommendations':
        return 3;
      default:
        return 100;
    }
  };

  const { pathname } = useLocation();
  const currentTab = getCurrentTab(pathname);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Drawer className="page-container" anchor="left" open={isDrawerOpen} onClose={(event) => toggleDrawer(event)}>
          <List>
            {navigation.map((nav, index) => (!nav.requiredAuth || (nav.requiredAuth && authState !== 'signIn')) && !nav.dropdown ? (
              <Link
                key={`nav-${nav.path}-${index}`}
                to={nav.path ? nav.path : ''}
                className={classes.navLink}
                onClick={(event) => { toggleDrawer(event); }}
              >
                <ListItem button key={nav.label}>
                  <ListItemIcon>{nav.icon}</ListItemIcon>
                  <ListItemText primary={nav.label} />
                </ListItem>
              </Link>
            ) : (<div key={`nav-${nav.path}-${index}`} />)
            )}
            {authState === 'signedIn' && (
              <>
                <Link
                  to="/shared-lists"
                  className={classes.navLink}
                  onClick={(event) => { toggleDrawer(event); }}
                >
                  <ListItem button>
                    <ListItemIcon><Share /></ListItemIcon>
                    <ListItemText primary="Lists Shared With Me" />
                  </ListItem>
                </Link>
                <Link
                  to="/share-my-list"
                  className={classes.navLink}
                  onClick={(event) => { toggleDrawer(event); }}
                >
                  <ListItem button>
                    <ListItemIcon><ScreenShare /></ListItemIcon>
                    <ListItemText primary="Share My List" />
                  </ListItem>
                </Link>
              </>
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
          <Link
            className="logo-container"
            to="/"
            style={{ textDecoration: 'none', fontSize: '1.5em' }}
          >
            <img
              src={require("../img/pc-logo.png")}
              alt="pair-card logo"
              style={{ maxWidth: '150px' }}
            />
          </Link>

          <div className="nav-wrapper">
            {navigation.map((nav, index) => (!nav.requiredAuth || (nav.requiredAuth && authState !== 'signIn')) ? (
              <div key={`wrapper-${nav.path}-${index}`} className="nav-item-wrapper">
                <Link
                  to={nav.path}
                  className={`${classes.desktopLink} ${currentTab === nav.id ? 'active' : ''}`}
                  onClick={(event) => { nav.dropdown && handleMenu(event) }}
                  aria-controls={nav.dropdown ? 'menu-dropdown' : ''}
                  aria-haspopup={nav.dropdown ? 'true' : 'false'}
                >
                  {nav.label}
                </Link>
                {nav.dropdown && (
                  <Menu
                    id="menu-dropdown"
                    anchorEl={anchorEl}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    {nav.dropdown.map((item) => (
                      <MenuItem key={item.id} onClick={handleClose}>
                        <Link to={item.path} className={classes.navLink}>
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>
            ) : (null)
            )}
          </div>

          {authState === 'signIn' && (
            <Link to="/login" style={{ textDecoration: 'none' }}>
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
              component={Link}
              to="/profile"
            >
              <AccountCircle style={{ color: '#226d77' }} />
            </IconButton>
            {/*<Menu
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
            </Menu>*/}

            <IconButton
              aria-label="log out"
              color="inherit"
              onClick={() => { handleSignOut() }}
            >
              <ExitToApp style={{ color: '#226d77' }} />
            </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => {
  return {
    logout: (attributes) => dispatch(ActionCreators.logout(attributes)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);