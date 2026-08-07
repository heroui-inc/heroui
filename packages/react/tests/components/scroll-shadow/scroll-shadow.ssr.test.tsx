import {ssrSmoke} from "@heroui/testing/helpers";

import {ScrollShadow} from "@/components/scroll-shadow";

describe("ScrollShadow SSR", () => {
  it("renders without hydration mismatch with scrollable content", async () => {
    const {html} = await ssrSmoke(
      <ScrollShadow data-testid="scroll-shadow">Scrollable content</ScrollShadow>,
    );

    expect(html).toContain('data-slot="scroll-shadow"');
  });
});
