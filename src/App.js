import React from "react";
import { Authenticator } from "aws-amplify-react";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import AuthWrapper from "./auth/AuthWrapper";
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

Amplify.configure(awsconfig);
const { store, persistor } = configureStore();

console.log(store);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Authenticator className="height-100" hideDefault={true} amplifyConfig={awsconfig}>
          <AuthWrapper className="height-100" />
        </Authenticator>
      </PersistGate>
      </Provider>
    </div>
  );
}

export default App;