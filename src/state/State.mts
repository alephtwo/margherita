import * as uuid from "uuid";
import { RowDetails } from "../@types/RowDetails.mts";

export interface State {
  rows: Array<RowDetails>;
}

export const initialState: State = {
  rows: [{ id: uuid.v4(), price: "", size: "" }],
};
