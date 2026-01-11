import {DateField, DateInputGroup, Label} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="primary-date">
        <Label>Primary variant</Label>
        <DateInputGroup variant="primary">
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
      </DateField>
      <DateField className="w-[256px]" name="secondary-date">
        <Label>Secondary variant</Label>
        <DateInputGroup variant="secondary">
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
      </DateField>
    </div>
  );
}
