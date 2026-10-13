import { test, expect } from "vitest";

import { initialState } from "./State.mts";

test("Initial state is as expected", () => {
  expect(initialState.pizzas).toBeDefined();
  expect(initialState.pizzas[0].price).toEqual("");
  expect(initialState.pizzas[0].size).toEqual(12);
});
