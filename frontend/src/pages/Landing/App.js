import React, { Component } from 'react';
import logo from '../../assets/AI4dummies.png';
import './App.css';
import { Button } from 'semantic-ui-react'
import ReactFileReader from 'react-file-reader';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loader from './Loader'
import Save from './Save'
import Predict from './Predict'

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

        {/* ************************************************ */}
        {/* ******************** HEADER ******************** */}
        {/* ************************************************ */}
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        {/* ************************************************ */}
        {/* ******************** LANDING ******************** */}
        {/* ************************************************ */}
        <div className="Buttons-container">
          <Grid fluid>
            <Row>
              <Col xs={12} md={6}>
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'} style={{width: '100px'}}>
                  <Button content='Upload' icon='upload' labelPosition='right' color='red' size='huge' className='upload-button' />
                </ReactFileReader>
              </Col>
              <Col xs={12} md={6}>
                <Button content='Predict' icon='lab' labelPosition='right' color='red' size='huge' className='predict-button'/>
              </Col>
            </Row>
          </Grid>
        </div>

        {/* ************************************************ */}
        {/* **************** MODEL TRAINED ***************** */}
        {/* ************************************************ */}
        {/* <Save uploading={true}/> */}

        {/* ************************************************ */}
        {/* ****************** LOADING ********************* */}
        {/* ************************************************ */}
        {/* <Loader uploading={this.state.uploading} /> */}

        {/* ************************************************ */}
        {/* ****************** PREDICT ********************* */}
        {/* ************************************************ */}
        {/* <Predict /> */}


        {/* ************************************************ */}
        {/* ******************** FOOTER ******************** */}
        {/* ************************************************ */}
        <div className="footer">
          Made with <span role="img" aria-label="love">❤️</span> by 4 geeks at PennApps
        </div>

      </div>
    );
  }
}

export default App;
