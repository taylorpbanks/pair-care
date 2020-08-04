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
      <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
        <AuthWrapper />
      </Authenticator>
    </div>
  );
}

export default App;