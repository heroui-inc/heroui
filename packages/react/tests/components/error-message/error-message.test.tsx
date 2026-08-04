import type {Key} from "react-aria-components";

import {render, screen, setupUser} from "@heroui/testing/helpers";
import {useMemo, useState} from "react";

import {ErrorMessage} from "@/components/error-message";
import {Label} from "@/components/label";
import {Tag} from "@/components/tag";
import {TagGroup} from "@/components/tag-group";

describe("ErrorMessage", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot and BEM block standalone", () => {
    render(<ErrorMessage>Something went wrong</ErrorMessage>);

    const message = document.querySelector('[data-slot="error-message"]');

    expect(message).not.toBeNull();
    expect(message?.className).toEqual(expect.stringContaining("error-message"));
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders when TagGroup exposes the errorMessage slot", () => {
    render(
      <TagGroup selectionMode="multiple">
        <Label>Amenities</Label>
        <TagGroup.List>
          <Tag id="laundry">Laundry</Tag>
        </TagGroup.List>
        <ErrorMessage>Please select at least one category</ErrorMessage>
      </TagGroup>,
    );

    expect(document.querySelector('[data-slot="error-message"]')).not.toBeNull();
    expect(screen.getByText("Please select at least one category")).toBeInTheDocument();
  });

  it("supports gating by selection state inside TagGroup", async () => {
    const Example = () => {
      const [selected, setSelected] = useState<Iterable<Key>>(new Set());
      const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected]);

      return (
        <TagGroup selectedKeys={selected} selectionMode="multiple" onSelectionChange={setSelected}>
          <Label>Amenities</Label>
          <TagGroup.List>
            <Tag id="laundry">Laundry</Tag>
          </TagGroup.List>
          {!!isInvalid && <ErrorMessage>Please select at least one category</ErrorMessage>}
        </TagGroup>
      );
    };

    render(<Example />);

    expect(screen.getByText("Please select at least one category")).toBeInTheDocument();

    await user.click(screen.getByRole("row", {name: "Laundry"}));

    expect(screen.queryByText("Please select at least one category")).toBeNull();
  });
});
