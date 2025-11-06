import {Description, InputOTP, Label, REGEXP_ONLY_CHARS} from "@heroui/react";

export function WithPattern() {
  return (
    <div className="flex w-[280px] flex-col gap-2">
      <Label>Enter code (letters only)</Label>
      <Description>Only alphabetic characters are allowed</Description>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_CHARS}>
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
    </div>
  );
}
