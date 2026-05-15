import {InputOTP, Label, Link, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full flex-col gap-2 rounded-3xl p-6">
      <div className="flex flex-col gap-1">
        <Label>验证账户</Label>
        <p className="text-sm text-muted">我们已向 a****@gmail.com 发送验证码</p>
      </div>
      <InputOTP maxLength={6} variant="secondary">
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
      <div className="flex items-center gap-[5px] px-1 pt-1">
        <p className="text-sm text-muted">没有收到验证码？</p>
        <Link className="text-foreground underline" href="#">
          重新发送
        </Link>
      </div>
    </Surface>
  );
}
