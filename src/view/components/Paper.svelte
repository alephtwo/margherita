<script lang="ts">
  let { children } = $props();
</script>

<div class="w-full rounded-sm border border-slate-500 bg-slate-100/50 p-4">
  {@render children()}
</div>
