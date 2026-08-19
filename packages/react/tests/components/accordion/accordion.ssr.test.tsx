import {ssrSmoke} from "@heroui/testing/helpers";

import {Accordion} from "@/components/accordion";

describe("Accordion SSR", () => {
  it("renders without hydration mismatch with one expanded item", async () => {
    const {html} = await ssrSmoke(
      <Accordion data-testid="accordion" defaultExpandedKeys={["faq-1"]}>
        <Accordion.Item id="faq-1">
          <Accordion.Heading>
            <Accordion.Trigger>
              How do I place an order?
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>Browse our products and proceed to checkout.</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id="faq-2">
          <Accordion.Heading>
            <Accordion.Trigger>
              Can I modify my order?
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>Yes, before it ships.</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>,
    );

    expect(html).toContain('data-slot="accordion"');
    expect(html).toContain('data-expanded="true"');
  });
});
