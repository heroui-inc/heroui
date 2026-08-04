import type {DateValue} from "@internationalized/date";

import {cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {Calendar} from "@/components/calendar";
import {DateField} from "@/components/date-field";
import {DatePicker} from "@/components/date-picker";
import {Label} from "@/components/label";

const renderDatePicker = (
  props: {
    value?: DateValue | null;
    defaultValue?: DateValue;
    onChange?: (value: DateValue | null) => void;
  } = {},
) => {
  return render(
    <DatePicker
      data-testid="date-picker"
      defaultValue={props.defaultValue}
      name="date"
      value={props.value}
      onChange={props.onChange}
    >
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger aria-label="Open calendar">
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover>
        <Calendar aria-label="Selected date">
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
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>,
  );
};

describe("DatePicker", () => {
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
    renderDatePicker();

    const root = screen.getByTestId("date-picker");

    expect(root).toHaveAttribute("data-slot", "date-picker");
    expect(root.className).toEqual(expect.stringContaining("date-picker"));
    expect(document.querySelector('[data-slot="date-picker-trigger"]')).not.toBeNull();
  });

  it("supports opening and closing the calendar popover", async () => {
    renderDatePicker();

    await user.click(screen.getByRole("button", {name: /Open calendar/}));
    runAllTimers();

    expect(document.querySelector('[data-slot="date-picker-popover"]')).not.toBeNull();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Previous"})).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(document.querySelector('[data-slot="date-picker-popover"]')).toBeNull();
  });

  it("calls onChange when a calendar date is selected", async () => {
    const onChange = vi.fn();

    renderDatePicker({
      defaultValue: new CalendarDate(2026, 8, 1),
      onChange,
    });

    await user.click(screen.getByRole("button", {name: /Open calendar/}));
    runAllTimers();

    const cell = screen.getByRole("button", {
      name: (accessibleName) => accessibleName.includes("15") && accessibleName.includes("August"),
    });

    await user.click(cell);
    runAllTimers();

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls[0]?.[0] as CalendarDate;

    expect(value.year).toBe(2026);
    expect(value.month).toBe(8);
    expect(value.day).toBe(15);
  });
});
