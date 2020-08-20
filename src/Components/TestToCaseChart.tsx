import React from 'react';
import { Line } from 'react-chartjs-2';
import { ICaseDiff } from '../Types/ICaseDiff';


interface TestToCaseChartProps {
  dataPoints: ICaseDiff[]
}

const TestToCaseChart: React.FC<TestToCaseChartProps> = ({ dataPoints }) => {
  return (
    <>
      <Line
        options={{
          scales: {
            xAxes: [{
              type: 'time',
              display: true,
              displayFormats: {
                'day': 'MM/DD/YYYY'
              }
            }]
          }
        }}
        data={{
          labels: dataPoints.map(d => d.caseDate),
          datasets: [
            {
              data: dataPoints.map(x => x.testToCaseRatio),
              label: "Cases to Tests ratio",
              borderColor: "#3333ff",
              fill: true,
            },
          ]
        }} />
    </>)
}

export default TestToCaseChart;