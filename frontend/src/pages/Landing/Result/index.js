import React from 'react'
import { Button, Header, Icon, Modal, Statistic } from 'semantic-ui-react'

const Result = (props) => {
  // console.log(props);
  return (
    <Modal open={props.open} basic>
      <Header content='And the answer is...' />
      <Modal.Content>
        <Statistic value={props.result} color='green' size='huge' style={{textAlign: 'center'}}/>
        <p>Did you think it would be more complicated?</p>
        <p>It's not anymore!</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted size='big'
          onTouchTap={props.restart}
        >
          <Icon name='reply' /> Start over
        </Button>
        <Button color='green' inverted size='big'
          onTouchTap={props.tryAgain}
        >
          <Icon name='repeat' /> New prediction!
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Result
