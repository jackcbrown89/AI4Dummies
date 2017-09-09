import React from 'react'
import { Step } from 'semantic-ui-react'

const Steps = (props) => {
  // console.log(props.step);
  const steps = [
    {
      completed: !props.step.uploading ? true : false,
      active: props.step.uploading ? true : false,
      title: 'Upload model',
      description: "If you don't have one, make it!"},
    {
      completed: props.step.finished ? true : false,
      active: props.step.gettingInputs ? true : false,
      title: 'Input values',
      description: 'Type the values for which you want a prediction'},
    { completed: false,
      active: props.step.finished ? true : false,
      title: 'Get a prediction!',
      description: 'Easy right? :)'
    },
  ]
  return (
    <div>
      {/* <Step.Group ordered>
        <Step active title='Upload model' />
        <Step title='Input values' />
        <Step title='Get a prediction!' description='Easy :D' />
      </Step.Group> */}
      <Step.Group ordered items={steps} />
    </div>
  )
}

export default Steps
