/* eslint-disable no-console */
import {execSync} from "child_process";
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function generateTypes() {
  console.log("📝 Generating TypeScript declarations...");

  // Extend the shared React tsconfig so declaration emit uses the same strictness
  // as `pnpm typecheck` (verbatimModuleSyntax, noUncheckedIndexedAccess, etc.).
  // The shared base sets noEmit: true; override it here for emit-only.
  const tsconfigBuild = {
    extends: "@heroui/standard/tsconfig/react.json",
    compilerOptions: {
      noEmit: false,
      emitDeclarationOnly: true,
      declaration: true,
      declarationMap: false,
      outDir: "./dist",
      rootDir: "./src",
      jsx: "react-jsx",
      baseUrl: ".",
    },
    include: ["src"],
    exclude: ["node_modules", "**/*.stories.*", "**/*.test.*", "dist", ".rollup.cache"],
  };

  const tsconfigPath = path.join(rootDir, "tsconfig.build.json");

  await fs.writeJson(tsconfigPath, tsconfigBuild, {spaces: 2});

  try {
    console.log("Running tsc with tsconfig.build.json...");
    execSync("pnpm exec tsc --project tsconfig.build.json", {
      stdio: "inherit",
      cwd: rootDir,
    });

    console.log("✅ TypeScript declarations generated successfully");
  } catch (error) {
    console.error("❌ Failed to generate TypeScript declarations:", error);
    throw error;
  } finally {
    await fs.remove(tsconfigPath);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateTypes().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export {generateTypes};
