import type {Key} from "@react-types/shared";

import {render} from "@heroui/testing/browser";
import {useState} from "react";
import {useFilter} from "react-aria-components/Autocomplete";
import {page} from "vitest/browser";

import {Autocomplete} from "@/components/autocomplete";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";
import {SearchField} from "@/components/search-field";
import {Tag} from "@/components/tag";
import {TagGroup} from "@/components/tag-group";

// The tag remove button's pressable area is defined in CSS, so this suite needs the compiled
// stylesheet rather than the Tailwind sources. `@heroui/styles` is built by the root
// `postinstall`, which is also what CI relies on before running tests.
import "../../../../styles/dist/heroui.min.css";

/** WCAG 2.5.8 (Target Size, Minimum). */
const MIN_TARGET_SIZE = 24;

const animals = [
  {id: "cat", name: "Cat"},
  {id: "dog", name: "Dog"},
  {id: "panda", name: "Panda"},
];

const AutocompleteMultipleFixture = () => {
  const {contains} = useFilter({sensitivity: "base"});
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(["cat", "dog", "panda"]);

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="Select animals"
      selectionMode="multiple"
      value={selectedKeys}
      onChange={(keys) => setSelectedKeys(keys as Key[])}
    >
      <Label>Favorite Animals</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value>
          {({defaultChildren, isPlaceholder, state}) => {
            if (isPlaceholder || state.selectedItems.length === 0) {
              return defaultChildren;
            }

            return (
              <TagGroup
                aria-label="Selected animals"
                size="sm"
                onRemove={(keys) => setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)))}
              >
                <TagGroup.List>
                  {state.selectedItems.map((selectedItem) => {
                    const item = animals.find((animal) => animal.id === selectedItem.key);

                    if (!item) return null;

                    return (
                      <Tag key={item.id} id={item.id}>
                        {item.name}
                      </Tag>
                    );
                  })}
                </TagGroup.List>
              </TagGroup>
            );
          }}
        </Autocomplete.Value>
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search animals..." />
            </SearchField.Group>
          </SearchField>
          <ListBox>
            {animals.map((item) => (
              <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                {item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
};

/** Element hit at a point offset from the centre of `element`, as a `data-slot` name. */
const hitSlotAt = (element: Element, dx: number, dy: number) => {
  const {height, left, top, width} = element.getBoundingClientRect();
  const hit = document.elementFromPoint(left + width / 2 + dx, top + height / 2 + dy);

  return hit?.closest("[data-slot]")?.getAttribute("data-slot") ?? null;
};

describe("Autocomplete (browser)", () => {
  describe("multiple selection with tags", () => {
    it("exposes a tag remove target of at least the minimum touch size", async () => {
      await render(<AutocompleteMultipleFixture />);

      const removeButton = page.getByRole("button", {name: "Remove tag Dog"}).element();
      const {height, width} = removeButton.getBoundingClientRect();

      // The glyph itself stays small; only the pressable area grows.
      expect(width).toBeLessThan(MIN_TARGET_SIZE);
      expect(height).toBeLessThan(MIN_TARGET_SIZE);

      const reach = MIN_TARGET_SIZE / 2 - 1;
      const offsets: [number, number][] = [
        [0, 0],
        [reach, 0],
        [-reach, 0],
        [0, reach],
        [0, -reach],
      ];

      for (const [dx, dy] of offsets) {
        expect(hitSlotAt(removeButton, dx, dy)).toBe("tag-remove-button");
      }
    });

    it("removes the tag on the first press near the edge of the target", async () => {
      const screen = await render(<AutocompleteMultipleFixture />);

      const removeButton = page.getByRole("button", {name: "Remove tag Dog"});
      const {height, width} = removeButton.element().getBoundingClientRect();
      const reach = MIN_TARGET_SIZE / 2 - 1;

      // `position` is relative to the element's top-left corner, so this aims `reach` px to the
      // left of the glyph's centre. Missing the glyph by that much used to land on the tag body,
      // which consumes the press and removes nothing — the reason removing a tag by touch took
      // several attempts.
      await removeButton.click({position: {x: width / 2 - reach, y: height / 2}});

      await expect.element(screen.getByRole("row", {name: "Dog"})).not.toBeInTheDocument();
      await expect.element(screen.getByRole("row", {name: "Cat"})).toBeInTheDocument();
      await expect.element(screen.getByRole("row", {name: "Panda"})).toBeInTheDocument();
    });
  });
});
