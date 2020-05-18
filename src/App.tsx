import { CircularProgress, Container } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import './App.css';
import CoronaChart from './Components/CoronaChart';
import { StatsComponent } from './Components/Stats';
import { ICaseDiff } from './Types/ICaseDiff';
import { ICasePoint } from './Types/ICasePoint';
import { getCaseDiffSMA } from './Utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const App = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<ICasePoint[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDataPoints, setSelectedDataPoints] = useState<ICaseDiff[]>([]);

  useEffect(() => {
    // on startup, grab the data
    const getData = async () => {
      try {
        setLoading(true);
        const req = await fetch('https://covidtracking.com/api/states/daily');
        const data = await req.json();
        const result: ICasePoint[] = data.map((d: any) => {
          return {
            caseDate: new Date(Date.parse(d.date.toString().substr(0, 4) + "/" + d.date.toString().substr(4, 2) + "/" + d.date.toString().substr(6, 2))),
            state: d.state,
            case: d.positive
          }
        });

        const uniqueStates: string[] = result.map(x => x.state).filter((v, i, a) => a.indexOf(v) === i).sort((x, y) => x > y ? 1 : -1);
        setStates(uniqueStates);

        setDataPoints(result);
        setSelectedState("GA");
        setLoading(false);
      }
      catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    updateData();
  }, [selectedState]);

  const updateData = () => {
    const dataSorted = dataPoints.filter(x => x.state === selectedState).sort((a, b) => a.caseDate.getTime() - b.caseDate.getTime());
    const sma: number = 7;

    let caseDiffs: ICaseDiff[] = dataSorted.map((x, i) => {
      if (i === 0) {
        return { ...x, caseDiff: x.case }
      } else {
        return { ...x, caseDiff: x.case - dataSorted[i - 1].case }
      }
    });

    // now that the diffs are calculated, lets do our moving average
    caseDiffs = caseDiffs.map((c, i) => {
      if (i < sma) {
        return { ...c }
      } else {
        return { ...c, movingAverage: getCaseDiffSMA(caseDiffs, i, sma) }
      }
    });

    console.log(caseDiffs);

    setSelectedDataPoints(caseDiffs);
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.currentTarget.value);
  };

  return (
    <Container maxWidth="sm">
      {!loading ?
        <>
          <FormControl className={classes.formControl}>
            <NativeSelect
              value={selectedState}
              onChange={handleChange}
              inputProps={{
                name: 'state',
                id: 'state-native-helper',
              }}
            >
              {states.map(s => (<option value={s}>{s}</option>))}
            </NativeSelect>
          </FormControl>
          <CoronaChart dataPoints={selectedDataPoints} />
          <StatsComponent dataPoints={selectedDataPoints} />
        </> : <CircularProgress />}
    </Container>
  );
}

export default App;
