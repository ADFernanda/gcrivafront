import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout'
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/">
          <DefaultLayout path="/login" component={Login} />
        </Route>
      </Router>
    );
  }
}

export default App;
