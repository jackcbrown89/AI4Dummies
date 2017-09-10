import React, { Component } from 'react';
import logo from '../../assets/Ml4dummies.png';
import './App.css';
import axios from 'axios'
import SelectCSV from '../selectCSV/'
import { Button } from 'semantic-ui-react'
import ReactFileReader from 'react-file-reader';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loader from './Loader'
import Predict from './Predict'
import Result from './Result'
import injectTapEventPlugin from 'react-tap-event-plugin';
const FileDownload = require('react-file-download');

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
      },
      selected: false,
      fileSend: false,
      rows: 0,
      clicked: false,
      txt: false,
      result: false
    }
    this.handleFiles = this.handleFiles.bind(this)
    this.handlePredictClick = this.handlePredictClick.bind(this)
    this.handleUploadModelClick = this.handleUploadModelClick.bind(this)
    this.handleSubmitInputsForPrediction = this.handleSubmitInputsForPrediction.bind(this)
    this.handleFiles = this.handleFiles.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleInputChanges = this.handleInputChanges.bind(this)
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
    this.restart = this.restart.bind(this)
    this.tryAgain = this.tryAgain.bind(this)
  }
  handleHeaderClick = (clicked) =>{
    this.setState({
      clicked: !clicked
    })
  }
  handleNext = (file, target) => {
    this.setState({
      file: file,
      selected: true
    })
    let that = this;
    let data = new FormData()
    data.set('data',that.state.fileSend)
    data.set('ID','id')
    data.set('target',target)
    // console.log(that.state);
   axios({
     method: 'post',
     headers: {
       'Content-Type': 'multipart/form-data'
     },
     url: 'http://719bd0f4.ngrok.io/train',
     data: data
   })
   .then(function (res) {
          FileDownload(res.data, 'model.txt');
        //  console.log(res.data);
         that.setState({
           file: false,
           selected: false
         })
      })
  }
  handleFiles = files => {
    let reader = new FileReader();
    let that = this;
    reader.onload = function(e) {
    // Use reader.resul
      that.setState({file: reader.result, selected: false, fileSend: files[0]})
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
    var pred_input = []
    for (var i = 0; i < that.state.rows.length; i++) {
      pred_input.push(that.state['input'+i])
      let data = new FormData()
      data.set('pred_input', pred_input)
      data.set('model', that.state.txt)
      if (i === that.state.rows.length-1) {
        // console.log("hellloooooo");
        axios({
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          url: 'http://719bd0f4.ngrok.io/predict',
          data: data
        })
        .then(function (response) {
          // console.log(response);
          that.setState({
            result: response.data
          })
        })
      }
    }
  }

  handleUploadModelClick = files => {
    var reader = new FileReader();
    var that = this;
    this.setState({
      txt: files[0]
    })
    let data = new FormData()
    data.set('model', files[0])
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: 'http://719bd0f4.ngrok.io/load_model',
      data: data
    })
    .then(function (response) {
      // console.log(response);
      that.setState({
        rows: Object.keys(response.data),
        weights: Object.values(response.data),
        step: {
          uploading: false,
          gettingInputs: true
        }
      })
      for (var i = 0; i < response.data.length; i++) {
          that.setState({
            ['input'+i]: ''
          })
          // console.log(that.state);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChanges = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  restart = () => {
    this.setState({
      file: false,
      predicting: false,
      step: {
        uploading: true,
        gettingInputs: false,
        finished: false
      },
      selected: false,
      fileSend: false,
      rows: 0,
      txt: false,
      result: false
    })
  }

  tryAgain = () => {
    this.setState({
      file: false,
      predicting: true,
      step: {
        uploading: false,
        gettingInputs: true,
        finished: false
      },
      selected: false,
      fileSend: false,
      result: false
    })
  }

  render() {
    let headerStyle = {}
    if (this.state.predicting) {
      headerStyle = {marginTop: 200+'px'}
      // console.log('only predicting');
    }
    if (!this.state.step.uploading && this.state.step.gettingInputs){
      headerStyle = {marginTop: 0+'px', height: 130+'px'}
      // console.log('predicting and gettingInputs');
    }
    return (
      <div>
        <div className={this.state.file === false ? "App" : "Hidden"}>

          {/* ************************************************ */}
          {/* ******************** HEADER ******************** */}
          {/* ************************************************ */}
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" style={headerStyle}/>
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
          {/* ****************** PREDICT ********************* */}
          {/* ************************************************ */}
          {this.state.predicting === true &&
            <Predict step={this.state.step}
              rows={this.state.rows}
              weights={this.state.weights}
              state={this.state}
              handleInputChanges={this.handleInputChanges}
              handleUploadModelClick={this.handleUploadModelClick}
              handleSubmitInputsForPrediction={this.handleSubmitInputsForPrediction}
          />}

        </div>

        {/* ************************************************ */}
        {/* ******************** FOOTER ******************** */}
        {/* ************************************************ */}
        <div className="footer">
          Made with <span role="img" aria-label="love">❤️</span> by 4 geeks at PennApps
        </div>
        {/* ************************************************ */}
        {/* ******************** Table Select CSV ******************** */}
        {/* ************************************************ */}
        {this.state.file !== false && <SelectCSV file={this.state.file} handleNext={this.handleNext} clicked={this.state.clicked} handleHeaderClick={this.handleHeaderClick}/>}

        {/* ************************************************ */}
        {/* ******************** LOADER ******************** */}
        {/* ************************************************ */}
        {this.state.file !== false && this.state.selected === true && <Loader uploading={true}/>}

        {/* ************************************************ */}
        {/* ******************** RESULT ******************** */}
        {/* ************************************************ */}
        <Result
          open={this.state.step.finished}
          result={this.state.result}
          restart={this.restart}
          tryAgain={this.tryAgain}
        />
      </div>
    );
  }
}

export default App;
