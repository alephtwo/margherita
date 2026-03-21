<script lang="ts">
  let { children } = $props();
</script>

<div class="w-full p-4 bg-slate-100/50 border border-slate-500 rounded-sm">
  {@render children()}
</div>
