import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {Accordion} from "@/components/accordion";

// The hover background lives entirely in CSS, and the custom `hover:bg-surface` override under
// test is a Tailwind utility, so this suite compiles the Tailwind sources instead of the
// prebuilt stylesheet.
import "@/styles.css";

const TRIGGER_LABEL = "Set up notifications";

const CustomHoverAccordion = () => (
  <Accordion data-testid="accordion" variant="surface">
    <Accordion.Item id="notifications">
      <Accordion.Heading>
        {/* `transition-none` mirrors the docs customization example, so the background under
            test is whatever the cascade resolves to rather than an interpolated value. */}
        <Accordion.Trigger className="transition-none hover:bg-surface">
          {TRIGGER_LABEL}
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>Receive account activity updates.</Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

const DefaultHoverAccordion = () => (
  <Accordion data-testid="accordion" variant="surface">
    <Accordion.Item id="notifications">
      <Accordion.Heading>
        <Accordion.Trigger>
          {TRIGGER_LABEL}
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>Receive account activity updates.</Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

const backgroundOf = (element: Element) => getComputedStyle(element).backgroundColor;

const triggerElement = () => page.getByRole("button", {name: TRIGGER_LABEL}).element();

const accordionElement = () => page.getByTestId("accordion").element();

/**
 * React Aria writes `data-hovered` from a React render, so the attribute outlives the native
 * `:hover` after the pointer leaves. Reproducing that window by hand keeps the assertion
 * deterministic instead of depending on which frame the browser paints.
 */
const staleHoverAttribute = (element: Element) => {
  element.setAttribute("data-hovered", "true");

  onTestFinished(() => element.removeAttribute("data-hovered"));
};

describe("Accordion (browser)", () => {
  describe("trigger hover background", () => {
    it("supports a custom hover background over the default one", async () => {
      await render(<CustomHoverAccordion />);

      const trigger = triggerElement();

      await userEvent.hover(trigger);

      // `hover:bg-surface` resolves to the same token the surface accordion paints itself with.
      expect(backgroundOf(trigger)).toBe(backgroundOf(accordionElement()));
    });

    it("renders no default hover background while the pointer is away", async () => {
      await render(<CustomHoverAccordion />);

      const trigger = triggerElement();
      const resting = backgroundOf(trigger);

      staleHoverAttribute(trigger);

      expect(backgroundOf(trigger)).toBe(resting);
    });

    it("renders the default hover background while the pointer is over the trigger", async () => {
      await render(<DefaultHoverAccordion />);

      const trigger = triggerElement();
      const resting = backgroundOf(trigger);

      await userEvent.hover(trigger);
      await expect.poll(() => backgroundOf(trigger)).not.toBe(resting);

      await userEvent.unhover(trigger);
      await expect.poll(() => backgroundOf(trigger)).toBe(resting);
    });
  });
});
