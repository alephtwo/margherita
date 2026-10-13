import fc from "fast-check";
import { immerable } from "immer";
import { vi, test, expect } from "vitest";

import { Pizza } from "./Pizza.mts";

test("Constructs correctly", () => {
  const idSpy = vi.spyOn(globalThis.crypto, "randomUUID");
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (size, price) => {
      const pizza = new Pizza({ size, price });

      // the last generated UUID should match the value of the id
      const id = idSpy.mock.results.at(-1)?.value as string;
      expect(pizza.id).toEqual(id);
      expect(pizza.size).toEqual(size);
      expect(pizza.price).toEqual(price);
    }),
  );
});

test("Default pizza is as expected", () => {
  const pizza = Pizza.defaultPizza();
  expect(pizza.size).toEqual(12);
  expect(pizza.price).toEqual("");
});

test("Calculates efficiency properly for defined values", () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (size, price) => {
      const pizza = new Pizza({ size, price });

      // Do the math ourselves!
      const radius = size / 2;
      const area = Math.PI * Math.pow(radius, 2);
      const efficiency = area / price;

      expect(pizza.calculateEfficiency()).toEqual(efficiency);
    }),
  );
});

test("Handles unknown size", () => {
  fc.assert(
    fc.property(fc.integer(), (price) => {
      const pizza = new Pizza({ size: "", price });
      expect(pizza.calculateEfficiency()).toBeUndefined();
    }),
  );
});

test("Handles unknown price", () => {
  fc.assert(
    fc.property(fc.integer(), (size) => {
      const pizza = new Pizza({ size, price: "" });
      expect(pizza.calculateEfficiency()).toBeUndefined();
    }),
  );
});

test("Pizzas are immerable", () => {
  const pizza = Pizza.defaultPizza();
  expect(pizza[immerable]).toBe(true);
});
