import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import React from 'react'
var max1
var max2
var max3
var specificValue

export const TwoLevelPieChart = (props) => {

  console.log(props.specificValue);
  specificValue = props.specificValue.map((a) => (
    a ? a : 0
  ))
  max1= parseInt(Math.max(...props.averageValue))
  max2=Math.max(...specificValue)
  max3=Math.max(max1,max2) + 1
  console.log(max1,max2,max3);

  const data = props.subjects.map((a,index) => {

    return(
      {subject: a, A: props.averageValue[index], B: props.specificValue[index], fullMark: 2}
    )
  })
  return (
    <RadarChart cx={300} cy={180} outerRadius={150} width={600} height={500} data={data}>
        <Radar name="Average" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
        <Radar name="Specific" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
        <PolarGrid />
        <Legend style={{bottom: '130px'}}/>
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, max3]}/>
      </RadarChart>
  );
}
