import {describe, expect, it} from "vitest";

import {withoutPrivateUrls} from "@/components/plausible-analytics";

type Payload = Parameters<typeof withoutPrivateUrls>[0];

function sent(u: string, r: string | null = null) {
  return withoutPrivateUrls({d: "heroui.com", n: "pageview", r, u} as Payload);
}

describe("Plausible's URLs", () => {
  it("keeps only the source parameters", () => {
    expect(sent("https://heroui.com/docs/react?utm_source=x&q=button&gclid=1").u).toBe(
      "https://heroui.com/docs/react?utm_source=x",
    );
  });

  it("never sends a fragment", () => {
    expect(sent("https://heroui.com/docs/react/components/button#usage").u).toBe(
      "https://heroui.com/docs/react/components/button",
    );
  });

  it("cleans a referrer from heroui.com, and leaves others", () => {
    expect(sent("https://heroui.com/docs", "https://heroui.com/?q=modal&ref=x").r).toBe(
      "https://heroui.com/?ref=x",
    );
    expect(sent("https://heroui.com/", "https://github.com/heroui-inc").r).toBe(
      "https://github.com/heroui-inc",
    );
  });
});
