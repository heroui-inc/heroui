import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {Checkbox} from "@/components/checkbox";
import {Table} from "@/components/table";

import "@/styles.css";

const rows = [
  {id: "1", name: "Kate"},
  {id: "2", name: "John"},
];

const selection = (label: string) => (
  <Checkbox aria-label={label} slot="selection">
    <Checkbox.Content>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
    </Checkbox.Content>
  </Checkbox>
);

const fixture = () => (
  <Table>
    <Table.ScrollContainer>
      <Table.Content aria-label="Team" selectionMode="multiple">
        <Table.Header>
          <Table.Column>{selection("Select all")}</Table.Column>
          <Table.Column isRowHeader>Member</Table.Column>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id} id={row.id}>
              <Table.Cell>{selection(`Select ${row.name}`)}</Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
);

const fieldOf = (name: string) =>
  page.getByRole("checkbox", {name}).element().closest('[data-slot="checkbox"]')!;

const controlOf = (name: string) =>
  fieldOf(name).querySelector<HTMLElement>('[data-slot="checkbox-control"]')!;

/** Running CSS transitions on a checkbox field, its descendants, and their pseudo-elements. */
const transitionsIn = (field: Element) =>
  field
    .getAnimations({subtree: true})
    .filter((animation): animation is CSSTransition => animation instanceof CSSTransition)
    .map((transition) => {
      const effect = transition.effect as KeyframeEffect;

      return {
        property: transition.transitionProperty,
        target: `${(effect.target as Element).getAttribute("data-slot")}${effect.pseudoElement ?? ""}`,
      };
    });

describe("Table (browser)", () => {
  describe("select-all checkbox", () => {
    // Chrome composites `background-color` transitions through a paint worklet. When the
    // compositor finishes such a transition one frame before Blink does (a 200ms transition
    // ends exactly on a 60Hz vsync), that frame is painted with the transition's start color,
    // so the header flashed back to the indeterminate fill right after fading out (HHTA-1056).
    it("supports fading the indeterminate fill out without a background-color transition", async () => {
      await render(fixture());
      const header = fieldOf("Select all");

      // The pointer stays where an earlier test file left it, which can be over the header
      // checkbox. Move it off and let the hover fill settle so only the indeterminate exit is seen.
      await userEvent.hover(page.getByRole("rowheader", {name: "Kate"}));
      await Promise.all(header.getAnimations({subtree: true}).map(({finished}) => finished));

      await userEvent.click(controlOf("Select Kate"));
      expect(header).toHaveAttribute("data-indeterminate", "true");

      await userEvent.click(controlOf("Select Kate"));
      expect(header).not.toHaveAttribute("data-indeterminate");

      const transitions = transitionsIn(header);

      expect(transitions.filter(({property}) => property === "background-color")).toEqual([]);
      expect(transitions).toContainEqual({property: "opacity", target: "checkbox-control::before"});
    });
  });
});
