import {default as tailwindcss} from "@tailwindcss/vite";
import {default as react} from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["@storybook/theming", "@mdx-js/react"],
  },
  plugins: [react(), tailwindcss()],
});
