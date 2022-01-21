import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Unauthorized from '../pages/unauthorized/unauthorized';
import Login from '../pages/auth/login';
import Registration from '../pages/auth/registration/registration';
import MyLists from '../pages/lists/my-lists';
import MyListsV2 from '../pages/v2/v2-lists/my-lists';
import Journey from '../pages/v2/journey/landing';
import Profile from '../pages/profile/profile';
import ShareMyList from '../pages/share-my-list/share-my-list';
import SharedLists from '../pages/view-shared-lists/shared-lists';
import ForgotPassword from '../pages/auth/forgot-password/forgot-password';
import ChangePassword from '../pages/profile/change-password';
import UnauthSharedList from '../pages/unauth-shared-list/unauth-shared-list';
import FAQ from '../pages/faq/faq';
import QuickRecs from '../pages/quick-recs/quick-recs';
import Splash from '../pages/splash/index';
import BlogList from '../pages/blog/index';
import Post from '../pages/blog/post';
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

        <Route path="/faq">
          <FAQ />
        </Route>

        <Route path="/blog">
          <BlogList />
        </Route>

        <Route path="/post/:id">
          <Post />
        </Route>

        <Route path="/shared-lists">
          {
            isLoggedIn ?
            <SharedLists /> :
            (id ? <UnauthSharedList id={id} name={name} /> : <UnauthorizedPage />)
          }
        </Route>

        <Route path="/quick-recommendations">
          <QuickRecs />
        </Route>

        <Route path="/profile">
          {isLoggedIn ? <Profile /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/my-list">
          {isLoggedIn ? <MyLists /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/my-list-v2">
          {isLoggedIn ? <MyListsV2 /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/journey">
          {isLoggedIn ? <Journey /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/change-password">
          {isLoggedIn ? <ChangePassword /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/share-my-list">
          {isLoggedIn ? <ShareMyList /> : <UnauthorizedPage /> }
        </Route>

        <Route path="/">
          {isLoggedIn ? <Splash /> : <UnauthorizedPage /> }
        </Route>
      </Switch>
    </>
  );
}
