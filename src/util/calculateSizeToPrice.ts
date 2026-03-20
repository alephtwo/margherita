import { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";

export function calculateSizeToPrice(
  price: UserEnteredNumber,
  size: UserEnteredNumber,
): UserEnteredNumber {
  if (price === "" || size === "") {
    return "";
  }

  const area = Math.PI * (size / 2) ** 2;
  return area / price;
}
