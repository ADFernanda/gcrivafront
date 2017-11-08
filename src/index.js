import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import Store from './store';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from './components/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
