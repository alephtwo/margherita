<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";
  let { children }: SvelteHTMLElements["div"] = $props();
</script>

<div class="w-full rounded-sm border border-slate-500 bg-slate-100/50 p-4">
  {@render children?.()}
</div>
