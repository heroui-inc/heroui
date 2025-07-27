/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import {readFileSync} from "fs";

import {defineConfig} from "tsup";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

const replaceVersionPlugin = {
  name: "replace-version",
  setup(build: any) {
    build.onLoad({filter: /version\.(ts|js)$/}, async (args: any) => {
      const contents = await readFileSync(args.path, "utf8");
      const replaced = contents.replace(/__HEROUI_VERSION__/g, packageJson.version);

      return {
        contents: replaced,
        loader: args.path.endsWith(".ts") ? "ts" : "js",
      };
    });
  },
};

export default defineConfig({
  clean: false,
  dts: {
    // Skip type checking for external modules
    compilerOptions: {
      skipDefaultLibCheck: true,
      skipLibCheck: true,
    },
    // Generate .d.ts files
    resolve: true,
  },
  entry: ["index.ts", "plugin.ts"],
  esbuildPlugins: [replaceVersionPlugin],
  // Don't clean dist folder to preserve generated CSS files
  external: [],
  // Bundle @heroui/utils and dist imports into the output
  format: ["esm"],

  minify: false,
  // Bundle everything including ./dist/ imports
  noExternal: ["@heroui/utils", /^\.\/dist\//],
  onSuccess: async () => {
    console.log("✅ Build completed successfully");
  },
  treeshake: true,
});
