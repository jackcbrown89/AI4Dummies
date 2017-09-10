import React from 'react'
import './predict.css'
import { Container, Button, Table, Icon, Input } from 'semantic-ui-react'
import Steps from './Steps'
import ReactFileReader from 'react-file-reader';
import Chart from '../Rechart'

const Predict = (props) => {
  var headers = []
  var cells = []
  // console.log(props.weights);
  // console.log(props.rows);
  for (var i=0; i < props.rows.length; i++) {
    var name = "input" + i
    headers.push(
      <Table.HeaderCell
        key={i+1}
        style={{textAlign: 'center'}}>{props.rows[i]}
      </Table.HeaderCell>
    );
    cells.push(
      <Table.Cell>
        <Input fluid
          key={'key'+i}
          onChange={props.handleInputChanges}
          name={name}
          value={props.state['input'+i]}
        />
      </Table.Cell>
    );
  }
  return (
    <div>
      {/* STEPS */}
      <div className='steps-container'>
        <Steps step={props.step}/>
      </div>

      {/* MODEL LOADER */}
      {props.step.uploading &&
        <ReactFileReader handleFiles={props.handleUploadModelClick} fileTypes={'.txt'}>
          <div className='load-container'>
            <Button content='Upload model' labelPosition='right' icon='upload' size='massive' color='red'/>
          </div>
        </ReactFileReader>
      }

      {/* INPUTS TABLE */}
      {/* The headers and cells will be extracted from the loaded model by looping through */}
      {props.step.gettingInputs &&
        <Container fluid className='inputs-container'>
          <Table celled>
            <Table.Header>
              <Table.Row>
                { headers }
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                { cells }
              </Table.Row>
            </Table.Body>
          </Table>
          <Button content='Get prediction!' labelPosition='right' icon='lab' size='massive' color='red' style={{float: 'left'}}
            onTouchTap={props.handleSubmitInputsForPrediction}
          />
        </Container>
      }
      {props.step.gettingInputs && <Chart rows={props.rows} weights={props.weights} /> }
    </div>
  )
}

export default Predict
