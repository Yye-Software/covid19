import React, { useEffect, useState } from 'react';
import { ICaseDiff } from '../Types/ICaseDiff';
import StatCard from './StatCard';

interface StatsComponentProps {
  dataPoints: ICaseDiff[]
}

export const StatsComponent: React.FC<StatsComponentProps> = (props) => {
  const [currentDetails, setCurrentDetails] = useState<ICaseDiff | undefined>();
  const [worstDay, setWorstDay] = useState<ICaseDiff | undefined>();

  useEffect(() => {
    if (props.dataPoints.length > 0) {
      // recalculate
      setCurrentDetails(props.dataPoints[props.dataPoints.length - 1]);
      const worst: ICaseDiff = props.dataPoints.reduce((p, c) => p.caseDiff > c.caseDiff ? p : c);
      setWorstDay(worst);
    }
  }, [props]);

  return (
    <>
      <StatCard title="Most Recent" data={`${currentDetails?.caseDate.toDateString()}, ${currentDetails?.caseDiff.toLocaleString()} cases`} />
      <StatCard title="7 Day Avg" data={`${currentDetails?.movingAverage?.toFixed(2)} cases`} />
      <StatCard title="Total Cases" data={`${currentDetails?.case.toLocaleString()} cases`} />
      <StatCard title="Worst Day" data={`${worstDay?.caseDate.toDateString()}, ${worstDay?.caseDiff.toLocaleString()} cases`} />
    </>)
}

export default StatsComponent;