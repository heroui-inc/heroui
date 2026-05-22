import {Description, InputOTP, Label} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex w-[280px] flex-col gap-2">
      <Label isDisabled>验证账户</Label>
      <Description>验证码校验当前已禁用</Description>
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
