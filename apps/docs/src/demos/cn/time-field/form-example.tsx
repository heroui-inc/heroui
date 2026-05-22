"use client";

import type {Time} from "@internationalized/date";

import {Clock} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Label, TimeField} from "@heroui/react";
import {parseTime} from "@internationalized/date";
import {useState} from "react";

export function FormExample() {
  const [value, setValue] = useState<Time | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const minTime = parseTime("09:00");
  const maxTime = parseTime("17:00");
  const isInvalid = value !== null && (value.compare(minTime) < 0 || value.compare(maxTime) > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value || isInvalid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Time submitted:", {time: value});
      setValue(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
      <TimeField
        isRequired
        className="w-full"
        isInvalid={isInvalid}
        maxValue={maxTime}
        minValue={minTime}
        name="time"
        value={value}
        onChange={setValue}
      >
        <Label>预约时间</Label>
        <TimeField.Group>
          <TimeField.Prefix>
            <Clock className="size-4 text-muted" />
          </TimeField.Prefix>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        {isInvalid ? (
          <FieldError>时间须在上午 9:00 至下午 5:00 之间</FieldError>
        ) : (
          <Description>输入上午 9:00 至下午 5:00 之间的时间</Description>
        )}
      </TimeField>
      <Button
        className="w-full"
        isDisabled={!value || isInvalid}
        isPending={isSubmitting}
        type="submit"
        variant="primary"
      >
        {isSubmitting ? "提交中…" : "提交"}
      </Button>
    </Form>
  );
}
