import type {ReactNode} from "react";

import {render} from "@heroui/testing/browser";

import {Description} from "@/components/description";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";

// Item layout (icon shrink, label wrapping) lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const ICON_SIZE = 16;
const LONG_WORD = "Entlassungsanfragebearbeitung";

// Inline sizes: the compiled stylesheet only ships the utilities HeroUI itself uses.
const Icon = () => <svg aria-hidden data-testid="icon" height={ICON_SIZE} width={ICON_SIZE} />;

const Column = ({children}: {children: ReactNode}) => (
  <div style={{display: "flex", flexDirection: "column"}}>{children}</div>
);

const renderListBox = (width: number, items: {id: string; content: ReactNode}[]) =>
  render(
    <div style={{width}}>
      <ListBox aria-label="Actions">
        {items.map(({content, id}) => (
          <ListBox.Item key={id} id={id} textValue={id}>
            {content}
          </ListBox.Item>
        ))}
      </ListBox>
    </div>,
  );

const getItems = () => Array.from(document.querySelectorAll<HTMLElement>(".list-box-item"));

const iconWidth = (item: HTMLElement) =>
  item.querySelector('[data-testid="icon"]')!.getBoundingClientRect().width;

const labelOffset = (item: HTMLElement) =>
  item.querySelector('[data-slot="label"]')!.getBoundingClientRect().left -
  item.getBoundingClientRect().left;

const labelHeight = (item: HTMLElement) =>
  item.querySelector('[data-slot="label"]')!.getBoundingClientRect().height;

const overflowsItem = (item: HTMLElement) => item.scrollWidth > item.clientWidth;

describe("ListBox (browser)", () => {
  describe("item layout", () => {
    it("keeps icons at full size and labels aligned when a label wraps", async () => {
      await renderListBox(224, [
        {
          content: (
            <>
              <Icon />
              <Label>New file</Label>
            </>
          ),
          id: "new",
        },
        {
          content: (
            <>
              <Icon />
              <Label>Open a recently used project from disk</Label>
            </>
          ),
          id: "open",
        },
      ]);

      const [short, wrapped] = getItems();

      // Guard the scenario: the second label must actually wrap onto more lines than the first.
      expect(labelHeight(wrapped!)).toBeGreaterThan(labelHeight(short!));
      expect(iconWidth(short!)).toBe(ICON_SIZE);
      expect(iconWidth(wrapped!)).toBe(ICON_SIZE);
      expect(labelOffset(wrapped!)).toBe(labelOffset(short!));
    });

    it("wraps a long unbroken word inside the item", async () => {
      await renderListBox(150, [
        {
          content: (
            <>
              <Icon />
              <Label>{LONG_WORD}</Label>
            </>
          ),
          id: "long",
        },
      ]);

      const [item] = getItems();

      expect(iconWidth(item!)).toBe(ICON_SIZE);
      expect(overflowsItem(item!)).toBe(false);
    });

    it("wraps a long unbroken word when the label sits in a wrapper with a description", async () => {
      await renderListBox(150, [
        {
          content: (
            <>
              <Icon />
              <Column>
                <Label>{LONG_WORD}</Label>
                <Description>Details</Description>
              </Column>
            </>
          ),
          id: "long",
        },
      ]);

      const [item] = getItems();

      expect(iconWidth(item!)).toBe(ICON_SIZE);
      expect(overflowsItem(item!)).toBe(false);
    });
  });
});
