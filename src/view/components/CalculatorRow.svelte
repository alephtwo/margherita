<script lang="ts">
  import {
    IconCurrencyDollar,
    IconRulerMeasure2,
    IconCalculator,
    IconRowRemove,
  } from "@tabler/icons-svelte";
  import { formatCurrency } from "../../util/currency.mts";
  import { type RowDetails } from "../../@types/RowDetails.mts";
  import { calculate } from "../../util/calculate.mts";
  import { type UserEnteredNumber } from "../../@types/UserEnteredNumber.mts";

  interface CalculatorRowProps {
    row: RowDetails;
    disableDelete: boolean;
    setSize: (n: UserEnteredNumber) => void;
    setPrice: (n: UserEnteredNumber) => void;
    onDelete: () => void;
  }

  let props: CalculatorRowProps = $props();
  let costEfficiency = $derived(calculate(props.row.price, props.row.size));

  function sanitizeInput(input: string): UserEnteredNumber {
    // Ensure we're only looking at numbers, and at most six of them.
    const onlyDigits = input.replace(/[^\d]/, "").substring(0, 6);
    const attempt = parseInt(onlyDigits);
    if (isNaN(attempt)) {
      return "";
    }
    return attempt;
  }
</script>

<div class="flex gap-2 w-full">
  <label class="input flex-1 bg-slate-50/75">
    <IconCurrencyDollar />
    <input
      type="tel"
      autoComplete="off"
      oninput={(e) => props.setPrice(sanitizeInput(e.currentTarget.value))}
      value={props.row.price}
    />
  </label>
  <label class="input flex-1 bg-slate-50/75">
    <IconRulerMeasure2 />
    <input
      type="tel"
      autoComplete="off"
      oninput={(e) => props.setSize(sanitizeInput(e.currentTarget.value))}
      value={props.row.size}
    />
    <span>in</span>
  </label>
  <label class="input flex-1 bg-slate-50/75">
    <IconCalculator />
    <input
      type="text"
      readOnly
      value={costEfficiency === "" ? "—" : formatCurrency(costEfficiency)}
    />
    <span>/in²</span>
  </label>
  <button
    class="btn btn-error"
    disabled={props.disableDelete}
    onclick={props.onDelete}
  >
    <IconRowRemove />
  </button>
</div>
