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
//blue - #226d77
//blue-green - #8cc5be
//extremely light blue - #eef6f9
//light peach - #fcddd2
// dark peach - #dc9577

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#226d77',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc9577',
      contrastText: '#fff',
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
