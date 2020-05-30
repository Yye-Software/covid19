import React, { useEffect, useState } from 'react';
import { ICaseDiff } from '../Types/ICaseDiff';
import StatCard from './StatCard';

interface TestingStatsProps {
  dataPoints: ICaseDiff[]
}

export const TestingStats: React.FC<TestingStatsProps> = (props) => {
  const [currentDetails, setCurrentDetails] = useState<ICaseDiff | undefined>();

  useEffect(() => {
    if (props.dataPoints.length > 0) {
      // recalculate
      setCurrentDetails(props.dataPoints[props.dataPoints.length - 1]);
    }
  }, [props]);

  return (
    <>
      {currentDetails ?
        <>
          <StatCard title="Total Tests" data={`${currentDetails.totalTests.toLocaleString()}`} />
          <StatCard title="% Positive" data={((currentDetails.totalPositive / currentDetails.totalTests) * 100).toFixed(2)} />
          <StatCard title="% Negative" data={((currentDetails.totalNegative / currentDetails.totalTests) * 100).toFixed(2)} />
        </>
        : null}
    </>)
}

export default TestingStats;