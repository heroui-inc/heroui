import type {ReactNode} from "react";

import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Tag} from "@/components/tag";
import {TagGroup} from "@/components/tag-group";

// The remove button's pressable area lives in CSS, so this suite needs the compiled stylesheet
// rather than the Tailwind sources. Every `pnpm test*` entry point builds `@heroui/styles` first.
import "../../../../styles/dist/heroui.min.css";

/** WCAG 2.5.8 (Target Size, Minimum). */
const MIN_TARGET_SIZE = 24;

/** Furthest offset from the centre that must still be pressable, kept inside the box edge. */
const REACH = MIN_TARGET_SIZE / 2 - 1;

const sizes = ["sm", "md", "lg"] as const;

// The padding keeps the tags clear of the viewport edges, where `elementFromPoint` returns null
// for points that are inside the target but outside the document. It is inline because the
// compiled stylesheet only ships the utilities HeroUI itself uses.
const Padded = ({children}: {children: ReactNode}) => <div style={{padding: 24}}>{children}</div>;

const RemovableTags = ({size}: {size: (typeof sizes)[number]}) => (
  <TagGroup aria-label="Removable animals" size={size} onRemove={() => {}}>
    <TagGroup.List>
      <Tag id="cat">Cat</Tag>
      <Tag id="dog">Dog</Tag>
    </TagGroup.List>
  </TagGroup>
);

const PlainTags = ({size}: {size: (typeof sizes)[number]}) => (
  <TagGroup aria-label="Plain animals" size={size}>
    <TagGroup.List>
      <Tag id="cat">Cat</Tag>
      <Tag id="dog">Dog</Tag>
    </TagGroup.List>
  </TagGroup>
);

/** `data-slot` of the element hit at a point offset from the centre of `element`. */
const hitSlotAt = (element: Element, dx: number, dy: number) => {
  const {height, left, top, width} = element.getBoundingClientRect();
  const hit = document.elementFromPoint(left + width / 2 + dx, top + height / 2 + dy);

  return hit?.closest("[data-slot]")?.getAttribute("data-slot") ?? null;
};

const removeButtonOf = (tagName: string) =>
  page.getByRole("button", {name: `Remove tag ${tagName}`}).element();

describe("Tag (browser)", () => {
  describe("remove button target size", () => {
    for (const size of sizes) {
      it(`exposes a pressable area of at least the minimum touch size on ${size}`, async () => {
        await render(
          <Padded>
            <RemovableTags size={size} />
          </Padded>,
        );

        const removeButton = removeButtonOf("Dog");
        const offsets: [number, number][] = [
          [0, 0],
          [REACH, 0],
          [-REACH, 0],
          [0, REACH],
          [0, -REACH],
        ];

        for (const [dx, dy] of offsets) {
          expect(hitSlotAt(removeButton, dx, dy)).toBe("tag-remove-button");
        }
      });
    }

    it("keeps the tag height unchanged", async () => {
      const screen = await render(
        <Padded>
          <RemovableTags size="sm" />
          <PlainTags size="sm" />
        </Padded>,
      );

      const removable = screen
        .getByRole("grid", {name: "Removable animals"})
        .getByRole("row", {name: "Dog"})
        .element();
      const plain = screen
        .getByRole("grid", {name: "Plain animals"})
        .getByRole("row", {name: "Dog"})
        .element();

      // The overlay is absolutely positioned, so it must not grow the tag it sits in.
      expect(removable.getBoundingClientRect().height).toBe(plain.getBoundingClientRect().height);
    });

    it("leaves the tag body and neighbouring tags pressable", async () => {
      await render(
        <Padded>
          <RemovableTags size="sm" />
        </Padded>,
      );

      const dog = page.getByRole("row", {name: "Dog"}).element();
      const cat = page.getByRole("row", {name: "Cat"}).element();
      const dogRect = dog.getBoundingClientRect();
      const catRect = cat.getBoundingClientRect();

      const atLabel = document.elementFromPoint(dogRect.left + 4, dogRect.top + dogRect.height / 2);
      const atNeighbourEdge = document.elementFromPoint(
        catRect.right - 1,
        catRect.top + catRect.height / 2,
      );

      expect(atLabel?.closest("[data-slot]")?.getAttribute("data-slot")).toBe("tag");
      expect(atNeighbourEdge?.closest('[data-slot="tag"]')).toBe(cat);
    });
  });
});
