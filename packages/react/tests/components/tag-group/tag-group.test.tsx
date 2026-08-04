import type {Selection} from "react-aria-components";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Tag} from "@/components/tag";
import {TagGroup} from "@/components/tag-group";

describe("TagGroup", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot and BEM block on root and list", () => {
    render(
      <TagGroup aria-label="Categories" selectionMode="single">
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    const list = document.querySelector('[data-slot="tag-group-list"]');

    expect(document.querySelector('[data-slot="tag-group"]')?.className).toEqual(
      expect.stringContaining("tag-group"),
    );
    expect(list?.className).toEqual(expect.stringContaining("tag-group__list"));
    expect(document.querySelectorAll('[data-slot="tag"]')).toHaveLength(2);
  });

  it("renders each Tag as a row within the grid", () => {
    render(
      <TagGroup aria-label="Categories" selectionMode="single">
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(2);
    expect(screen.getByRole("row", {name: "News"})).toBeInTheDocument();
  });

  it("supports composing with a Label", () => {
    render(
      <TagGroup selectionMode="single">
        <Label>Amenities</Label>
        <TagGroup.List>
          <Tag id="laundry">Laundry</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    expect(screen.getByRole("grid", {name: "Amenities"})).toBeInTheDocument();
  });

  it("calls onSelectionChange when single selection is toggled", async () => {
    const onSelectionChange = vi.fn();

    render(
      <TagGroup
        aria-label="Categories"
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    const news = screen.getByRole("row", {name: "News"});

    expect(news).toHaveAttribute("aria-selected", "false");

    await user.click(news);

    expect(news).toHaveAttribute("aria-selected", "true");
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    const selection = onSelectionChange.mock.calls[0]?.[0] as Selection;

    expect(selection === "all" ? null : [...selection]).toEqual(["news"]);
  });

  it("supports multiple selection", async () => {
    const onSelectionChange = vi.fn();

    render(
      <TagGroup
        aria-label="Categories"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    await user.click(screen.getByRole("row", {name: "News"}));
    await user.click(screen.getByRole("row", {name: "Travel"}));

    const lastCallSelection = onSelectionChange.mock.calls.at(-1)?.[0] as Selection;

    expect(lastCallSelection === "all" ? null : [...lastCallSelection].sort()).toEqual([
      "news",
      "travel",
    ]);
  });

  it("exposes individually disabled tags", () => {
    render(
      <TagGroup aria-label="Categories" selectionMode="single">
        <TagGroup.List>
          <Tag isDisabled id="news">
            News
          </Tag>
          <Tag id="travel">Travel</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    expect(screen.getByRole("row", {name: "News"})).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("row", {name: "Travel"})).not.toHaveAttribute("aria-disabled", "true");
  });

  it("supports disabledKeys on the group", () => {
    render(
      <TagGroup aria-label="Categories" disabledKeys={["news"]} selectionMode="single">
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    expect(screen.getByRole("row", {name: "News"})).toHaveAttribute("aria-disabled", "true");
  });

  it("renders a default remove button and calls onRemove", async () => {
    const onRemove = vi.fn();

    render(
      <TagGroup aria-label="Categories" selectionMode="single" onRemove={onRemove}>
        <TagGroup.List>
          <Tag id="news">News</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    expect(document.querySelector('[data-slot="tag-remove-button"]')).not.toBeNull();

    await user.click(screen.getByRole("button", {name: "Remove tag News"}));

    expect(onRemove).toHaveBeenCalledTimes(1);
    const removedKeys = onRemove.mock.calls[0]?.[0] as Selection;

    expect(removedKeys === "all" ? null : [...removedKeys]).toEqual(["news"]);
  });

  it("exposes size and variant Tag BEM modifiers", () => {
    render(
      <TagGroup aria-label="Categories" selectionMode="single" size="lg" variant="surface">
        <TagGroup.List>
          <Tag id="news">News</Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    const row = screen.getByRole("row", {name: "News"});

    expect(row.className).toEqual(expect.stringContaining("tag--lg"));
    expect(row.className).toEqual(expect.stringContaining("tag--surface"));
  });
});
