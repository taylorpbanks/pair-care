import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

export default function Content() {
  return (
    <>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Users() {
  return <h1>Users</h1>;
}