import {ssrSmoke} from "@heroui/testing/helpers";

import {Disclosure} from "@/components/disclosure";

describe("Disclosure SSR", () => {
  it("renders without hydration mismatch when defaultExpanded", async () => {
    const {html} = await ssrSmoke(
      <Disclosure defaultExpanded data-testid="disclosure">
        <Disclosure.Heading>
          <Disclosure.Trigger>
            Toggle content
            <Disclosure.Indicator />
          </Disclosure.Trigger>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body>Hidden content revealed on expand.</Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>,
    );

    expect(html).toContain('data-slot="disclosure"');
    expect(html).toContain('aria-expanded="true"');
  });
});
