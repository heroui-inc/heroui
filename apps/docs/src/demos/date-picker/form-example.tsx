"use client";

import type {DateValue} from "@internationalized/date";

import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Description,
  FieldError,
  Form,
  Label,
} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

export function FormExample() {
  const [value, setValue] = useState<DateValue | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentDate = today(getLocalTimeZone());
  const isInvalid = value != null && value.compare(currentDate) < 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!value || isInvalid) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setValue(null);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <Form className="flex w-64 flex-col gap-3" onSubmit={handleSubmit}>
      <DatePicker
        isRequired
        isInvalid={isInvalid}
        minValue={currentDate}
        name="appointmentDate"
        value={value}
        onChange={setValue}
      >
        <Label>Appointment date</Label>
        <DateField.Group fullWidth>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger>
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        {isInvalid ? (
          <FieldError>Date must be today or in the future.</FieldError>
        ) : (
          <Description>Choose a valid appointment date.</Description>
        )}
        <DatePicker.Popover>
          <Calendar aria-label="Event date">
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
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>
      <Button
        className="w-full"
        isDisabled={!value || isInvalid}
        isPending={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
