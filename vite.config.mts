import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  base: "/margherita",
  test: {},
});
