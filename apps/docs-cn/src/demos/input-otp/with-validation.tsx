"use client";

import {Button, Description, Form, InputOTP, Label} from "@heroui/react";
import React from "react";

export function WithValidation() {
  const [value, setValue] = React.useState("");
  const [isInvalid, setIsInvalid] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code");

    if (code !== "123456") {
      setIsInvalid(true);

      return;
    }

    setIsInvalid(false);
    setValue("");

    alert("Code verified successfully!");
  };

  const handleChange = (val: string) => {
    setValue(val);
    setIsInvalid(false);
  };

  return (
    <div className="flex w-[280px] flex-col gap-2">
      <Form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Label>Verify account</Label>
        <Description>Hint: The code is 123456</Description>
        <InputOTP
          aria-describedby={isInvalid ? "code-error" : undefined}
          isInvalid={isInvalid}
          maxLength={6}
          name="code"
          value={value}
          onChange={handleChange}
        >
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
        <span className="field-error" data-visible={isInvalid} id="code-error">
          Invalid code. Please try again.
        </span>
        <Button isDisabled={value.length !== 6} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
