import type {ReactNode} from "react";

import {ssrSmoke} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {DateField} from "@/components/date-field";
import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {I18nProvider} from "@/components/rac";

const wrapper = ({children}: {children: ReactNode}) => (
  <I18nProvider locale="en-US">{children}</I18nProvider>
);

describe("DateField SSR", () => {
  it("renders and hydrates a controlled value without mismatches", async () => {
    const {html} = await ssrSmoke(
      <DateField name="date" value={new CalendarDate(2026, 8, 15)}>
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Enter a date</Description>
      </DateField>,
      {wrapper},
    );

    expect(html).toContain('data-slot="date-field"');
    expect(html).toContain('data-slot="date-input-group"');
    expect(html).toContain('role="spinbutton"');
    expect(html).toContain("2026");
  });

  it("renders and hydrates an invalid, required field with FieldError", async () => {
    const {html} = await ssrSmoke(
      <DateField isInvalid isRequired name="date" value={new CalendarDate(2026, 8, 15)}>
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <FieldError>Please enter a valid date</FieldError>
      </DateField>,
      {wrapper},
    );

    expect(html).toContain('data-required="true"');
    expect(html).toContain("Please enter a valid date");
  });
});
