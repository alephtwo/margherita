import { UserEnteredNumber } from "./UserEnteredNumber.mts";

export interface RowDetails {
  id: string;
  price: UserEnteredNumber;
  size: UserEnteredNumber;
}

export function create(): RowDetails {
  return { id: crypto.randomUUID(), price: "", size: "" };
}
