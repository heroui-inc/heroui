import type {Browser, Page} from "playwright";

import * as fs from "fs";
import * as path from "path";

import {chromium} from "playwright";
import {afterAll, beforeAll, describe, expect, inject, it} from "vitest";

const SNAPSHOTS_DIR = path.join(process.cwd(), "__visual_snapshots__");
const TEMP_DIR = path.join(process.cwd(), "__visual_snapshots_temporary__");
const STORYBOOK_URL = "http://localhost:6006";
const TABS_COUNT = 10;
const BROWSER_WIDTH = 1280;
const BROWSER_HEIGHT = 720;

const DISABLE_ANIMATIONS_DELAY = 200;
const ACQUIRE_PAGE_TIMEOUT = 10;
const DISABLE_ANIMATIONS_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
`;

const ignoredStoriesSet = new Set(["📝-todo-calendar--docs", "welcome--docs"]);

function loadStories() {
  const index = inject("__STORYBOOK_INDEX__");

  return Object.entries(index.entries)
    .filter(([, entry]) => entry.id.endsWith("--docs") && !ignoredStoriesSet.has(entry.id))
    .map(([, entry]) => entry);
}

describe("Visual Regression Tests", () => {
  let browser: Browser;
  let availablePages: Page[] = [];
  const stories = loadStories();

  const acquirePage = (): Promise<Page> => {
    return new Promise((resolve) => {
      const tryAcquire = () => {
        const page = availablePages.pop();

        if (page) {
          resolve(page);
        } else {
          setTimeout(tryAcquire, ACQUIRE_PAGE_TIMEOUT);
        }
      };

      tryAcquire();
    });
  };

  const releasePage = (page: Page) => {
    availablePages.push(page);
  };

  beforeAll(async () => {
    fs.mkdirSync(SNAPSHOTS_DIR, {recursive: true});
    fs.mkdirSync(TEMP_DIR, {recursive: true});

    browser = await chromium.launch({headless: true});

    const pagePromises = Array.from({length: TABS_COUNT}, async () => {
      const page = await browser.newPage();

      await page.setViewportSize({height: BROWSER_HEIGHT, width: BROWSER_WIDTH});

      return page;
    });

    availablePages = await Promise.all(pagePromises);
  });

  afterAll(async () => {
    await browser.close();
    fs.rmSync(TEMP_DIR, {force: true, recursive: true});
  });

  it.concurrent.each(stories)("$title/$name", async (story) => {
    const page = await acquirePage();

    try {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=${story.id}`, {
        waitUntil: "networkidle",
      });
      await page.addStyleTag({
        content: DISABLE_ANIMATIONS_CSS,
      });
      await page.waitForTimeout(DISABLE_ANIMATIONS_DELAY);

      const screenshotPath = path.join(TEMP_DIR, `${story.id}.png`);

      await page.locator("#storybook-docs").screenshot({path: screenshotPath});

      await expect(screenshotPath).toMatchImageSnapshot({
        failureThreshold: 0.01,
        failureThresholdType: "percent",
        method: "bin",
        snapshotIdentifier: story.id,
        snapshotsDir: SNAPSHOTS_DIR,
      });
      releasePage(page);
    } catch (error) {
      releasePage(page);
      throw error;
    }
  });
});
