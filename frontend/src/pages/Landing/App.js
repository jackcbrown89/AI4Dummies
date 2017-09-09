import React, { Component } from 'react';
import logo from '../../assets/AI4dummies.png';
import './App.css';
import { Button } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Buttons-container">
          <Button content='Upload' icon='upload' labelPosition='right' color='red' size='huge' className='button' style={{marginRight: '40px'}}/>
          <Button content='Predict' icon='lab' labelPosition='right' color='red' size='huge' className='button'/>
        </div>
        {/* <div className="footer">

        </div> */}
      </div>
    );
  }
}

export default App;
