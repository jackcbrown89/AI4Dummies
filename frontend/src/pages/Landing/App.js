import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import SelectCVS from '../selectCVS/'
class App extends Component {
  render() {
    return (
      <div className="App">
        <SelectCVS/>
      </div>
    );
  }
}

export default App;
