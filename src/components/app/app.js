// @flow
import React, { Component } from 'react';
import TimesheetContainer from '../timesheet/timesheet.container';
import LoadingContainer from '../loading/loading.container';
import logo from './logo.svg';
import './app.style.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Aurity Devs Timesheet</h2>
        </div>
        <div className="app-intro">
          <TimesheetContainer />
        </div>
        <LoadingContainer />
      </div>
    );
  }
}
