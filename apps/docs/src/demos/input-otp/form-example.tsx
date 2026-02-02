"use client";

import {Button, Description, Form, InputOTP, Label, Link, Spinner} from "@heroui/react";
import React from "react";

export function FormExample() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    if (value.length !== 6) {
      setError("Please enter all 6 digits");

      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (value === "123456") {
        console.log("Code verified successfully!");
        setValue("");
      } else {
        setError("Invalid code. Please try again.");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label>Two-factor authentication</Label>
        <Description>Enter the 6-digit code from your authenticator app</Description>
        <InputOTP
          isInvalid={!!error}
          maxLength={6}
          value={value}
          onChange={(val) => {
            setValue(val);
            setError("");
          }}
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
        <span className="field-error" data-visible={!!error} id="code-error">
          {error}
        </span>
      </div>
      <Button
        className="w-full"
        isDisabled={value.length !== 6}
        isPending={isSubmitting}
        type="submit"
        variant="primary"
      >
        {isSubmitting ? (
          <>
            <Spinner color="current" size="sm" />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </Button>
      <div className="flex items-center justify-center gap-1">
        <p className="text-sm text-muted">Having trouble?</p>
        <Link className="text-sm text-foreground underline" href="#">
          Use backup code
        </Link>
      </div>
    </Form>
  );
}
