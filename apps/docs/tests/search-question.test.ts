import {describe, expect, it} from "vitest";

import {readsAsQuestion} from "@/lib/search-question";

describe("readsAsQuestion", () => {
  it.each([
    "how can I merge",
    "how ",
    "what's a slot",
    "why does the sheet close",
    "can I use it with Next.js",
    "is there a dark theme",
    "does it support RTL",
    "I want a sidebar",
    "I'm getting a hydration error",
    "show me a table example",
    "help me set up theming",
    "explain variants",
    "button colors?",
    "can’t I nest tabs",
  ])("reads %j as a question", (query) => {
    expect(readsAsQuestion(query)).toBe(true);
  });

  it.each([
    "",
    "how",
    "hover card",
    "button",
    "date picker",
    "input otp",
    "show more",
    "can",
    "isInvalid",
    "do not",
  ])("reads %j as a search", (query) => {
    expect(readsAsQuestion(query)).toBe(false);
  });
});
