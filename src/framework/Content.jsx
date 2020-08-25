import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Unauthorized from '../pages/unauthorized/unauthorized';
import Login from '../pages/auth/login';
import Registration from '../pages/auth/registration/registration';
import MyLists from '../pages/my-lists/MyLists';
import Profile from '../pages/Profile/Profile';
import ForgotPassword from '../pages/auth/forgotPassword/forgotPassword';

export default function Content({authState, onStateChange}) {
  const isLoggedIn = authState === 'signedIn';
  function UnauthorizedPage() {
    return <Unauthorized onStateChange={onStateChange} />
  }

  return (
    <>
      <Switch>
        <Route path="/login">
          {isLoggedIn ? <MyLists /> : <Login /> }
        </Route>

        <Route path="/register">
          {isLoggedIn ? <MyLists /> : <Registration /> }
        </Route>

        <Route path="/forgot-password">
          {isLoggedIn ? <MyLists /> : <ForgotPassword /> }
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/shared-lists">
          {isLoggedIn ? <SharedList /> : <UnauthorizedPage /> }
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

function SharedList() {
  return <h1>Shared Lists</h1>;
}

function Resources() {
  return <h1>Resources</h1>;
}