import type {ComponentProps} from "react";

import {render} from "@heroui/testing/browser";

import {Checkbox} from "@/components/checkbox";
import {Label} from "@/components/label";

import "@/styles.css";

const DASH = '[data-slot="checkbox-default-indicator--indeterminate"]';

const fixture = (props: ComponentProps<typeof Checkbox> = {}) => (
  <Checkbox {...props}>
    <Checkbox.Content>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Label>Select all</Label>
    </Checkbox.Content>
  </Checkbox>
);

/** CSS transitions running on an element, or on one of its pseudo-elements. */
const transitionsOf = (target: Element, pseudoElement: string | null = null) =>
  document.getAnimations().filter((animation): animation is CSSTransition => {
    const effect = animation.effect as KeyframeEffect | null;

    return (
      animation instanceof CSSTransition &&
      effect?.target === target &&
      effect.pseudoElement === pseudoElement
    );
  });

const opacityTransitionOf = (target: Element, pseudoElement: string | null = null) =>
  transitionsOf(target, pseudoElement).find(
    (transition) => transition.transitionProperty === "opacity",
  );

const opacityOf = (target: Element, pseudoElement?: string) =>
  Number(getComputedStyle(target, pseudoElement).opacity);

const variants = [
  {name: "primary", props: {}},
  {name: "secondary", props: {variant: "secondary"}},
  {name: "invalid", props: {isInvalid: true}},
] as const;

describe("Checkbox (browser)", () => {
  describe("indeterminate exit", () => {
    for (const {name, props} of variants) {
      it(`supports fading the fill and dash out together (${name})`, async () => {
        const view = await render(fixture({...props, isIndeterminate: true}));
        const control = document.querySelector('[data-slot="checkbox-control"]')!;

        expect(opacityOf(control, "::before")).toBe(1);
        expect(opacityOf(document.querySelector(DASH)!)).toBe(1);

        await view.rerender(fixture(props));

        const dash = document.querySelector(DASH);

        expect(dash).not.toBeNull();
        expect(
          transitionsOf(control).map((transition) => transition.transitionProperty),
        ).not.toContain("background-color");

        const fill = opacityTransitionOf(control, "::before");
        const fade = opacityTransitionOf(dash!);

        expect(fill).toBeDefined();
        expect(fade).toBeDefined();

        const midpoint = Number(fill!.effect!.getComputedTiming().duration) / 2;

        for (const transition of [fill!, fade!]) {
          transition.pause();
          transition.currentTime = midpoint;
        }

        const fillOpacity = opacityOf(control, "::before");

        expect(fillOpacity).toBeGreaterThan(0);
        expect(fillOpacity).toBeLessThan(1);
        expect(opacityOf(dash!)).toBeCloseTo(fillOpacity, 2);

        for (const transition of [fill!, fade!]) transition.finish();

        expect(opacityOf(control, "::before")).toBe(0);
        expect(opacityOf(dash!)).toBe(0);
      });
    }
  });
});
