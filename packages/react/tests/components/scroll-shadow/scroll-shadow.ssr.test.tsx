import {ssrSmoke} from "@heroui/testing/helpers";

import {ScrollShadow} from "@/components/scroll-shadow";

describe("ScrollShadow SSR", () => {
  it("renders without hydration mismatch with scrollable content", async () => {
    const {html} = await ssrSmoke(
      <ScrollShadow data-testid="scroll-shadow">Scrollable content</ScrollShadow>,
    );

    expect(html).toContain('data-slot="scroll-shadow"');
  });

  // The server cannot measure overflow, so the scroll-state attributes only arrive after
  // hydration. Shipping the mode attribute is what lets CSS paint the correct fade first.
  it("ships the auto shadow mode so the fade needs no measurement", async () => {
    const {html} = await ssrSmoke(
      <ScrollShadow data-testid="scroll-shadow">Scrollable content</ScrollShadow>,
    );

    expect(html).toContain('data-scroll-shadow-mode="auto"');
  });

  it("ships the shadow size and offset variables", async () => {
    const {html} = await ssrSmoke(
      <ScrollShadow data-testid="scroll-shadow" offset={20} size={64}>
        Scrollable content
      </ScrollShadow>,
    );

    expect(html).toContain("--scroll-shadow-size:64px");
    expect(html).toContain("--scroll-shadow-offset:20px");
  });

  it("ships the manual shadow mode when visibility is controlled", async () => {
    const {html} = await ssrSmoke(
      <ScrollShadow data-testid="scroll-shadow" visibility="both">
        Scrollable content
      </ScrollShadow>,
    );

    expect(html).toContain('data-scroll-shadow-mode="manual"');
  });
});
