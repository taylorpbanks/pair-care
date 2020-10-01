import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Unauthorized from '../pages/unauthorized/unauthorized';
import Login from '../pages/auth/login';
import Registration from '../pages/auth/registration/registration';
import MyLists from '../pages/Lists/MyLists';
import Profile from '../pages/Profile/Profile';
import ShareMyList from '../pages/ShareList/ShareMyList';
import SharedLists from '../pages/ShareList/SharedLists';
import ForgotPassword from '../pages/auth/forgotPassword/forgotPassword';
import ChangePassword from '../pages/Profile/ChangePassword';
// import App from '../NotesTest';

export default function Content({authState, onStateChange}) {
  const isLoggedIn = authState === 'signedIn';
  function UnauthorizedPage() {
    return <Unauthorized onStateChange={onStateChange} />
  }

  return (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Registration />
        </Route>

        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/shared-lists">
          {isLoggedIn ? <SharedLists /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/resources">
          <Resources />
        </Route>

        <Route path="/profile">
          {isLoggedIn ? <Profile /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/my-list">
          {isLoggedIn ? <MyLists /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/change-password">
          {isLoggedIn ? <ChangePassword /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/share-my-list">
          {isLoggedIn ? <ShareMyList /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/">
          {isLoggedIn ? <MyLists /> : <UnauthorizedPage /> }
        </Route>
      </Switch>
    </>
  );
}

function About() {
  return <h1>About</h1>;
}

function Resources() {
  return <h1>Resources</h1>;
}
