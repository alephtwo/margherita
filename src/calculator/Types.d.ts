type UserEnteredNumber = number | '';

export interface State {
  rows: Array<CalculatorRow>;
}

export interface CalculatorRow {
  id: string;
  price: MaybeNumber;
  size: MaybeNumber;
}

type MaybeNumber = number | '';

export type Message =
  | { action: 'add-row' }
  | { action: 'remove-row' }
  | { action: 'set-price'; value: string; id: string }
  | { action: 'set-size'; value: string; id: string };
