import React from 'react'
import { Step } from 'semantic-ui-react'

const steps = [
  { completed: true, active: false, title: 'Upload model', description: "If you don't have one, make it!"},
  { completed: false, active: true, title: 'Input values', description: 'Type the values for which you want a prediction'},
  { completed: false, active: true, title: 'Get a prediction!', description: 'Easy right? :)'},
]

const Steps = () => (
  <div>
    {/* <Step.Group ordered>
      <Step active title='Upload model' />
      <Step title='Input values' />
      <Step title='Get a prediction!' description='Easy :D' />
    </Step.Group> */}
    <Step.Group ordered items={steps} />
  </div>
)

export default Steps
