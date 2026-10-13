import { produce } from "immer";

import { Pizza } from "../types/Pizza.mts";
import { Message } from "./Message.mts";
import { State } from "./State.mts";

export function reducer(state: State, message: Message) {
  switch (message.action) {
    case "add-pizza": {
      return produce(state, (next) => {
        next.pizzas.push(Pizza.defaultPizza());
      });
    }
    case "delete-pizza": {
      if (state.pizzas.length === 1) {
        console.error("cannot remove last pizza");
        return state;
      }

      return produce(state, (next) => {
        next.pizzas = next.pizzas.filter((p) => p.id !== message.id);
      });
    }
    case "set-size": {
      return produce(state, (next) => {
        const index = state.pizzas.findIndex((p) => p.id === message.id);
        next.pizzas[index].size = sanitizeInput(message.value);
      });
    }
    case "set-price": {
      return produce(state, (next) => {
        const index = state.pizzas.findIndex((p) => p.id === message.id);
        next.pizzas[index].price = sanitizeInput(message.value);
      });
    }
    default: {
      return state;
    }
  }
}

function sanitizeInput(input: string): number | "" {
  // Ensure we're only looking at numbers, and at most six of them.
  const onlyDigits = input.replaceAll(/[^\d]/g, "").slice(0, 6);
  const attempt = Number.parseInt(onlyDigits);
  if (Number.isNaN(attempt)) {
    return "";
  }
  return attempt;
}
