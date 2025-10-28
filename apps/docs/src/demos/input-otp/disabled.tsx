import {Description, InputOTP, Label} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex w-[280px] flex-col gap-2">
      <Label isDisabled>Verify account</Label>
      <Description>Code verification is currently disabled</Description>
      <InputOTP isDisabled maxLength={6}>
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
