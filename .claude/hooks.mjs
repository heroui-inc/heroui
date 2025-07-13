/* eslint-disable no-console */
// .claude/hooks.mjs
import {execSync} from "child_process";
import path from "path";

// Hook that runs before editing files
export async function preEdit({filePath}) {
  // Check if editing TypeScript/JavaScript files
  if (filePath.match(/\.(ts|tsx|js|jsx)$/)) {
    // Ensure file is properly formatted before edit
    try {
      execSync(`pnpm prettier --check "${filePath}"`, {stdio: "pipe"});
    } catch (e) {
      console.log("⚠️  File needs formatting - will format after edit");
    }
  }

  // Prevent editing of certain protected files
  const protectedFiles = ["yarn.lock", "package-lock.json", ".env.production", "firebase.json"];
  const fileName = path.basename(filePath);

  if (protectedFiles.includes(fileName)) {
    throw new Error(`❌ Cannot edit protected file: ${fileName}`);
  }

  return {proceed: true};
}

// Hook that runs after editing files
export async function postEdit({filePath, success}) {
  if (!success) return;

  // Run linting and auto-fix on TypeScript/JavaScript files
  if (filePath.match(/\.(ts|tsx|js|jsx)$/)) {
    try {
      execSync(`pnpm lint --fix "${filePath}"`, {stdio: "pipe"});
      console.log("✅ Lint fixes applied");
    } catch (e) {
      console.log("⚠️  Lint errors detected - please review");
    }
  }

  // Run type checking on TypeScript files
  if (filePath.match(/\.(ts|tsx)$/)) {
    try {
      execSync(`npx tsc --noEmit --skipLibCheck "${filePath}"`, {stdio: "pipe"});
    } catch (e) {
      console.log("⚠️  TypeScript errors detected - please review");
    }
  }
}
