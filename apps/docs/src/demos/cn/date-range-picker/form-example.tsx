"use client";

import type {DateValue} from "@internationalized/date";

import {
  Button,
  DateField,
  DateRangePicker,
  Description,
  FieldError,
  Form,
  Label,
  RangeCalendar,
} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

type DateRange = {
  start: DateValue;
  end: DateValue;
};

export function FormExample() {
  const [value, setValue] = useState<DateRange | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentDate = today(getLocalTimeZone());
  const isInvalid =
    value != null && (value.start.compare(currentDate) < 0 || value.end.compare(value.start) < 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!value || isInvalid) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setValue(null);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <Form className="flex w-80 flex-col gap-3" onSubmit={handleSubmit}>
      <DateRangePicker
        isRequired
        endName="tripEndDate"
        isInvalid={isInvalid}
        minValue={currentDate}
        startName="tripStartDate"
        value={value}
        onChange={setValue}
      >
        <Label>出行日期</Label>
        <DateField.Group fullWidth>
          <DateField.Input slot="start">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateRangePicker.RangeSeparator />
          <DateField.Input slot="end">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DateRangePicker.Trigger>
              <DateRangePicker.TriggerIndicator />
            </DateRangePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        {isInvalid ? (
          <FieldError>请选择从今天起的有效日期范围。</FieldError>
        ) : (
          <Description>选择入住与退房日期。</Description>
        )}
        <DateRangePicker.Popover>
          <RangeCalendar aria-label="出行日期">
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
          </RangeCalendar>
        </DateRangePicker.Popover>
      </DateRangePicker>
      <Button
        className="w-full"
        isDisabled={!value || isInvalid}
        isPending={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "提交中…" : "提交"}
      </Button>
    </Form>
  );
}
