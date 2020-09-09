import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { Authenticator } from 'aws-amplify-react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
Amplify.configure(config);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#96bf7a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#5f9ea0',
    },
    purple: {
      main: '#3f50b5',
      contrastText: '#fff'
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Authenticator hideDefault={true} />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
