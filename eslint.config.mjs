import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";

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
