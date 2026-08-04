import type {DateValue} from "@internationalized/date";
import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {RangeCalendar} from "@/components/range-calendar";

type DateRange = {
  end: DateValue;
  start: DateValue;
};

const MIN_VALUE = new CalendarDate(2020, 1, 1);
const MAX_VALUE = new CalendarDate(2030, 12, 31);

const renderRangeCalendar = (props: Partial<ComponentProps<typeof RangeCalendar>> = {}) =>
  render(
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{start: new CalendarDate(2026, 8, 1), end: new CalendarDate(2026, 8, 5)}}
      maxValue={MAX_VALUE}
      minValue={MIN_VALUE}
      {...props}
    >
      <RangeCalendar.Header>
        <RangeCalendar.YearPickerTrigger>
          <RangeCalendar.YearPickerTriggerHeading />
          <RangeCalendar.YearPickerTriggerIndicator />
        </RangeCalendar.YearPickerTrigger>
        <RangeCalendar.NavButton slot="previous" />
        <RangeCalendar.NavButton slot="next" />
      </RangeCalendar.Header>
      <RangeCalendar.Grid>
        <RangeCalendar.GridHeader>
          {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
        </RangeCalendar.GridHeader>
        <RangeCalendar.GridBody>
          {(date) => <RangeCalendar.Cell date={date} />}
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
      <RangeCalendar.YearPickerGrid>
        <RangeCalendar.YearPickerGridBody>
          {({year}) => <RangeCalendar.YearPickerCell year={year} />}
        </RangeCalendar.YearPickerGridBody>
      </RangeCalendar.YearPickerGrid>
    </RangeCalendar>,
  );

const getDayCell = (day: number) => {
  const button = Array.from(
    document.querySelectorAll('[data-slot="range-calendar-cell-button"]'),
  ).find((element) => element.textContent === String(day));

  return button?.closest('[role="button"]') as HTMLElement;
};

describe("RangeCalendar", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders a multi-selectable grid with an accessible name", () => {
    renderRangeCalendar();

    const grid = screen.getByRole("grid", {name: /Trip dates/});

    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute("aria-multiselectable", "true");
  });

  it("exposes data-slots and BEM block", () => {
    renderRangeCalendar();

    expect(document.querySelector('[data-slot="range-calendar"]')?.className).toEqual(
      expect.stringContaining("range-calendar"),
    );
    expect(document.querySelector('[data-slot="range-calendar-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="range-calendar-grid"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="range-calendar-grid-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="range-calendar-grid-body"]')).not.toBeNull();
    expect(document.querySelectorAll('[data-slot="range-calendar-cell"]').length).toBeGreaterThan(
      0,
    );
    expect(
      document.querySelectorAll('[data-slot="range-calendar-cell-button"]').length,
    ).toBeGreaterThan(0);
  });

  describe("range selection", () => {
    it("exposes range start and end data attributes", () => {
      renderRangeCalendar();

      const start = getDayCell(1);
      const end = getDayCell(5);

      expect(start).toHaveAttribute("data-selection-start", "true");
      expect(end).toHaveAttribute("data-selection-end", "true");
    });

    it("calls onChange when selecting a date range", async () => {
      const onChange = vi.fn();

      renderRangeCalendar({onChange});

      await user.click(getDayCell(10));
      await user.click(getDayCell(15));

      expect(onChange).toHaveBeenCalled();
      const value = onChange.mock.calls.at(-1)?.[0] as DateRange;

      expect(value.start.toString()).toBe("2026-08-10");
      expect(value.end.toString()).toBe("2026-08-15");
    });

    it("supports controlled range value", () => {
      const onChange = vi.fn();
      const baseProps = {
        "aria-label": "Trip dates",
        maxValue: MAX_VALUE,
        minValue: MIN_VALUE,
        onChange,
      };

      const {rerender} = render(
        <RangeCalendar
          {...baseProps}
          value={{start: new CalendarDate(2026, 8, 1), end: new CalendarDate(2026, 8, 5)}}
        >
          <RangeCalendar.Header>
            <RangeCalendar.Heading />
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>,
      );

      expect(getDayCell(1)).toHaveAttribute("data-selection-start", "true");
      expect(getDayCell(5)).toHaveAttribute("data-selection-end", "true");

      rerender(
        <RangeCalendar
          {...baseProps}
          value={{start: new CalendarDate(2026, 8, 10), end: new CalendarDate(2026, 8, 15)}}
        >
          <RangeCalendar.Header>
            <RangeCalendar.Heading />
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>,
      );

      expect(getDayCell(10)).toHaveAttribute("data-selection-start", "true");
      expect(getDayCell(15)).toHaveAttribute("data-selection-end", "true");
    });

    it("supports isDisabled to block range selection", async () => {
      const onChange = vi.fn();

      renderRangeCalendar({isDisabled: true, onChange});

      expect(document.querySelector('[data-slot="range-calendar"]')).toHaveAttribute(
        "data-disabled",
        "true",
      );

      await user.click(getDayCell(10));
      await user.click(getDayCell(15));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("navigation", () => {
    it("supports next and previous month via NavButton", async () => {
      renderRangeCalendar();

      expect(screen.getByRole("grid", {name: /August 2026/})).toBeInTheDocument();

      const nextButton = document.querySelector(
        '[data-slot="range-calendar-nav-button"][slot="next"]',
      ) as HTMLElement;
      const previousButton = document.querySelector(
        '[data-slot="range-calendar-nav-button"][slot="previous"]',
      ) as HTMLElement;

      await user.click(nextButton);
      expect(screen.getByRole("grid", {name: /September 2026/})).toBeInTheDocument();

      await user.click(previousButton);
      expect(screen.getByRole("grid", {name: /August 2026/})).toBeInTheDocument();
    });
  });

  describe("year picker", () => {
    it("supports opening the year picker from the trigger", async () => {
      renderRangeCalendar();

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
      renderRangeCalendar();

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

    it("supports Escape dismiss for the year picker", async () => {
      renderRangeCalendar();

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
    renderRangeCalendar();

    await user.tab();
    expect(document.querySelector("[data-focus-visible='true']")).not.toBeNull();
  });
});
