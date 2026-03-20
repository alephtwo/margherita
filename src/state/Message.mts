export type Message =
  | { action: "add-row" }
  | { action: "remove-row"; id: string }
  | { action: "set-price"; value: string; id: string }
  | { action: "set-size"; value: string; id: string };
