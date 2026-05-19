import {InputOTP, Label, Link} from "@heroui/react";

const slotClassName =
  "rounded-lg border border-neutral-300/70 bg-linear-to-b from-white to-neutral-50 font-semibold text-neutral-800 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-[box-shadow,border-color] data-[active=true]:border-neutral-400 data-[active=true]:ring-2 data-[active=true]:ring-neutral-400/25 dark:border-neutral-600/70 dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_0_0_rgba(0,0,0,0.25)] dark:ring-white/10 dark:data-[active=true]:border-neutral-500 dark:data-[active=true]:ring-neutral-500/30";

export function CustomStyles() {
  return (
    <div className="flex w-[280px] flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label className="font-medium text-neutral-800 dark:text-neutral-100">Verify account</Label>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          We&apos;ve sent a code to a****@gmail.com
        </p>
      </div>
      <InputOTP maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot className={slotClassName} index={0} />
          <InputOTP.Slot className={slotClassName} index={1} />
          <InputOTP.Slot className={slotClassName} index={2} />
        </InputOTP.Group>
        <InputOTP.Separator className="bg-neutral-300 dark:bg-neutral-600" />
        <InputOTP.Group>
          <InputOTP.Slot className={slotClassName} index={3} />
          <InputOTP.Slot className={slotClassName} index={4} />
          <InputOTP.Slot className={slotClassName} index={5} />
        </InputOTP.Group>
      </InputOTP>
      <div className="flex items-center gap-[5px] px-1 pt-1">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Didn&apos;t receive a code?
        </p>
        <Link
          className="font-medium text-neutral-700 underline decoration-neutral-300/80 underline-offset-4 hover:text-neutral-900 dark:text-neutral-300 dark:decoration-neutral-600/80 dark:hover:text-neutral-100"
          href="#"
        >
          Resend
        </Link>
      </div>
    </div>
  );
}
