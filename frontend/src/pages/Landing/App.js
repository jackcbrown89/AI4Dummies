import React, { Component } from 'react';
import logo from '../../assets/AI4dummies.png';
import './App.css';

import SelectCSV from '../selectCSV/'
import { Button } from 'semantic-ui-react'
import ReactFileReader from 'react-file-reader';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loader from './Loader'
import Save from './Save'
import Predict from './Predict'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class App extends Component {
  constructor(){
  super()
    this.state = {
      file: false,
      predicting: false,
      step: {
        uploading: true,
        gettingInputs: false,
        finished: false
      }
    }
    this.handleFiles = this.handleFiles.bind(this)
    this.handlePredictClick = this.handlePredictClick.bind(this)
    this.handleUploadModelClick = this.handleUploadModelClick.bind(this)
    this.handleSubmitInputsForPrediction = this.handleSubmitInputsForPrediction.bind(this)
  }

  handleFiles = files => {
    var reader = new FileReader();
    var that = this;
    reader.onload = function(e) {
    // Use reader.result
      that.setState({file: reader.result})

      // Use reader.result
      // console.log(reader.result)
    }
    reader.readAsText(files[0]);
  }

  handlePredictClick = () => {
    this.setState({file: false, predicting: true})
  }

  handleSubmitInputsForPrediction = () => {
    // console.log('Predict me!');
    const that = this;
    that.setState({
      step: {
        uploading: false,
        finished: true
      }
    })
  }

  handleUploadModelClick = files => {
    // console.log('running!');
    var reader = new FileReader();
    var that = this;
    reader.onload = function(e) {
      that.setState({
        step: {
          uploading: false,
          gettingInputs: true
        }
      })
      // Use reader.result
      // console.log(reader.result)
    }
    reader.readAsText(files[0]);
  }

  render() {
    return (
      <div>
        <div className={this.state.file === false ? "App" : "Hidden"}>

          {/* ************************************************ */}
          {/* ******************** HEADER ******************** */}
          {/* ************************************************ */}
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" style={this.state.predicting ? {marginTop: 10+'px'}:{}}/>
          </div>

          {/* ************************************************ */}
          {/* ******************** LANDING ******************** */}
          {/* ************************************************ */}
          <div className={this.state.predicting === false ? "Buttons-container" : "Hidden"}>
            <Grid fluid>
              <Row>
                <Col xs={12} md={6}>
                  <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'} style={{width: '100px'}}>
                    <Button content='Upload' icon='upload' labelPosition='right' color='red' size='huge' className='upload-button' />
                  </ReactFileReader>
                </Col>
                <Col xs={12} md={6}>
                  <Button
                    content='Predict' icon='lab' labelPosition='right' color='red' size='huge' className='predict-button'
                    onTouchTap={this.handlePredictClick}/>
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
          {this.state.predicting === true &&
            <Predict step={this.state.step}
              handleUploadModelClick={this.handleUploadModelClick}
              handleSubmitInputsForPrediction={this.handleSubmitInputsForPrediction}
          />}

        </div>
        {/* ************************************************ */}
        {/* ******************** Table Select CSV ******************** */}
        {/* ************************************************ */}
        {this.state.file !== false && <SelectCSV file={this.state.file}/>}

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
