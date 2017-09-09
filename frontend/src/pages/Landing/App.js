import React, { Component } from 'react';
import logo from '../../assets/AI4dummies.png';
import './App.css';
import { Button } from 'semantic-ui-react'
import ReactFileReader from 'react-file-reader';
import { Grid, Row, Col } from 'react-flexbox-grid';

class App extends Component {
  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
    // Use reader.result
    console.log(reader.result)
    }
    reader.readAsText(files[0]);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Buttons-container">
          <Grid fluid>
            <Row>
              <Col xs={12} md={6}>
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'} style={{width: '100px'}}>
                  <Button content='Upload' icon='upload' labelPosition='right' color='red' size='huge' className='upload-button'/>
                </ReactFileReader>
              </Col>
              <Col xs={12} md={6}>
                <Button content='Predict' icon='lab' labelPosition='right' color='red' size='huge' className='predict-button'/>
              </Col>
            </Row>
          </Grid>
        </div>
        {/* <div className="footer">

        </div> */}
      </div>
    );
  }
}

export default App;
