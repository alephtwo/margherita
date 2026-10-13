import { Pizza } from "../types/Pizza.mts";

export interface State {
  pizzas: Pizza[];
}

export const initialState: State = {
  pizzas: [Pizza.defaultPizza()],
};
