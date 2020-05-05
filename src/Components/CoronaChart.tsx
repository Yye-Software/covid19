import React from 'react'
import { Line } from 'react-chartjs-2';

import { ICaseDiff } from '../Types/ICaseDiff';

interface CoronaChartProps {
  dataPoints: ICaseDiff[]
}

const CoronaChart: React.FC<CoronaChartProps> = ({ dataPoints }) => {
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
              data: dataPoints.map(x => x.caseDiff),
              label: "New Cases",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dataPoints.map(x => x.movingAverage),
              label: "7 day avg.",
              borderColor: "#aa2138",
              fill: true
            }
          ]
        }} />
    </>)
}

export default CoronaChart;