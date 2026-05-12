"use client";

import {Calendar, DateField, DatePicker, Label} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <DatePicker
      className="w-64"
      name="date"
      render={(props) => <div {...props} data-custom="date-picker" />}
    >
      <Label render={(props) => <span {...props} data-custom="date-picker-label" />}>Date</Label>
      <DateField.Group
        fullWidth
        render={(props) => <div {...props} data-custom="date-field-group" />}
      >
        <DateField.Input render={(props) => <div {...props} data-custom="date-field-input" />}>
          {(segment) => (
            <DateField.Segment
              render={(props) => <span {...props} data-custom="date-field-segment" />}
              segment={segment}
            />
          )}
        </DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger
            render={(props) => <button {...props} data-custom="date-picker-trigger" />}
          >
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
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
  );
}
