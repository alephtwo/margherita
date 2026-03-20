import * as React from "react";
import { useReducer } from "react";
import { Paper } from "../Paper";
import { initialState, reducer } from "./State";
import { CalculatorRow, Message } from "./Types";
import { calculateSizeToPrice } from "./calculateSizeToPrice";
import WillametteMall from "/willamette-mall.mp3?url";
import {
  IconCurrencyDollar,
  IconMinus,
  IconPlus,
  IconRulerMeasure2,
} from "@tabler/icons-react";

export function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Controls
        add={() => dispatch({ action: "add-row" })}
        remove={() => dispatch({ action: "remove-row" })}
      />
      <Rows rows={state.rows} dispatch={dispatch} />
      <Music />
    </div>
  );
}

interface ControlsProps {
  add: () => void;
  remove: () => void;
}

function Controls(props: ControlsProps) {
  return (
    <Paper>
      <div className="flex gap-2 justify-center">
        <button className="btn btn-lg btn-primary" onClick={props.add}>
          <IconPlus />
        </button>
        <button className="btn btn-lg btn-secondary" onClick={props.remove}>
          <IconMinus />
        </button>
      </div>
    </Paper>
  );
}

interface RowsProps {
  rows: Array<CalculatorRow>;
  dispatch: React.Dispatch<Message>;
}

function Rows(props: RowsProps) {
  return (
    <Paper>
      <div className="flex flex-col gap-2">
        {props.rows.map((r) => (
          <Row key={r.id} row={r} dispatch={props.dispatch} />
        ))}
      </div>
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
    <div className="flex gap-2 w-full">
      <label className="input input-xl w-full bg-slate-50/75">
        <IconCurrencyDollar />
        <input
          type="tel"
          autoComplete="off"
          className="text-sm font-bold "
          value={row.price}
          onChange={(e) =>
            dispatch({ action: "set-price", id: row.id, value: e.target.value })
          }
        />
      </label>
      <label className="input input-xl w-full bg-slate-50/75">
        <IconRulerMeasure2 />
        <input
          type="tel"
          autoComplete="off"
          className="text-sm font-bold bg-slate-50/30"
          value={row.size}
          onChange={(e) =>
            dispatch({ action: "set-size", id: row.id, value: e.target.value })
          }
        />
        <span>in</span>
      </label>
      <label className="input input-xl w-full bg-slate-200/75">
        <IconCurrencyDollar />
        <input
          type="tel"
          autoComplete="off"
          disabled
          className="text-sm font-bold"
          value={calculateSizeToPrice(row.price, row.size)}
          onChange={(e) =>
            dispatch({ action: "set-price", id: row.id, value: e.target.value })
          }
        />
        <span>/in</span>
      </label>
    </div>
  );
}

function Music() {
  return (
    <Paper>
      <div className="flex flex-col content-center items-center gap-2">
        <audio controls autoPlay loop>
          <source src={WillametteMall} type="audio/mp3" />
        </audio>
        <span className="caption-bottom text-xs">
          Willamette Mall Music is &copy; Capcom 2006
        </span>
      </div>
    </Paper>
  );
}
