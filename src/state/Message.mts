export type Message =
  | { action: "add-pizza" }
  | { action: "delete-pizza"; id: string }
  | { action: "set-size"; id: string; value: string }
  | { action: "set-price"; id: string; value: string };
