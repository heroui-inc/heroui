import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "./node_modules/@tailwindcss/vite/dist/index.mjs";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["@storybook/theming", "@mdx-js/react"],
  },
});
