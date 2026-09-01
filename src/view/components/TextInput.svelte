<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLInputAttributes } from "svelte/elements";

  interface Props {
    value: string;
    class?: HTMLInputAttributes["class"];
    inputmode?: HTMLInputAttributes["inputmode"];
    placeholder?: string;
    oninput?: (e: Event & { currentTarget: HTMLInputElement }) => void;
    readonly?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
  }

  let props: Props = $props();
</script>

<div class="flex flex-1 items-center rounded-sm bg-white/80">
  {#if props.prefix}
    <div class="px-2 whitespace-nowrap select-none">{@render props.prefix()}</div>
  {/if}
  <input
    type="text"
    class={[props.class, "h-full w-full rounded-sm px-2"]}
    readonly={props.readonly ?? false}
    disabled={props.readonly ?? false}
    autocomplete="off"
    value={props.value}
    inputmode={props.inputmode ?? "text"}
    oninput={props.oninput}
  />
  {#if props.suffix}
    <div class="px-2 whitespace-nowrap select-none">{@render props.suffix()}</div>
  {/if}
</div>
