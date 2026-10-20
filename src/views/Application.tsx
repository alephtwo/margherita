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
        <div className="my-2 text-center">
          <span className="font-pizza-parlor text-7xl text-white text-shadow-lg/80">
            margherita
          </span>
        </div>
        <div className="relative my-5 w-full rounded-none border-4 border-stone-900 bg-stone-50/80 p-4 shadow-[6px_6px_0px_var(--color-retro-shadow)] backdrop-blur-md before:absolute before:inset-x-0 before:-top-3 before:h-3 before:bg-[radial-gradient(circle,transparent_4px,var(--color-receipt-header)_4px)] before:bg-size-[12px_12px] md:w-3/4 lg:w-1/2">
          <div className="my-2 flex flex-col gap-3">
            <DispatchContext.Provider value={dispatch}>
              <div className="flex flex-col gap-2">
                <div className="mb-1 grid grid-cols-[1fr_1fr_1fr_4rem] gap-2 border-b-2 border-stone-800 pb-1.5">
                  <span className="font-receipt text-center text-xs font-bold tracking-wider text-stone-800 uppercase">
                    Diameter
                  </span>
                  <span className="font-receipt text-center text-xs font-bold tracking-wider text-stone-800 uppercase">
                    Price
                  </span>
                  <span className="font-receipt text-center text-xs font-bold tracking-wider text-stone-800 uppercase">
                    Area / $
                  </span>
                  <span className="font-receipt text-center text-xs font-bold tracking-wider text-stone-800 uppercase"></span>
                </div>
                {state.pizzas.map((pizza) => (
                  <PizzaCard
                    key={pizza.id}
                    pizza={pizza}
                    ranking={rankings.get(pizza.calculateEfficiency() ?? -1)}
                  />
                ))}
              </div>
            </DispatchContext.Provider>
            <Button
              onClick={() => dispatch({ action: "add-pizza" })}
              className="font-receipt mt-2 rounded-none border-2 border-stone-900 bg-amber-500 py-5 font-bold tracking-wide text-stone-950 shadow-[3px_3px_0px_var(--color-retro-shadow)] transition-none hover:bg-amber-400 active:translate-y-0.5"
            >
              <IconPlus className="mr-1.5 size-4 stroke-3" /> {m["add-new-pizza"]()}
            </Button>
          </div>
          <div className="mt-4 flex flex-col content-center items-center gap-2 border-t-2 border-dashed border-stone-300 pt-3">
            <audio
              controls
              autoPlay
              loop
              className="h-8 w-full max-w-xs accent-amber-600 opacity-90 contrast-200 grayscale transition-opacity hover:opacity-100"
            >
              <source src={WillametteMall} type="audio/mp3" />
              <track kind="captions" src={SilentVTT} srcLang="en" label="No dialogue" />
            </audio>
            <span className="font-receipt block caption-bottom text-[10px] tracking-widest text-stone-500 uppercase">
              Willamette Mall Music is &copy; Capcom 2006
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
