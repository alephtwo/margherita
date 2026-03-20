import * as React from "react";
import { useReducer } from "react";
import { initialState } from "../state/State.mts";
import { reducer } from "../state/reducer.mts";
import WillametteMall from "/willamette-mall.mp3?url";
import { CalculatorRow } from "./components/CalculatorRow";
import { Paper } from "./components/Paper";
import { IconRowInsertBottom } from "@tabler/icons-react";

export function Margherita() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="h-screen flex bg-no-repeat bg-cover bg-[url(/pizza.webp)]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="container mx-auto my-4 z-10">
        <div className="flex flex-col items-center gap-5">
          <span className="text-7xl font-lobster text-white text-shadow-lg/80">
            margherita
          </span>
          <div className="w-xl">
            <Paper>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-2">
                  {state.rows.map((row) => (
                    <CalculatorRow
                      row={row}
                      key={row.id}
                      dispatch={dispatch}
                      disableDelete={state.rows.length === 1}
                      onDelete={() =>
                        dispatch({ action: "remove-row", id: row.id })
                      }
                    />
                  ))}
                  <div>
                    <button
                      className="btn btn-success w-full"
                      onClick={() => dispatch({ action: "add-row" })}
                    >
                      <IconRowInsertBottom /> Add Row
                    </button>
                  </div>
                </div>
                <div className="flex flex-col content-center items-center gap-2">
                  <audio controls autoPlay loop>
                    <source src={WillametteMall} type="audio/mp3" />
                  </audio>
                  <span className="caption-bottom text-xs">
                    Willamette Mall Music is &copy; Capcom 2006
                  </span>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
