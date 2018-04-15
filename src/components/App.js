import React, { Component } from 'react';
import './App.css';
import Header from './common/Header';
import WeatherDashboard from './dashboard/WeatherDashboard';

class App extends Component {
  render() {
    return (
      <div>
	  	<Header></Header>
	  	<WeatherDashboard></WeatherDashboard>
	  </div>
    );
  }
}

export default App;

