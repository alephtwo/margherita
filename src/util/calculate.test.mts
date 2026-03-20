import { test, expect } from "vitest";
import { calculate } from "./calculate.mts";

test("Happy Path", () => {
  expect(calculate(5, 3)).toBeCloseTo(0.7073553026306459);
});

test("Price is empty string", () => {
  expect(calculate("", 5)).toBe("");
});

test("Size is empty string", () => {
  expect(calculate(5, "")).toBe("");
});
