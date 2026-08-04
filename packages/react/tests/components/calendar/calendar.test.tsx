import type {DateValue} from "@internationalized/date";
import type {ComponentProps} from "react";

import {act, render, screen, setupUser} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {Calendar} from "@/components/calendar";

const MIN_VALUE = new CalendarDate(2020, 1, 1);
const MAX_VALUE = new CalendarDate(2030, 12, 31);

const renderCalendar = (props: Partial<ComponentProps<typeof Calendar>> = {}) =>
  render(
    <Calendar
      aria-label="Event date"
      defaultValue={new CalendarDate(2026, 8, 15)}
      maxValue={MAX_VALUE}
      minValue={MIN_VALUE}
      {...props}
    >
      <Calendar.Header>
        <Calendar.YearPickerTrigger>
          <Calendar.YearPickerTriggerHeading />
          <Calendar.YearPickerTriggerIndicator />
        </Calendar.YearPickerTrigger>
        <Calendar.NavButton slot="previous" />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
      </Calendar.Grid>
      <Calendar.YearPickerGrid>
        <Calendar.YearPickerGridBody>
          {({year}) => <Calendar.YearPickerCell year={year} />}
        </Calendar.YearPickerGridBody>
      </Calendar.YearPickerGrid>
    </Calendar>,
  );

const getDayCell = (label: string) =>
  screen.getByRole("button", {name: (accessibleName) => accessibleName.includes(label)});

describe("Calendar", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders a grid with an accessible name", () => {
    renderCalendar();

    expect(screen.getByRole("grid", {name: /Event date/})).toBeInTheDocument();
  });

  it("exposes data-slots and BEM block", () => {
    renderCalendar();

    expect(document.querySelector('[data-slot="calendar"]')?.className).toEqual(
      expect.stringContaining("calendar"),
    );
    expect(document.querySelector('[data-slot="calendar-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="calendar-grid"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="calendar-grid-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="calendar-grid-body"]')).not.toBeNull();
    expect(document.querySelectorAll('[data-slot="calendar-cell"]').length).toBeGreaterThan(0);
  });

  describe("day selection", () => {
    it("exposes aria-selected and data-selected on the selected day", () => {
      renderCalendar();

      const selected = getDayCell("August 15, 2026");

      expect(selected.closest('[role="gridcell"]')).toHaveAttribute("aria-selected", "true");
      expect(selected).toHaveAttribute("data-selected", "true");
    });

    it("calls onChange when selecting a new day", async () => {
      const onChange = vi.fn();

      renderCalendar({onChange});

      await user.click(getDayCell("August 20, 2026"));

      expect(onChange).toHaveBeenCalledTimes(1);
      const value = onChange.mock.calls[0]?.[0] as DateValue;

      expect(value.toString()).toBe("2026-08-20");
    });

    it("supports controlled value", () => {
      const onChange = vi.fn();

      const {rerender} = render(
        <Calendar
          aria-label="Event date"
          maxValue={MAX_VALUE}
          minValue={MIN_VALUE}
          value={new CalendarDate(2026, 8, 15)}
          onChange={onChange}
        >
          <Calendar.Header>
            <Calendar.Heading />
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>,
      );

      expect(getDayCell("August 15, 2026")).toHaveAttribute("data-selected", "true");

      rerender(
        <Calendar
          aria-label="Event date"
          maxValue={MAX_VALUE}
          minValue={MIN_VALUE}
          value={new CalendarDate(2026, 8, 20)}
          onChange={onChange}
        >
          <Calendar.Header>
            <Calendar.Heading />
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>,
      );

      expect(getDayCell("August 20, 2026")).toHaveAttribute("data-selected", "true");
    });

    it("supports ArrowRight to move focus to the next day", async () => {
      renderCalendar();

      const currentCell = getDayCell("August 15, 2026");

      await act(async () => {
        currentCell.focus();
      });
      expect(currentCell).toHaveFocus();

      await user.keyboard("{ArrowRight}");

      expect(getDayCell("August 16, 2026")).toHaveFocus();
    });

    it("supports isDisabled to block day selection", async () => {
      const onChange = vi.fn();

      renderCalendar({isDisabled: true, onChange});

      expect(document.querySelector('[data-slot="calendar"]')).toHaveAttribute(
        "data-disabled",
        "true",
      );

      await user.click(getDayCell("August 20, 2026"));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("navigation", () => {
    it("supports next and previous month via NavButton", async () => {
      renderCalendar();

      expect(screen.getByRole("grid", {name: /August 2026/})).toBeInTheDocument();

      const nextButton = document.querySelector(
        '[data-slot="calendar-nav-button"][slot="next"]',
      ) as HTMLElement;
      const previousButton = document.querySelector(
        '[data-slot="calendar-nav-button"][slot="previous"]',
      ) as HTMLElement;

      await user.click(nextButton);
      expect(screen.getByRole("grid", {name: /September 2026/})).toBeInTheDocument();

      await user.click(previousButton);
      expect(screen.getByRole("grid", {name: /August 2026/})).toBeInTheDocument();
    });
  });

  describe("year picker", () => {
    it("supports opening the year picker from the trigger", async () => {
      renderCalendar();

      const trigger = screen.getByRole("button", {name: /year selector/});

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(document.querySelector('[data-slot="calendar-year-picker-grid"]')).toHaveAttribute(
        "aria-hidden",
        "true",
      );

      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(document.querySelector('[data-slot="calendar-year-picker-grid"]')).not.toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("supports selecting a year and closing the picker", async () => {
      renderCalendar();

      await user.click(screen.getByRole("button", {name: /year selector/}));
      await user.click(screen.getByRole("button", {name: "2028"}));

      expect(screen.getByRole("grid", {name: /2028/})).toBeInTheDocument();
      expect(screen.getByRole("button", {name: /year selector/})).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(document.querySelector('[data-slot="calendar-year-picker-grid"]')).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("exposes data-selected on the focused year", async () => {
      renderCalendar();

      await user.click(screen.getByRole("button", {name: /year selector/}));

      expect(screen.getByRole("button", {name: "2026"})).toHaveAttribute("data-selected", "true");
    });

    it("supports Escape dismiss for the year picker", async () => {
      renderCalendar();

      const trigger = screen.getByRole("button", {name: /year selector/});

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.keyboard("{Escape}");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(document.querySelector('[data-slot="calendar-year-picker-grid"]')).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });
  });

  it("supports focus-visible via keyboard", async () => {
    renderCalendar();

    await user.tab();
    expect(document.querySelector("[data-focus-visible='true']")).not.toBeNull();
  });
});
