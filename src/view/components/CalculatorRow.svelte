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
    const onlyDigits = input.replace(/[^\d]/g, "").substring(0, 6);
    const attempt = parseInt(onlyDigits);
    if (isNaN(attempt)) {
      return "";
    }
    return attempt;
  }

  function handleInput(
    e: Event & { currentTarget: HTMLInputElement },
    setter: (n: UserEnteredNumber) => void,
  ) {
    const sanitized = sanitizeInput(e.currentTarget.value);
    setter(sanitized);
    e.currentTarget.value = sanitized === "" ? "" : String(sanitized);
  }
</script>

<div class="flex w-full gap-2">
  <label class="input flex-1 bg-slate-50/75">
    <IconCurrencyDollar />
    <input
      type="text"
      inputmode="decimal"
      autoComplete="off"
      oninput={(e) => handleInput(e, props.setPrice)}
      value={props.row.price}
    />
  </label>
  <label class="input flex-1 bg-slate-50/75">
    <IconRulerMeasure2 />
    <input
      type="text"
      inputmode="decimal"
      autoComplete="off"
      oninput={(e) => handleInput(e, props.setSize)}
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
