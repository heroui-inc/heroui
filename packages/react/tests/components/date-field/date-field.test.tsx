import type {DateValue} from "@internationalized/date";
import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {DateField} from "@/components/date-field";
import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";

const renderDateField = (props: Partial<ComponentProps<typeof DateField>> = {}) =>
  render(
    <DateField name="date" {...props}>
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>,
  );

describe("DateField", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders segmented spinbuttons for month, day, and year", () => {
    renderDateField({defaultValue: new CalendarDate(2026, 8, 15)});

    const segments = screen.getAllByRole("spinbutton");

    expect(segments).toHaveLength(3);
    expect(screen.getByRole("spinbutton", {name: /month/i})).toHaveTextContent("8");
    expect(screen.getByRole("spinbutton", {name: /day/i})).toHaveTextContent("15");
    expect(screen.getByRole("spinbutton", {name: /year/i})).toHaveTextContent("2026");
  });

  it("exposes data-slots and BEM block", () => {
    renderDateField();

    expect(document.querySelector('[data-slot="date-field"]')?.className).toEqual(
      expect.stringContaining("date-field"),
    );
    expect(document.querySelector('[data-slot="date-input-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="date-input-group-input"]')).not.toBeNull();
    expect(
      document.querySelectorAll('[data-slot="date-input-group-segment"][role="spinbutton"]').length,
    ).toBe(3);
  });

  it("exposes variant BEM modifier on Group", () => {
    render(
      <DateField name="date">
        <Label>Date</Label>
        <DateField.Group variant="secondary">
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>,
    );

    expect(document.querySelector('[data-slot="date-input-group"]')?.className).toEqual(
      expect.stringContaining("date-input-group--secondary"),
    );
  });

  it("supports fullWidth prop as a BEM modifier", () => {
    renderDateField({fullWidth: true});

    expect(document.querySelector('[data-slot="date-field"]')?.className).toEqual(
      expect.stringContaining("date-field--full-width"),
    );
  });

  it("calls onChange when a segment is incremented or decremented", async () => {
    const onChange = vi.fn();

    renderDateField({defaultValue: new CalendarDate(2026, 8, 15), onChange});

    const day = screen.getByRole("spinbutton", {name: /day/i});

    await user.click(day);
    await user.keyboard("{ArrowUp}");

    expect(onChange).toHaveBeenCalled();
    let value = onChange.mock.calls.at(-1)?.[0] as DateValue;

    expect(value.toString()).toBe("2026-08-16");

    await user.keyboard("{ArrowDown}");
    value = onChange.mock.calls.at(-1)?.[0] as DateValue;
    expect(value.toString()).toBe("2026-08-15");
  });

  it("supports typing digits into segments to build a full date", async () => {
    const onChange = vi.fn();

    renderDateField({onChange});

    const month = screen.getByRole("spinbutton", {name: /month/i});

    await user.click(month);
    await user.keyboard("01022026");

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls.at(-1)?.[0] as DateValue;

    expect(value.toString()).toBe("2026-01-02");
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <DateField name="date" value={new CalendarDate(2026, 8, 15)} onChange={onChange}>
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>,
    );

    expect(screen.getByRole("spinbutton", {name: /year/i})).toHaveTextContent("2026");

    rerender(
      <DateField name="date" value={new CalendarDate(2027, 1, 1)} onChange={onChange}>
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>,
    );

    expect(screen.getByRole("spinbutton", {name: /year/i})).toHaveTextContent("2027");
    expect(screen.getByRole("spinbutton", {name: /month/i})).toHaveTextContent("1");
  });

  it("supports isRequired and shows FieldError when isInvalid", () => {
    render(
      <DateField isInvalid isRequired name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <FieldError>Please enter a valid date</FieldError>
      </DateField>,
    );

    expect(document.querySelector('[data-slot="date-field"]')).toHaveAttribute(
      "data-required",
      "true",
    );
    expect(screen.getByText("Please enter a valid date")).toBeInTheDocument();
  });

  it("exposes accessible description via Description", () => {
    render(
      <DateField name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Enter a date</Description>
      </DateField>,
    );

    expect(document.querySelector('[data-slot="description"]')).not.toBeNull();
    expect(screen.getByText("Enter a date")).toBeInTheDocument();
  });

  it("supports disabled state and blocks value changes", async () => {
    const onChange = vi.fn();

    renderDateField({
      defaultValue: new CalendarDate(2026, 8, 15),
      isDisabled: true,
      onChange,
    });

    const day = screen.getByRole("spinbutton", {name: /day/i});

    await user.click(day);
    await user.keyboard("{ArrowUp}");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports prefix and suffix composition data-slots", () => {
    render(
      <DateField name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Prefix>
            <span>prefix</span>
          </DateField.Prefix>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
          <DateField.Suffix>
            <span>suffix</span>
          </DateField.Suffix>
        </DateField.Group>
      </DateField>,
    );

    expect(document.querySelector('[data-slot="date-input-group-prefix"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="date-input-group-suffix"]')).not.toBeNull();
  });

  it("supports focus-visible via keyboard", async () => {
    renderDateField({defaultValue: new CalendarDate(2026, 8, 15)});

    await user.tab();
    const month = screen.getByRole("spinbutton", {name: /month/i});

    expect(month).toHaveFocus();

    const focusTarget = document.querySelector("[data-focus-visible='true']");

    expect(focusTarget).not.toBeNull();
  });
});
