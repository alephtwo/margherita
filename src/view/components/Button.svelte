<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLButtonAttributes } from "svelte/elements";

  interface Props {
    children: Snippet;
    color?: "green" | "red";
    class?: HTMLButtonAttributes["class"];
    onclick: () => void;
    fullwidth?: boolean;
    disabled?: boolean;
  }

  let props: Props = $props();
</script>

<button
  disabled={props.disabled}
  onclick={props.disabled ? undefined : props.onclick}
  class={[
    props.class,
    {
      "bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-700 disabled:border-emerald-300 disabled:bg-emerald-300":
        props.color ?? "green" === "green",
    },
    {
      "bg-red-500 text-white hover:bg-red-600 focus:bg-red-700 disabled:border-red-300 disabled:bg-red-300":
        props.color === "red",
    },
    "bg inline-flex h-12 items-center justify-center gap-2 rounded px-6 text-sm font-medium tracking-wide whitespace-nowrap  transition duration-300  focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none",
  ]}
  class:w-full={props.fullwidth === true}
>
  {@render props.children?.()}
</button>
