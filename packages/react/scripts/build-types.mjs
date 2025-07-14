/* eslint-disable no-console */
import {execSync} from "child_process";
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function generateTypes() {
  console.log("📝 Generating TypeScript declarations...");

  // Create a temporary tsconfig for building types only
  const tsconfigBuild = {
    extends: "./tsconfig.json",
    compilerOptions: {
      declaration: true,
      declarationMap: false,
      emitDeclarationOnly: true,
      outDir: "./dist",
      rootDir: "./src",
      skipLibCheck: true,
      noEmit: false,
    },
    include: ["src"],
    exclude: ["node_modules", "**/*.stories.*", "**/*.test.*", "dist", ".rollup.cache"],
  };

  // Write temporary tsconfig
  const tsconfigPath = path.join(rootDir, "tsconfig.build.json");

  await fs.writeJson(tsconfigPath, tsconfigBuild, {spaces: 2});

  try {
    // Run TypeScript compiler
    execSync("npx tsc --project tsconfig.build.json", {
      stdio: "inherit",
      cwd: rootDir,
    });

    console.log("✅ TypeScript declarations generated successfully");
  } catch (error) {
    console.error("❌ Failed to generate TypeScript declarations:", error);
    throw error;
  } finally {
    // Clean up temporary tsconfig
    await fs.remove(tsconfigPath);
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateTypes().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export {generateTypes};
