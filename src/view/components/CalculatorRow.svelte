<script lang="ts">
  import { IconCalculator, IconCurrencyDollar, IconRowRemove } from "@tabler/icons-svelte";

  import { type RowDetails } from "../../@types/RowDetails.mts";
  import { type UserEnteredNumber } from "../../@types/UserEnteredNumber.mts";
  import { formatCurrency } from "../../util/currency.mts";
  import Button from "./Button.svelte";
  import TextInput from "./TextInput.svelte";

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
    const onlyDigits = input.replaceAll(/[^\d]/g, "").slice(0, 6);
    const attempt = Number.parseInt(onlyDigits);
    if (Number.isNaN(attempt)) {
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

<div class="flex gap-2">
  <TextInput
    class="shrink"
    inputmode="decimal"
    oninput={(e) => handleInput(e, props.setPrice)}
    value={props.row.price.toString()}
  >
    {#snippet prefix()}
      <IconCurrencyDollar />
    {/snippet}
  </TextInput>
  <TextInput
    class="shrink"
    inputmode="decimal"
    oninput={(e) => handleInput(e, props.setSize)}
    value={props.row.size.toString()}
  >
    {#snippet suffix()}
      <span>in</span>
    {/snippet}
  </TextInput>
  <TextInput
    class="shrink"
    readonly
    value={props.costEfficiency === "" ? "—" : formatCurrency(props.costEfficiency)}
  >
    {#snippet prefix()}
      {#if props.medal !== undefined}
        <span>{MEDALS[props.medal]}</span>
      {:else}
        <IconCalculator />
      {/if}
    {/snippet}
    {#snippet suffix()}
      <span>/in²</span>
    {/snippet}
  </TextInput>
  <Button color="red" class="grow-0" disabled={props.disableDelete} onclick={props.onDelete}>
    <IconRowRemove />
  </Button>
</div>
