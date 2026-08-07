import {ssrSmoke} from "@heroui/testing/helpers";

import {Button} from "@/components/button";

describe("Button SSR", () => {
  it("renders without hydration mismatch", async () => {
    const {html} = await ssrSmoke(<Button>Save</Button>);

    expect(html).toContain('data-slot="button"');
  });

  it("renders without hydration mismatch when disabled", async () => {
    const {html} = await ssrSmoke(<Button isDisabled>Save</Button>);

    expect(html).toContain('data-disabled="true"');
  });
});
