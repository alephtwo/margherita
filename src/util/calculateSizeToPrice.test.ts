import { test, expect } from "vitest";
import { calculateSizeToPrice } from "./calculateSizeToPrice";

test("Happy Path", () => {
  expect(calculateSizeToPrice(5, 3)).toBeCloseTo(1.41371);
});

test("Price is empty string", () => {
  expect(calculateSizeToPrice("", 5)).toBe("");
});

test("Size is empty string", () => {
  expect(calculateSizeToPrice(5, "")).toBe("");
});
