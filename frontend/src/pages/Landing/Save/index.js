import React from 'react'
import './save.css'
import { Button } from 'semantic-ui-react'

const Save = (props) => {
  return (
    <div className='save-container'>
      <Button content='Download trained model' labelPosition='right' icon='download' size='massive' color='red'/>
    </div>
  )
}

export default Save
