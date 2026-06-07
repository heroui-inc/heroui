"use client";

import {Description, InputOTP, Label} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-[280px] flex-col gap-2">
      <Label>Verify account</Label>
      <InputOTP maxLength={6} value={value} onChange={setValue}>
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
      <Description>
        {value.length > 0 ? (
          <>
            Value: {value} ({value.length}/6) •{" "}
            <button className="font-medium text-foreground underline" onClick={() => setValue("")}>
              Clear
            </button>
          </>
        ) : (
          "Enter a 6-digit code"
        )}
      </Description>
    </div>
  );
}
