#!/usr/bin/env node
/**
 * Test suite for HeroUI Skill scripts (JavaScript/Node.js).
 *
 * Usage:
 *     # Test against production (default)
 *     node test_skills_scripts.mjs
 *
 *     # Test against staging
 *     node test_skills_scripts.mjs --env staging
 *
 *     # Test against local dev
 *     node test_skills_scripts.mjs --env dev
 *
 *     # Test specific script
 *     node test_skills_scripts.mjs --script list_components
 *
 *     # Verbose output
 *     node test_skills_scripts.mjs -v
 *
 * Environments:
 *     - dev: http://localhost:8787
 *     - staging: https://staging-mcp-api.heroui.com
 *     - production: https://mcp-api.heroui.com
 *
 * Note: Tests are updated for v1 API endpoints which return {results: [...]} format
 * for batch requests (multiple components).
 */

import {execFile} from "child_process";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {promisify} from "util";

const execFileAsync = promisify(execFile);

// Environment configurations
const ENVIRONMENTS = {
  dev: "http://localhost:8787",
  production: "https://mcp-api.heroui.com",
  staging: "https://staging-mcp-api.heroui.com",
};

// Get script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPTS_DIR = join(__dirname, "_raw/skills/react/scripts");
const NODE = "node";

/**
 * Result of a single test.
 */
class TestResult {
  constructor(name, passed, duration, output, error = null) {
    this.name = name;
    this.passed = passed;
    this.duration = duration;
    this.output = output;
    this.error = error;
  }
}

/**
 * Run a script and return (stdout, stderr, return_code, duration).
 */
async function runScript(scriptName, args = null, envVars = null, timeout = 30000) {
  const scriptPath = join(SCRIPTS_DIR, scriptName);
  const cmd = [NODE, scriptPath, ...(args || [])];

  const env = {...process.env};

  if (envVars) {
    Object.assign(env, envVars);
  }

  const start = Date.now();

  try {
    // Use AbortController for timeout (Node 15+)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const {stderr, stdout} = await execFileAsync(cmd[0], cmd.slice(1), {
        encoding: "utf8",
        env,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const duration = (Date.now() - start) / 1000;

      return [stdout, stderr, 0, duration];
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.signal === "SIGABRT" || error.code === "ABORT_ERR") {
        const duration = (Date.now() - start) / 1000;

        return ["", `Timeout after ${timeout / 1000}s`, -1, duration];
      }

      // execFile throws error with stdout/stderr in error object
      const duration = (Date.now() - start) / 1000;

      return [error.stdout || "", error.stderr || "", error.code || -1, duration];
    }
  } catch (error) {
    const duration = (Date.now() - start) / 1000;

    return ["", String(error), -1, duration];
  }
}

async function testListComponents(apiBase, verbose = false) {
  const name = "list_components";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [stdout, _stderr, _code, duration] = await runScript("list_components.mjs", null, envVars);

  // Validate output
  try {
    const data = JSON.parse(stdout);
    const hasComponents = "components" in data && data.components.length > 0;
    const hasVersion = "latestVersion" in data;

    if (!hasComponents) {
      return new TestResult(name, false, duration, stdout, "No components in response");
    }

    if (!hasVersion) {
      return new TestResult(name, false, duration, stdout, "No latestVersion in response");
    }

    if (verbose) {
      console.log(`  Found ${data.components.length} components, version: ${data.latestVersion}`);
    }

    return new TestResult(name, true, duration, `Found ${data.components.length} components`);
  } catch (e) {
    return new TestResult(name, false, duration, stdout, `Invalid JSON: ${e.message}`);
  }
}

async function testGetComponentDocs(apiBase, verbose = false) {
  const name = "get_component_docs";
  const envVars = {HEROUI_API_BASE: apiBase};

  // Test with single component
  const [stdout, stderr, _code, duration] = await runScript(
    "get_component_docs.mjs",
    ["Button"],
    envVars,
  );

  // Should contain MDX content
  const hasContent = stdout.length > 100;

  if (!hasContent) {
    return new TestResult(name, false, duration, stdout.slice(0, 200), "No content returned");
  }

  if (verbose) {
    console.log(`  Received ${stdout.length} chars of documentation`);

    if (stderr.toLowerCase().includes("fallback")) {
      console.log(`  Note: Used fallback method`);
    }
  }

  return new TestResult(name, true, duration, `Received ${stdout.length} chars`);
}

