import {dirname} from "path";
import {fileURLToPath} from "url";

import {FlatCompat} from "@eslint/eslintrc";
import {defineConfig} from "eslint/config";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import storybookPlugin from "eslint-plugin-storybook";
import globals from "globals";

import baseConfig from "./base.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...baseConfig,
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ),
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2025,
        JSX: true,
        React: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      storybook: storybookPlugin,
    },
    rules: {
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "jsx-a11y/no-autofocus": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": ["warn", {allowConstantExport: true}],
      "react/jsx-boolean-value": [
        "error",
        "never",
        {
          always: ["personal"],
        },
      ],
      "react/jsx-curly-brace-presence": [
        "error",
        {
          children: "never",
          props: "never",
        },
      ],
      "react/jsx-no-leaked-render": [
        "error",
        {
          validStrategies: ["coerce", "ternary"],
        },
      ],
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          ignoreCase: true,
          locale: "auto",
          multiline: "last",
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
        },
      ],
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
