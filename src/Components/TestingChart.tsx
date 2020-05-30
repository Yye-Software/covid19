import React from 'react';
import { Line } from 'react-chartjs-2';
import { ICaseDiff } from '../Types/ICaseDiff';


interface TestingChartProps {
  dataPoints: ICaseDiff[]
}

const TestingChart: React.FC<TestingChartProps> = ({ dataPoints }) => {
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
              data: dataPoints.map(x => x.newTests),
              label: "New Tests",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dataPoints.map(x => x.positiveTests),
              label: "Positive Tests",
              borderColor: "#aa2138",
              fill: true
            },
            {
              data: dataPoints.map(x => x.negativeTests),
              label: "Negative Tests",
              borderColor: "#00ff1a",
              fill: true
            },
          ]
        }} />
    </>)
}

export default TestingChart;