import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Accordion} from "@/components/accordion";

const renderAccordion = (props: ComponentProps<typeof Accordion> = {}) => {
  return render(
    <Accordion data-testid="accordion" {...props}>
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
      <Accordion.Item isDisabled id="faq-3">
        <Accordion.Heading>
          <Accordion.Trigger>
            Disabled question
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>Never shown.</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>,
  );
};

describe("Accordion", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot, BEM block, and compound part slots", () => {
    renderAccordion();

    const root = screen.getByTestId("accordion");

    expect(root).toHaveAttribute("data-slot", "accordion");
    expect(root.className).toEqual(expect.stringContaining("accordion"));
    expect(document.querySelectorAll('[data-slot="accordion-item"]')).toHaveLength(3);
    expect(document.querySelectorAll('[data-slot="accordion-trigger"]')).toHaveLength(3);
    expect(document.querySelectorAll('[data-slot="accordion-heading"]')).toHaveLength(3);
    expect(document.querySelectorAll('[data-slot="accordion-panel"]')).toHaveLength(3);
    expect(document.querySelectorAll('[data-slot="accordion-indicator"]')).toHaveLength(3);
  });

  it("exposes variant BEM modifier", () => {
    renderAccordion({variant: "surface"});

    expect(screen.getByTestId("accordion").className).toEqual(
      expect.stringContaining("accordion--surface"),
    );
  });

  it("supports expanding a panel via its trigger", async () => {
    renderAccordion();

    const trigger = screen.getByRole("button", {name: "How do I place an order?"});

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Browse our products and proceed to checkout.")).not.toBeVisible();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Browse our products and proceed to checkout.")).toBeVisible();
  });

  it("supports expanding a panel via keyboard (Enter/Space)", async () => {
    renderAccordion();

    const trigger = screen.getByRole("button", {name: "How do I place an order?"});

    await user.tab();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports single expanded item by default", async () => {
    renderAccordion();

    const first = screen.getByRole("button", {name: "How do I place an order?"});
    const second = screen.getByRole("button", {name: "Can I modify my order?"});

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("supports multiple expanded items with allowsMultipleExpanded", async () => {
    renderAccordion({allowsMultipleExpanded: true});

    const first = screen.getByRole("button", {name: "How do I place an order?"});
    const second = screen.getByRole("button", {name: "Can I modify my order?"});

    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onExpandedChange with the expanded keys", async () => {
    const onExpandedChange = vi.fn();

    renderAccordion({onExpandedChange});

    await user.click(screen.getByRole("button", {name: "How do I place an order?"}));

    expect(onExpandedChange).toHaveBeenCalledWith(new Set(["faq-1"]));
  });

  it("supports disabled items without expanding", async () => {
    renderAccordion();

    const disabledTrigger = screen.getByRole("button", {name: "Disabled question"});

    expect(disabledTrigger).toBeDisabled();

    await user.click(disabledTrigger);

    expect(disabledTrigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Never shown.")).not.toBeVisible();
  });

  it("exposes data-expanded on the indicator", async () => {
    renderAccordion();

    const indicator = document.querySelector('[data-slot="accordion-indicator"]');

    expect(indicator).not.toHaveAttribute("data-expanded");

    await user.click(screen.getByRole("button", {name: "How do I place an order?"}));

    expect(indicator).toHaveAttribute("data-expanded", "true");
  });

  it("exposes data-hide-separator when hideSeparator is set", () => {
    renderAccordion({hideSeparator: true});

    const items = document.querySelectorAll('[data-slot="accordion-item"]');

    items.forEach((item) => {
      expect(item).toHaveAttribute("data-hide-separator", "true");
    });
  });
});
