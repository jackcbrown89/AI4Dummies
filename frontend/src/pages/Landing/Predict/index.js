import React from 'react'
import './predict.css'
import { Container, Button, Table, Icon, Input } from 'semantic-ui-react'
import Steps from './Steps'

const Predict = (props) => (
  <div>
    {/* STEPS */}
    <div className='steps-container'>
      <Steps />
    </div>

    {/* MODEL LOADER */}
    <div className='load-container'>
      <Button content='Upload model' labelPosition='right' icon='upload' size='massive' color='red'/>
    </div>

    {/* INPUTS TABLE */}
    {/* The headers and cells will be extracted from the loaded model by looping through */}
    <Container fluid className='inputs-container'>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
              <Table.Cell><Input fluid/></Table.Cell>
              <Table.Cell><Input fluid/></Table.Cell>
              <Table.Cell><Input fluid/></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  </div>

)

export default Predict
