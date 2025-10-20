"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Label,
  Radio,
  RadioContent,
  RadioControl,
  RadioGroup,
  RadioIndicator,
} from "@heroui/react";
import React from "react";

export function Validation() {
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const value = formData.get("plan-validation");

        setMessage(`Your chosen plan is: ${value}`);
      }}
    >
      <RadioGroup isRequired name="plan-validation">
        <Label>Subscription plan</Label>
        <Radio value="starter">
          <RadioControl>
            <RadioIndicator />
          </RadioControl>
          <RadioContent>
            <Label>Starter</Label>
            <Description>For side projects and small teams</Description>
          </RadioContent>
        </Radio>
        <Radio value="pro">
          <RadioControl>
            <RadioIndicator />
          </RadioControl>
          <RadioContent>
            <Label>Pro</Label>
            <Description>Advanced reporting and analytics</Description>
          </RadioContent>
        </Radio>
        <Radio value="teams">
          <RadioControl>
            <RadioIndicator />
          </RadioControl>
          <RadioContent>
            <Label>Teams</Label>
            <Description>Share access with up to 10 teammates</Description>
          </RadioContent>
        </Radio>
        <FieldError>Choose a subscription before continuing.</FieldError>
      </RadioGroup>
      <Button className="mt-2 w-fit" type="submit">
        Submit
      </Button>
      {!!message && <p className="text-muted text-sm">{message}</p>}
    </Form>
  );
}
