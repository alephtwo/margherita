import { produce } from "immer";
import { State } from "./State.mts";
import { Message } from "./Message.mts";
import { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";

export function reducer(state: State, message: Message) {
  switch (message.action) {
    case "add-row":
      return addRow(state);
    case "remove-row":
      return removeRow(state, message.id);
    case "set-price":
      return setPrice(state, message.id, message.value);
    case "set-size":
      return setSize(state, message.id, message.value);
    default:
      return state;
  }
}

function addRow(state: State): State {
  return produce(state, (next) => {
    next.rows.push({ id: crypto.randomUUID(), price: "", size: "" });
  });
}

function removeRow(state: State, id: string): State {
  // Prevent users from removing the first row
  if (state.rows.length === 1) {
    return state;
  }
  return produce(state, (next) => {
    next.rows = next.rows.filter((r) => r.id !== id);
  });
}

function setPrice(state: State, id: string, price: string): State {
  const index = state.rows.findIndex((r) => r.id === id);
  if (index === -1) {
    console.error(`whoa buddy, row ${id} doesn't exist`);
  }
  return produce(state, (next) => {
    next.rows[index].price = sanitizeInput(price);
  });
}

function setSize(state: State, id: string, size: string): State {
  const index = state.rows.findIndex((r) => r.id === id);
  if (index === -1) {
    console.error(`whoa buddy, row ${id} doesn't exist`);
  }
  return produce(state, (next) => {
    next.rows[index].size = sanitizeInput(size);
  });
}

function sanitizeInput(input: string): UserEnteredNumber {
  // Ensure we're only looking at numbers, and at most six of them.
  const onlyDigits = input.replace(/[^\d]/, "").substring(0, 6);
  const attempt = parseInt(onlyDigits);
  if (isNaN(attempt)) {
    return "";
  }
  return attempt;
}
