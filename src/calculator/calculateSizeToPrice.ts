import { MaybeNumber } from "./Types";

export function calculateSizeToPrice(price: MaybeNumber, size: MaybeNumber): MaybeNumber {
  if (price === "" || size === "") {
    return "";
  }

  const area = Math.PI * (size / 2) ** 2;
  return area / price;
}
