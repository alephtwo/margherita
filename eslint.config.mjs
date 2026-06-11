import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";
import ts from "typescript-eslint";

export default defineConfig(
  js.configs.recommended,
  globalIgnores(["dist/**", "coverage/**", "reports/**"]),
  {
    files: ["**/*.mts"],
    extends: [js.configs.recommended, ...ts.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.svelte"],
    extends: [
      js.configs.recommended,
      ...ts.configs.recommendedTypeChecked,
      ...svelte.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
