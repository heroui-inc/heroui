import type {ReactNode} from "react";

import {ssrSmoke} from "@heroui/testing/helpers";
import {Time} from "@internationalized/date";

import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {I18nProvider} from "@/components/rac";
import {TimeField} from "@/components/time-field";

const wrapper = ({children}: {children: ReactNode}) => (
  <I18nProvider locale="en-US">{children}</I18nProvider>
);

describe("TimeField SSR", () => {
  it("renders and hydrates a controlled value without mismatches", async () => {
    const {html} = await ssrSmoke(
      <TimeField name="time" value={new Time(9, 30)}>
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>Enter a time</Description>
      </TimeField>,
      {wrapper},
    );

    expect(html).toContain('data-slot="time-field"');
    expect(html).toContain('data-slot="date-input-group"');
    expect(html).toContain('role="spinbutton"');
    expect(html).toContain("AM");
  });

  it("renders and hydrates an invalid, required field with FieldError", async () => {
    const {html} = await ssrSmoke(
      <TimeField isInvalid isRequired name="time" value={new Time(9, 30)}>
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <FieldError>Please enter a valid time</FieldError>
      </TimeField>,
      {wrapper},
    );

    expect(html).toContain('data-required="true"');
    expect(html).toContain("Please enter a valid time");
  });
});
