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
import UnauthSharedList from '../pages/UnauthSharedList/UnauthSharedList';
// import App from '../NotesTest';

export default function Content({authState, onStateChange}) {
  const isLoggedIn = authState === 'signedIn';
  const params = new URLSearchParams(window.location.search);
  let id;
  let name;

  if (params && params.has('id') && params.get('name')) {
    id = params.get('id');
    name = params.get('name');
  }

  function UnauthorizedPage() {
    return <Unauthorized onStateChange={onStateChange} />
  }

  console.log(id);
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
          {
            isLoggedIn ?
            <SharedLists /> :
            (id ? <UnauthSharedList id={id} name={name} /> : <UnauthorizedPage />)
          }
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
