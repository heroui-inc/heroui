import type {ComponentProps} from "react";

import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {Accordion} from "@/components/accordion";

// The hover background lives entirely in CSS, and the custom `hover:bg-surface` override under
// test is a Tailwind utility, so this suite compiles the Tailwind sources instead of the
// prebuilt stylesheet.
import "@/styles.css";

const TRIGGER_LABEL = "Set up notifications";

const VARIANTS = ["default", "surface"] as const;

type RenderOptions = ComponentProps<typeof Accordion> & {triggerClassName?: string};

// `vitest-browser-react` cannot render a fragment, so the probe shares a plain wrapper with the
// accordion instead.
const renderAccordion = ({triggerClassName, ...props}: RenderOptions = {}) =>
  render(
    <div>
      <Accordion {...props}>
        <Accordion.Item id="notifications">
          <Accordion.Heading>
            {/* `transition-none` mirrors the docs customization example, so the background under
                test is whatever the cascade resolves to rather than an interpolated value. */}
            <Accordion.Trigger
              className={["transition-none", triggerClassName].filter(Boolean).join(" ")}
            >
              {TRIGGER_LABEL}
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>Receive account activity updates.</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {/* `hover:bg-surface` resolves to whatever `bg-surface` paints, so the expected color comes
          from the token itself rather than from another component that happens to share it. */}
      <div className="bg-surface" data-testid="surface-probe" />
    </div>,
  );

const backgroundOf = (element: Element) => getComputedStyle(element).backgroundColor;

const triggerElement = () => page.getByRole("button", {name: TRIGGER_LABEL}).element();

const surfaceBackground = () => backgroundOf(page.getByTestId("surface-probe").element());

/**
 * The pointer keeps the position an earlier test left it at, so it can already sit over a freshly
 * rendered trigger. Moving it off first makes the sampled background a real baseline instead of a
 * hover background in disguise.
 */
const restingBackgroundOf = async (element: Element) => {
  await userEvent.unhover(element);

  return backgroundOf(element);
};

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
      await renderAccordion({triggerClassName: "hover:bg-surface", variant: "surface"});

      const trigger = triggerElement();

      await userEvent.hover(trigger);

      expect(backgroundOf(trigger)).toBe(surfaceBackground());
    });

    it.each(VARIANTS)(
      "renders no hover background on a stale data-hovered with variant=%s",
      async (variant) => {
        await renderAccordion({variant});

        const trigger = triggerElement();
        const resting = await restingBackgroundOf(trigger);

        staleHoverAttribute(trigger);

        expect(backgroundOf(trigger)).toBe(resting);
      },
    );

    it.each(VARIANTS)(
      "renders the default hover background while the pointer is over the trigger with variant=%s",
      async (variant) => {
        await renderAccordion({variant});

        const trigger = triggerElement();
        const resting = await restingBackgroundOf(trigger);

        await userEvent.hover(trigger);
        await expect.poll(() => backgroundOf(trigger)).not.toBe(resting);

        await userEvent.unhover(trigger);
        await expect.poll(() => backgroundOf(trigger)).toBe(resting);
      },
    );
  });
});
