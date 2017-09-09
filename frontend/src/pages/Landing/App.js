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
import request from 'superagent'


class App extends Component {
  constructor(){
  super()
    this.state = {
      file: false,
      selected: false,
      response: false
    }
    this.handleFiles = this.handleFiles.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  handleNext = (file, target) => {
    this.setState({
      file: file,
      selected: true,
      response: false
    })
    let that = this;
    request.post('http://localhost:3000/train')
    .set('Content-Type', 'application/json')
    .send({"file":file,"target":target})
    .end(function (error, res) {
        if(error){
          that.setState({
            file: false,
            selected: false,
            response: false
          })
        }
        if(res){
          that.setState({
            file: file,
            selected: true,
            response: res.body
          })
        }
    });
  }
  handleFiles = files => {
    var reader = new FileReader();
    var that = this;
    reader.onload = function(e) {
    // Use reader.result
      that.setState({file: reader.result, selected: false, response: false})
      // Use reader.result
      console.log(reader.result)
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
      {/* ************************************************ */}
      {/* ******************** Table Select CSV ******************** */}
      {/* ************************************************ */}
      {this.state.file !== false && <SelectCSV file={this.state.file} handleNext={this.handleNext}/>}
      {this.state.file !== false && this.state.selected === true && <Loader uploading={true}/>}
    </div>
    );
  }
}

export default App;
