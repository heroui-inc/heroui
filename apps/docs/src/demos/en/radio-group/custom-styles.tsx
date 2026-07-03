import {Description, Label, Radio, RadioGroup} from "@heroui/react";

const radioRoot =
  "group gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-neutral-200/80 hover:bg-neutral-50/60 dark:hover:border-neutral-700/80 dark:hover:bg-neutral-800/40";

const control =
  "size-4 rounded-full border border-neutral-300/70 bg-linear-to-b from-white to-neutral-50 shadow-sm ring-1 ring-black/5 transition-[border-color,box-shadow,transform] group-data-[selected=true]:border-transparent group-data-[selected=true]:shadow-sm before:scale-70 before:rounded-full before:bg-transparent! before:opacity-0 group-hover:before:bg-neutral-200/50! group-hover:before:opacity-100 group-data-[selected=true]:before:scale-100 group-data-[selected=true]:before:bg-neutral-900! group-data-[selected=true]:before:opacity-100 group-data-[selected=true]:group-hover:before:bg-neutral-900! hover:border-neutral-400/90 dark:border-neutral-600/70 dark:from-neutral-800 dark:to-neutral-900 dark:ring-white/10 dark:group-hover:before:bg-neutral-700/40! dark:group-data-[selected=true]:before:bg-neutral-100! dark:group-data-[selected=true]:group-hover:before:bg-neutral-100!";

export function CustomStyles() {
  return (
    <RadioGroup
      className="w-full max-w-xs gap-2 rounded-xl border border-border/70 bg-linear-to-b from-neutral-50/90 to-white p-4 ring-1 ring-black/5 dark:from-neutral-900/80 dark:to-neutral-900 dark:ring-white/10"
      defaultValue="monthly"
      name="billing"
    >
      <Label className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
        Billing cycle
      </Label>
      <Description>Pick how often you are charged.</Description>
      <Radio className={radioRoot} value="monthly">
        <Radio.Control className={control}>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Monthly</Label>
          <Description>$12 per month</Description>
        </Radio.Content>
      </Radio>
      <Radio className={radioRoot} value="yearly">
        <Radio.Control className={control}>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Yearly</Label>
          <Description>$120 per year</Description>
        </Radio.Content>
      </Radio>
    </RadioGroup>
  );
}
