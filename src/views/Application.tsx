import { m } from "@i18n/messages";
import { produce } from "immer";
import { useReducer } from "react";

import { Pizza } from "../types/Pizza.mts";

interface State {
  pizzas: Pizza[];
}

type Message = { action: "add-pizza" };

export function Application(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <button
        className="rounded-md border border-black bg-amber-200 p-2 font-bold"
        onClick={() => dispatch({ action: "add-pizza" })}
      >
        {m["add-new-pizza"]()}
      </button>
      {state.pizzas.map((p) => (
        <h1 key={p.id}>
          Pizza {p.price} {p.size}
        </h1>
      ))}
    </div>
  );
}

function reducer(state: State, message: Message) {
  switch (message.action) {
    case "add-pizza": {
      return produce(state, (next) => {
        next.pizzas.push(new Pizza({ price: 15, size: 15 }));
      });
    }
    default: {
      return state;
    }
  }
}

const initialState: State = {
  pizzas: [new Pizza({ price: 15, size: 15 })],
};
