import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Disclosure} from "@/components/disclosure";
import {DisclosureGroup} from "@/components/disclosure-group";

const renderGroup = (props: ComponentProps<typeof DisclosureGroup> = {}) =>
  render(
    <DisclosureGroup data-testid="disclosure-group" {...props}>
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

describe("DisclosureGroup", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot and BEM block", () => {
    renderGroup();

    const group = screen.getByTestId("disclosure-group");

    expect(group).toHaveAttribute("data-slot", "disclosure-group");
    expect(group.className).toEqual(expect.stringContaining("disclosure-group"));
  });

  it("renders each Disclosure trigger", () => {
    renderGroup();

    expect(screen.getByRole("button", {name: "Preview"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Download"})).toBeInTheDocument();
  });

  it("supports single expanded item by default", async () => {
    renderGroup();

    const preview = screen.getByRole("button", {name: "Preview"});
    const download = screen.getByRole("button", {name: "Download"});

    await user.click(preview);
    expect(preview).toHaveAttribute("aria-expanded", "true");

    await user.click(download);
    expect(download).toHaveAttribute("aria-expanded", "true");
    expect(preview).toHaveAttribute("aria-expanded", "false");
  });

  it("supports multiple expanded items with allowsMultipleExpanded", async () => {
    renderGroup({allowsMultipleExpanded: true});

    const preview = screen.getByRole("button", {name: "Preview"});
    const download = screen.getByRole("button", {name: "Download"});

    await user.click(preview);
    await user.click(download);

    expect(preview).toHaveAttribute("aria-expanded", "true");
    expect(download).toHaveAttribute("aria-expanded", "true");
  });

  it("supports controlled expandedKeys + onExpandedChange", async () => {
    const onExpandedChange = vi.fn();

    renderGroup({expandedKeys: new Set(["preview"]), onExpandedChange});

    expect(screen.getByRole("button", {name: "Preview"})).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", {name: "Download"}));

    expect(onExpandedChange).toHaveBeenCalledWith(new Set(["download"]));
  });

  it("supports group disabled state on all items", () => {
    renderGroup({isDisabled: true});

    expect(screen.getByRole("button", {name: "Preview"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Download"})).toBeDisabled();
  });
});
