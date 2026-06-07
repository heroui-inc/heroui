"use client";

import {Calendar, ChevronDown} from "@gravity-ui/icons";
import {DateField, Description, Label} from "@heroui/react";

export function WithPrefixAndSuffix() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>日期</Label>
      <DateField.Group>
        <DateField.Prefix>
          <Calendar className="size-4 text-muted" />
        </DateField.Prefix>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <ChevronDown className="size-4 text-muted" />
        </DateField.Suffix>
      </DateField.Group>
      <Description>输入日期</Description>
    </DateField>
  );
}
