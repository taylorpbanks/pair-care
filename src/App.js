import React from "react";
import { Authenticator } from "aws-amplify-react";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import AuthWrapper from "./auth/AuthWrapper";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Authenticator className="height-100" hideDefault={true} amplifyConfig={awsconfig}>
        <AuthWrapper className="height-100" />
      </Authenticator>
    </div>
  );
}

export default App;