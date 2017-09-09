import React from 'react'
import './loader.css'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Loading = (props) => {
  return (
    <div>
      {/* <Dimmer {uploading}> */}
      <Dimmer active={props.uploading}>
        <Loader size='massive'>Uploading</Loader>
      </Dimmer>
    </div>
  )
}

export default Loading
