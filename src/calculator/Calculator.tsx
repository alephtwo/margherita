import { Button, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useReducer } from 'react';
import WillametteMall from '../static/willamette-mall.mp3';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { initialState, reducer } from './State';
import { CalculatorRow, Message } from './Types';
import { calculateSizeToPrice } from './calculateSizeToPrice';

export function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Controls add={() => dispatch({ action: 'add-row' })} remove={() => dispatch({ action: 'remove-row' })} />
      <Rows rows={state.rows} dispatch={dispatch} />
      <Music />
    </Stack>
  );
}

interface ControlsProps {
  add: () => void;
  remove: () => void;
}

function Controls(props: ControlsProps) {
  return (
    <Paper sx={styles.paper}>
      <Stack spacing={1} direction="row" justifyContent="center">
        <Button variant="contained" size="large" onClick={props.add}>
          <Add />
        </Button>
        <Button variant="contained" size="large" color="error" onClick={props.remove}>
          <Remove />
        </Button>
      </Stack>
    </Paper>
  );
}

interface RowsProps {
  rows: Array<CalculatorRow>;
  dispatch: React.Dispatch<Message>;
}

function Rows(props: RowsProps) {
  return (
    <Paper sx={styles.paper}>
      <Stack spacing={1}>
        {props.rows.map((r) => (
          <Row key={r.id} row={r} dispatch={props.dispatch} />
        ))}
      </Stack>
    </Paper>
  );
}

interface RowProps {
  row: CalculatorRow;
  dispatch: React.Dispatch<Message>;
}
function Row(props: RowProps) {
  const { row, dispatch } = props;

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        type="tel"
        variant="outlined"
        fullWidth
        value={row.price}
        label="Price"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={(e) => dispatch({ action: 'set-price', id: row.id, value: e.target.value })}
      />
      <TextField
        type="tel"
        variant="outlined"
        fullWidth
        value={row.size}
        label="Size"
        InputProps={{
          endAdornment: <InputAdornment position="end">in</InputAdornment>,
        }}
        onChange={(e) => dispatch({ action: 'set-size', id: row.id, value: e.target.value })}
      />
      <TextField
        type="tel"
        variant="outlined"
        fullWidth
        disabled
        value={calculateSizeToPrice(row.price, row.size)}
        label="Value"
        InputProps={{
          endAdornment: <InputAdornment position="end">in²/$</InputAdornment>,
        }}
      />
    </Stack>
  );
}

function Music() {
  return (
    <Paper sx={styles.paper}>
      <Stack spacing={1} alignContent="center" alignItems="center">
        <audio controls autoPlay loop>
          <source src={WillametteMall} type="audio/mp3" />
        </audio>
        <Typography variant="caption">Willamette Mall Music is &copy; Capcom 2006</Typography>
      </Stack>
    </Paper>
  );
}

const styles = {
  paper: {
    padding: 1,
  },
};