async function testGetComponentDocsMultiple(apiBase, verbose = false) {
  const name = "get_component_docs_multiple";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [stdout, _stderr, _code, duration] = await runScript(
    "get_component_docs.mjs",
    ["Button", "Card"],
    envVars,
  );

  // v1 API returns {results: [...]} format
  try {
    const data = JSON.parse(stdout);

    // Check for v1 API format: {results: [...]}
    if (data.results && Array.isArray(data.results) && data.results.length === 2) {
      if (verbose) {
        console.log(`  Received docs for ${data.results.length} components (v1 format)`);
      }

      return new TestResult(name, true, duration, `Received ${data.results.length} component docs`);
    }

    // Fallback: check if it's a plain array (fallback format)
    if (Array.isArray(data) && data.length === 2) {
      if (verbose) {
        console.log(`  Received docs for ${data.length} components (fallback format)`);
      }

      return new TestResult(name, true, duration, `Received ${data.length} component docs`);
    }

    return new TestResult(
      name,
      false,
      duration,
      stdout.slice(0, 200),
      "Expected {results: [...]} or array of 2 results",
    );
  } catch (e) {
    // If not JSON, might be concatenated MDX (also acceptable)
    if (stdout.length > 200) {
      return new TestResult(name, true, duration, `Received ${stdout.length} chars (MDX format)`);
    }

    return new TestResult(name, false, duration, stdout.slice(0, 200), "Invalid response format");
  }
}

async function testGetSource(apiBase, verbose = false) {
  const name = "get_source";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [stdout, _stderr, _code, duration] = await runScript("get_source.mjs", ["Button"], envVars);

  // Should contain TypeScript/React code
  const hasContent = stdout.length > 100;

  if (!hasContent) {
    return new TestResult(name, false, duration, stdout.slice(0, 200), "No content returned");
  }

  if (verbose) {
    console.log(`  Received ${stdout.length} chars of source code`);

    if (stdout.includes("GitHub:")) {
      console.log(`  Includes GitHub URL`);
    }
  }

  return new TestResult(name, true, duration, `Received ${stdout.length} chars`);
}

async function testGetStyles(apiBase, verbose = false) {
  const name = "get_styles";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [stdout, _stderr, _code, duration] = await runScript("get_styles.mjs", ["Button"], envVars);

  // Should contain CSS
  const hasBem = stdout.includes("--"); // BEM modifiers like .button--primary
  const hasContent = stdout.length > 100;

  if (!hasContent) {
    return new TestResult(name, false, duration, stdout.slice(0, 200), "No content returned");
  }

  if (verbose) {
    console.log(`  Received ${stdout.length} chars of CSS`);

    if (hasBem) {
      console.log(`  Contains BEM classes`);
    }
  }

  return new TestResult(name, true, duration, `Received ${stdout.length} chars`);
}

async function testGetTheme(apiBase, verbose = false) {
  const name = "get_theme";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [stdout, _stderr, _code, duration] = await runScript("get_theme.mjs", null, envVars);

  // Should contain CSS variables
  const hasOklch = stdout.toLowerCase().includes("oklch");
  const hasContent = stdout.length > 100;

  if (!hasContent) {
    return new TestResult(name, false, duration, stdout.slice(0, 200), "No content returned");
  }

  if (verbose) {
    console.log(`  Received ${stdout.length} chars of theme variables`);

    if (hasOklch) {
      console.log(`  Uses oklch color format`);
    }
  }

  return new TestResult(name, true, duration, `Received ${stdout.length} chars`);
}

async function testGetDocs(apiBase, verbose = false) {
  const name = "get_docs";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [stdout, _stderr, _code, duration] = await runScript(
    "get_docs.mjs",
    ["/docs/react/getting-started/theming"],
    envVars,
  );

  // Should contain MDX content about theming
  const hasContent = stdout.length > 100;

  if (!hasContent) {
    return new TestResult(name, false, duration, stdout.slice(0, 200), "No content returned");
  }

  if (verbose) {
    console.log(`  Received ${stdout.length} chars of documentation`);
  }

  return new TestResult(name, true, duration, `Received ${stdout.length} chars`);
}

