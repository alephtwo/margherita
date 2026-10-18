import SilentVTT from "/silent.vtt?url";
import WillametteMall from "/willamette-mall.mp3?url";
import { m } from "@i18n/messages";
import { IconPlus } from "@tabler/icons-react";
import { useReducer } from "react";

import { Button } from "@/components/ui/button";

import { DispatchContext } from "../contexts/DispatchContext.mts";
import { reducer } from "../state/reducer.mts";
import { initialState } from "../state/State.mts";
import { PizzaCard } from "./PizzaCard";

export function Application(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  // determine a global list of rankings for pizza efficiencies
  // we're calculating the efficiency on every update but it should be fine...
  const rankings = new Map(
    [
      // Unique efficiencies across all pizzas
      ...new Set(state.pizzas.map((p) => p.calculateEfficiency()).filter((e) => e !== undefined)),
    ]
      // descending sort
      .toSorted((a, b) => b - a)
      // get ranking for that efficiency
      .map((e, i) => [e, i + 1]),
  );

  return (
    <div className="flex min-h-screen bg-[url(/pizza.webp)] bg-cover bg-fixed bg-no-repeat">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs"></div>
      <div className="z-10 container mx-auto flex flex-col items-center gap-2">
        <div className="mb-5 text-center">
          <span className="font-lobster text-7xl text-white text-shadow-lg/80">margherita</span>
        </div>
        <div className="w-full rounded-md bg-white/50 p-2 md:w-3/4 lg:w-1/2">
          <div className="my-2 flex flex-col gap-2">
            <DispatchContext.Provider value={dispatch}>
              <div className="flex flex-col gap-3">
                {state.pizzas.map((pizza) => (
                  <PizzaCard
                    key={pizza.id}
                    pizza={pizza}
                    ranking={rankings.get(pizza.calculateEfficiency())}
                  />
                ))}
              </div>
            </DispatchContext.Provider>
            <Button
              onClick={() => dispatch({ action: "add-pizza" })}
              className="border border-black bg-sky-800 hover:bg-sky-700"
            >
              <IconPlus /> {m["add-new-pizza"]()}
            </Button>
          </div>
          <div className="flex flex-col content-center items-center gap-2">
            <audio controls autoPlay loop>
              <source src={WillametteMall} type="audio/mp3" />
              <track kind="captions" src={SilentVTT} srcLang="en" label="No dialogue" />
            </audio>
            <span className="caption-bottom text-xs">
              Willamette Mall Music is &copy; Capcom 2006
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
