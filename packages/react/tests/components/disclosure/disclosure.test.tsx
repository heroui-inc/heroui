import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Disclosure} from "@/components/disclosure";

const renderDisclosure = (props: ComponentProps<typeof Disclosure> = {}) =>
  render(
    <Disclosure data-testid="disclosure" {...props}>
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

describe("Disclosure", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot, BEM block, and compound part slots", () => {
    renderDisclosure();

    const root = screen.getByTestId("disclosure");

    expect(root).toHaveAttribute("data-slot", "disclosure");
    expect(root.className).toEqual(expect.stringContaining("disclosure"));
    expect(document.querySelector('[data-slot="disclosure-heading"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="disclosure-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="disclosure-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="disclosure-indicator"]')).not.toBeNull();
  });

  it("supports expanding via the trigger", async () => {
    renderDisclosure();

    const trigger = screen.getByRole("button", {name: "Toggle content"});

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Hidden content revealed on expand.")).not.toBeVisible();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden content revealed on expand.")).toBeVisible();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Hidden content revealed on expand.")).not.toBeVisible();
  });

  it("supports expanding via keyboard (Enter/Space)", async () => {
    renderDisclosure();

    const trigger = screen.getByRole("button", {name: "Toggle content"});

    await user.tab();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports defaultExpanded", () => {
    renderDisclosure({defaultExpanded: true});

    expect(screen.getByRole("button", {name: "Toggle content"})).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Hidden content revealed on expand.")).toBeInTheDocument();
  });

  it("supports controlled isExpanded + onExpandedChange", async () => {
    const onExpandedChange = vi.fn();

    renderDisclosure({isExpanded: false, onExpandedChange});

    await user.click(screen.getByRole("button", {name: "Toggle content"}));

    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("Hidden content revealed on expand.")).not.toBeVisible();
  });

  it("supports disabled state without toggling", async () => {
    renderDisclosure({isDisabled: true});

    const trigger = screen.getByRole("button", {name: "Toggle content"});

    expect(trigger).toBeDisabled();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("exposes data-expanded on the indicator", async () => {
    renderDisclosure();

    const indicator = document.querySelector('[data-slot="disclosure-indicator"]');

    expect(indicator).not.toHaveAttribute("data-expanded");

    await user.click(screen.getByRole("button", {name: "Toggle content"}));

    expect(indicator).toHaveAttribute("data-expanded", "true");
  });
});