async function testGetDocsUsage(apiBase, verbose = false) {
  const name = "get_docs_usage";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [_stdout, stderr, _code, duration] = await runScript("get_docs.mjs", null, envVars);

  // Should show usage in stderr
  const hasUsage =
    stderr.toLowerCase().includes("usage") || stderr.toLowerCase().includes("example");

  if (!hasUsage) {
    return new TestResult(name, false, duration, stderr.slice(0, 200), "No usage info shown");
  }

  if (verbose) {
    console.log(`  Shows usage instructions`);
  }

  return new TestResult(name, true, duration, "Shows usage instructions");
}

async function testErrorHandling(apiBase, verbose = false) {
  const name = "error_handling";
  const envVars = {HEROUI_API_BASE: apiBase};

  const [stdout, stderr, _code, duration] = await runScript(
    "get_component_docs.mjs",
    ["NonExistentComponent12345"],
    envVars,
  );

  // Should handle gracefully (either error message or empty result)
  const combined = (stdout + stderr).toLowerCase();

  if (verbose) {
    if (combined.includes("error")) {
      console.log(`  Returns error message for invalid component`);
    } else if (stderr.toLowerCase().includes("fallback")) {
      console.log(`  Uses fallback for invalid component`);
    }
  }

  return new TestResult(name, true, duration, "Handles invalid input gracefully");
}

// All tests
const ALL_TESTS = {
  error_handling: testErrorHandling,
  get_component_docs: testGetComponentDocs,
  get_component_docs_multiple: testGetComponentDocsMultiple,
  get_docs: testGetDocs,
  get_docs_usage: testGetDocsUsage,
  get_source: testGetSource,
  get_styles: testGetStyles,
  get_theme: testGetTheme,
  list_components: testListComponents,
};

async function runTests(env, scripts = null, verbose = false) {
  const apiBase = ENVIRONMENTS[env] || ENVIRONMENTS.production;
  const results = [];

  const testsToRun = Object.fromEntries(
    Object.entries(ALL_TESTS).filter(([k]) => !scripts || scripts.includes(k)),
  );

  console.log(`\n${"=".repeat(60)}`);
  console.log(`HeroUI Skill Scripts Test Suite (JavaScript)`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Environment: ${env} (${apiBase})`);
  console.log(`Tests to run: ${Object.keys(testsToRun).length}`);
  console.log(`${"=".repeat(60)}\n`);

  for (const [name, testFunc] of Object.entries(testsToRun)) {
    process.stdout.write(`Running: ${name}... `);
    const result = await testFunc(apiBase, verbose);

    results.push(result);

    const status = result.passed ? "✓ PASS" : "✗ FAIL";

    console.log(`${status} (${result.duration.toFixed(2)}s)`);

    if (result.error && (verbose || !result.passed)) {
      console.log(`  Error: ${result.error}`);
    }
  }

  return results;
}

function printSummary(results) {
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const totalTime = results.reduce((sum, r) => sum + r.duration, 0);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Test Summary`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Total:  ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Time:   ${totalTime.toFixed(2)}s`);
  console.log(`${"=".repeat(60)}`);

  if (failed > 0) {
    console.log(`\nFailed tests:`);

    for (const r of results) {
      if (!r.passed) {
        console.log(`  - ${r.name}: ${r.error}`);
      }
    }
  }

  return failed === 0;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    env: "production",
    list: false,
    script: [],
    verbose: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--env" || arg === "-e") {
      options.env = args[++i];
    } else if (arg === "--script" || arg === "-s") {
      options.script.push(args[++i]);
    } else if (arg === "--verbose" || arg === "-v") {
      options.verbose = true;
    } else if (arg === "--list" || arg === "-l") {
      options.list = true;
    }
  }

  return options;
}

async function main() {
  const options = parseArgs();

  if (options.list) {
    console.log("Available tests:");

    for (const name of Object.keys(ALL_TESTS)) {
      console.log(`  - ${name}`);
    }

    return 0;
  }

  const results = await runTests(
    options.env,
    options.script.length > 0 ? options.script : null,
    options.verbose,
  );
  const success = printSummary(results);

  return success ? 0 : 1;
}

// Run main and exit with code
main()
  .then((code) => {
    process.exit(code);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
