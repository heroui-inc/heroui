import {ssrSmoke} from "@heroui/testing/helpers";

import {Disclosure} from "@/components/disclosure";
import {DisclosureGroup} from "@/components/disclosure-group";

describe("DisclosureGroup SSR", () => {
  it("renders without hydration mismatch with one expanded item", async () => {
    const {html} = await ssrSmoke(
      <DisclosureGroup data-testid="disclosure-group" defaultExpandedKeys={["preview"]}>
        <Disclosure aria-label="Preview" id="preview">
          <Disclosure.Heading>
            <Disclosure.Trigger>
              Preview
              <Disclosure.Indicator />
            </Disclosure.Trigger>
          </Disclosure.Heading>
          <Disclosure.Content>
            <Disclosure.Body>Preview content</Disclosure.Body>
          </Disclosure.Content>
        </Disclosure>
        <Disclosure aria-label="Download" id="download">
          <Disclosure.Heading>
            <Disclosure.Trigger>
              Download
              <Disclosure.Indicator />
            </Disclosure.Trigger>
          </Disclosure.Heading>
          <Disclosure.Content>
            <Disclosure.Body>Download content</Disclosure.Body>
          </Disclosure.Content>
        </Disclosure>
      </DisclosureGroup>,
    );

    expect(html).toContain('data-slot="disclosure-group"');
    expect(html).toContain('aria-expanded="true"');
  });
});
