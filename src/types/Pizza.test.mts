import { vi, test, expect } from "vitest";

import { Pizza } from "./Pizza.mts";

test("Calculates efficiency properly", () => {
  const idSpy = vi.spyOn(crypto, "randomUUID");
  const pizza = new Pizza({ size: 10, price: 10 });
  expect(pizza.calculate()).toBeCloseTo(0.12732395447351627);
  expect(pizza.id).toEqual(idSpy.mock.results[0].value);
});
