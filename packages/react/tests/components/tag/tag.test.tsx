import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Tag} from "@/components/tag";
import {TagGroup} from "@/components/tag-group";

// Tag requires TagGroup/TagList ancestor.
const renderTag = () =>
  render(
    <TagGroup aria-label="Categories" selectionMode="single" onRemove={vi.fn()}>
      <TagGroup.List>
        <Tag id="news">News</Tag>
      </TagGroup.List>
    </TagGroup>,
  );

describe("Tag", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders with row role and accessible name", () => {
    renderTag();

    expect(screen.getByRole("row", {name: "News"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    renderTag();
    const tag = screen.getByRole("row", {name: "News"});

    expect(tag).toHaveAttribute("data-slot", "tag");
    expect(tag.className).toEqual(expect.stringContaining("tag"));
  });

  it("supports a custom RemoveButton child instead of the default", async () => {
    const onRemove = vi.fn();

    render(
      <TagGroup aria-label="Categories" selectionMode="single" onRemove={onRemove}>
        <TagGroup.List>
          <Tag id="news">
            News
            <Tag.RemoveButton data-testid="custom-remove" />
          </Tag>
        </TagGroup.List>
      </TagGroup>,
    );

    expect(screen.getByTestId("custom-remove")).toBeInTheDocument();
    expect(document.querySelectorAll('[data-slot="tag-remove-button"]')).toHaveLength(1);

    await user.click(screen.getByTestId("custom-remove"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
