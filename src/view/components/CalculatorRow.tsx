import * as React from "react";
import { calculateSizeToPrice } from "../../util/calculateSizeToPrice";
import {
  IconCurrencyDollar,
  IconRowRemove,
  IconRulerMeasure2,
} from "@tabler/icons-react";
import { Message } from "../../state/Message.mts";
import { RowDetails } from "../../@types/RowDetails.mts";
import { formatCurrency } from "../../util/currency";

interface RowProps {
  row: RowDetails;
  dispatch: React.Dispatch<Message>;
  disableDelete: boolean;
  onDelete: () => void;
}

export function CalculatorRow(props: RowProps) {
  const { row, dispatch } = props;

  const costEfficiency = calculateSizeToPrice(row.price, row.size);

  return (
    <div className="flex gap-2 w-full">
      <label className="input w-full bg-slate-50/75">
        <IconCurrencyDollar />
        <input
          type="tel"
          autoComplete="off"
          className="text-sm font-bold "
          value={row.price}
          onChange={(e) =>
            dispatch({ action: "set-price", id: row.id, value: e.target.value })
          }
        />
      </label>
      <label className="input w-full bg-slate-50/75">
        <IconRulerMeasure2 />
        <input
          type="tel"
          autoComplete="off"
          className="text-sm font-bold bg-slate-50/30"
          value={row.size}
          onChange={(e) =>
            dispatch({ action: "set-size", id: row.id, value: e.target.value })
          }
        />
        <span>in</span>
      </label>
      <div className="min-w-3xs flex items-center justify-center">
        {costEfficiency === ""
          ? ""
          : `${formatCurrency(1 / costEfficiency)} per sq inch`}
      </div>
      <button className="btn btn-secondary" disabled={props.disableDelete}>
        <IconRowRemove onClick={props.onDelete} />
      </button>
    </div>
  );
}
