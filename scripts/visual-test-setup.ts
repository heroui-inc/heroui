import type {StorybookIndex} from "../vitest.shims.d";
import type {ChildProcess} from "child_process";
import type {TestProject} from "vitest/node";

import {spawn} from "child_process";
import {mkdirSync} from "fs";
import {createServer} from "net";
import {join} from "path";

const STORYBOOK_PORT = 6006;
const STORYBOOK_HOST = "localhost";
const STARTUP_TIMEOUT = 60_000;
const STORYBOOK_URL = `http://${STORYBOOK_HOST}:${STORYBOOK_PORT}`;

let storybookProcess: ChildProcess | null = null;

async function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = createServer();

    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

async function waitForStorybook(port: number, timeout: number): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const elapsed = Math.round((Date.now() - startTime) / 1000);

    process.stdout.write(`\x1b[0G\x1b[K⧗ Waiting for Storybook... (${elapsed}s)`);

    try {
      const response = await fetch(`http://${STORYBOOK_HOST}:${port}/iframe.html`);

      if (response.ok) {
        process.stdout.write(`\x1b[0G\x1b[K✓ Storybook is ready`);

        return;
      }
    } catch {
      // Not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Storybook failed to start within ${timeout}ms`);
}

export default async function globalSetup(project: TestProject): Promise<() => void> {
  const portAvailable = await isPortAvailable(STORYBOOK_PORT);

  if (!portAvailable) {
    process.stdout.write(`⧗ Port ${STORYBOOK_PORT} in use, checking existing Storybook...`);
    await waitForStorybook(STORYBOOK_PORT, 10000);
  } else {
    process.stdout.write(`⧗ Starting Storybook...`);

    storybookProcess = spawn("pnpm", ["dev"], {
      cwd: process.cwd(),
      detached: false,
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    storybookProcess.stdout?.on("data", (data) => {
      const output = data.toString();

      if (process.env.DEBUG_STORYBOOK) {
        // eslint-disable-next-line no-console
        console.log("[Storybook]", output);
      }
    });

    storybookProcess.stderr?.on("data", (data) => {
      const output = data.toString();

      if (!output.includes("WARN") && process.env.DEBUG_STORYBOOK) {
        // eslint-disable-next-line no-console
        console.error("[Storybook Error]", output);
      }
    });

    await waitForStorybook(STORYBOOK_PORT, STARTUP_TIMEOUT);
  }

  const response = await fetch(`${STORYBOOK_URL}/index.json`);
  const index = (await response.json()) as StorybookIndex;

  const tempDir = join(process.cwd(), "__visual_snapshots_temporary__");

  mkdirSync(tempDir, {recursive: true});
  project.provide("__STORYBOOK_INDEX__", index);

  return () => {
    if (storybookProcess) {
      storybookProcess.kill();
    }
  };
}
