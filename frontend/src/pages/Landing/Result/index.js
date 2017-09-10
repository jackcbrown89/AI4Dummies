import React from 'react'
import { Button, Header, Icon, Modal, Statistic } from 'semantic-ui-react'

const Result = (props) => {
  console.log(props);
  return (
    <Modal open={props.open} basic>
      <Header content='And the answer is...' />
      <Modal.Content>
        <Statistic value={props.result} color='yellow' size='massive' style={{textAlign: 'center'}}/>
        <p>Did you think it would be more complicated?</p>
        <p>It's not anymore!</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted>
          <Icon name='hand peace' /> You are getting there...
        </Button>
        <Button color='green' inverted>
          <Icon name='hand spock' /> That is awesome!
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Result
