<script lang="ts">
  import {
    IconCurrencyDollar,
    IconRulerMeasure2,
    IconCalculator,
    IconRowRemove,
  } from "@tabler/icons-svelte";
  import { formatCurrency } from "../../util/currency.mts";
  import { type RowDetails } from "../../@types/RowDetails.mts";
  import { type UserEnteredNumber } from "../../@types/UserEnteredNumber.mts";

  interface CalculatorRowProps {
    row: RowDetails;
    disableDelete: boolean;
    costEfficiency: UserEnteredNumber;
    medal?: 1 | 2 | 3;
    setSize: (n: UserEnteredNumber) => void;
    setPrice: (n: UserEnteredNumber) => void;
    onDelete: () => void;
  }

  let props: CalculatorRowProps = $props();

  const MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" } as const;

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

<div class="flex w-full gap-2">
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
    {#if props.medal !== undefined}
      <span>{MEDALS[props.medal]}</span>
    {:else}
      <IconCalculator />
    {/if}
    <input
      type="text"
      readOnly
      value={props.costEfficiency === ""
        ? "—"
        : formatCurrency(props.costEfficiency)}
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
