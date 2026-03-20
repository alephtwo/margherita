import * as React from "react";
import {
  IconCurrencyDollar,
  IconRowRemove,
  IconRulerMeasure2,
  IconCalculator,
} from "@tabler/icons-react";
import { Message } from "../../state/Message.mts";
import { RowDetails } from "../../@types/RowDetails.mts";
import { formatCurrency } from "../../util/currency.mts";
import { calculate } from "../../util/calculate.mts";

interface RowProps {
  row: RowDetails;
  dispatch: React.Dispatch<Message>;
  disableDelete: boolean;
  onDelete: () => void;
}

export function CalculatorRow(props: RowProps) {
  const { row, dispatch } = props;

  const costEfficiency = calculate(row.price, row.size);

  return (
    <div className="flex gap-2 w-full">
      <label className="input flex-1 bg-slate-50/75">
        <IconCurrencyDollar />
        <input
          type="tel"
          autoComplete="off"
          value={row.price}
          onChange={(e) =>
            dispatch({ action: "set-price", id: row.id, value: e.target.value })
          }
        />
      </label>
      <label className="input flex-1 bg-slate-50/75">
        <IconRulerMeasure2 />
        <input
          type="tel"
          autoComplete="off"
          value={row.size}
          onChange={(e) =>
            dispatch({ action: "set-size", id: row.id, value: e.target.value })
          }
        />
        <span>in</span>
      </label>
      <label className="input flex-1 bg-slate-50/75">
        <IconCalculator />
        <input
          type="text"
          readOnly
          value={costEfficiency === "" ? "—" : formatCurrency(costEfficiency)}
        />
        <span>/in²</span>
      </label>
      <button className="btn btn-error" disabled={props.disableDelete}>
        <IconRowRemove onClick={props.onDelete} />
      </button>
    </div>
  );
}
