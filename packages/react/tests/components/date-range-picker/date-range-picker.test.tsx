import type {DateValue} from "@internationalized/date";

import {cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {DateField} from "@/components/date-field";
import {DateRangePicker} from "@/components/date-range-picker";
import {Label} from "@/components/label";
import {RangeCalendar} from "@/components/range-calendar";

type DateRange = {
  start: DateValue;
  end: DateValue;
};

const renderDateRangePicker = (
  props: {
    defaultValue?: DateRange;
    onChange?: (value: DateRange | null) => void;
  } = {},
) => {
  return render(
    <DateRangePicker
      data-testid="date-range-picker"
      defaultValue={props.defaultValue}
      endName="endDate"
      startName="startDate"
      onChange={props.onChange}
    >
      <Label>Trip dates</Label>
      <DateField.Group>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateRangePicker.RangeSeparator />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DateRangePicker.Trigger aria-label="Open calendar">
            <DateRangePicker.TriggerIndicator />
          </DateRangePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DateRangePicker.Popover>
        <RangeCalendar aria-label="Selected range">
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
        </RangeCalendar>
      </DateRangePicker.Popover>
    </DateRangePicker>,
  );
};

describe("DateRangePicker", () => {
  let user: ReturnType<typeof setupUser>;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("exposes data-slots and BEM block", () => {
    renderDateRangePicker();

    const root = screen.getByTestId("date-range-picker");

    expect(root).toHaveAttribute("data-slot", "date-range-picker");
    expect(root.className).toEqual(expect.stringContaining("date-range-picker"));
    expect(document.querySelector('[data-slot="date-range-picker-trigger"]')).not.toBeNull();
    expect(
      document.querySelector('[data-slot="date-range-picker-range-separator"]'),
    ).not.toBeNull();
  });

  it("supports opening and closing the range calendar popover", async () => {
    renderDateRangePicker();

    await user.click(screen.getByRole("button", {name: /Open calendar/}));
    runAllTimers();

    expect(document.querySelector('[data-slot="date-range-picker-popover"]')).not.toBeNull();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Previous"})).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(document.querySelector('[data-slot="date-range-picker-popover"]')).toBeNull();
  });

  it("calls onChange when a date range is selected", async () => {
    const onChange = vi.fn();

    renderDateRangePicker({
      defaultValue: {
        start: new CalendarDate(2026, 8, 1),
        end: new CalendarDate(2026, 8, 5),
      },
      onChange,
    });

    await user.click(screen.getByRole("button", {name: /Open calendar/}));
    runAllTimers();

    const startCell = screen.getByRole("button", {
      name: (accessibleName) => accessibleName.includes("10") && accessibleName.includes("August"),
    });
    const endCell = screen.getByRole("button", {
      name: (accessibleName) => accessibleName.includes("12") && accessibleName.includes("August"),
    });

    await user.click(startCell);
    runAllTimers();
    await user.click(endCell);
    runAllTimers();

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls.at(-1)?.[0] as DateRange;

    expect(value.start.toString()).toBe("2026-08-10");
    expect(value.end.toString()).toBe("2026-08-12");
  });
});
