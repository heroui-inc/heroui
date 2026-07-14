import {Description, Label, Radio, RadioGroup} from "@heroui/react";

const options = [
  {description: "每月扣费 $12", label: "按月", value: "monthly"},
  {description: "每年一次性扣费 $120", label: "按年", value: "yearly"},
] as const;

const contentClassName =
  "group flex w-full items-start gap-3 rounded-xl border border-success/10 bg-success-soft/30 px-4 py-3 transition-colors data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-success/15 data-[hovered=true]:bg-success-soft-hover data-[selected=true]:border-success/30 data-[selected=true]:bg-success-soft data-[selected=true]:data-[hovered=true]:bg-success-soft-hover";

const controlClassName =
  "mt-0.5 size-5 shrink-0 rounded-full border border-border bg-default shadow-none group-data-[pressed=true]:scale-95 group-data-[selected=true]:border-transparent group-data-[selected=true]:bg-success group-data-[selected=true]:group-data-[pressed=true]:bg-success-hover";

const indicatorClassName =
  "before:rounded-full before:bg-default group-data-[selected=true]:before:scale-50 group-data-[selected=true]:before:bg-success-foreground group-data-[selected=true]:group-data-[pressed=true]:before:scale-[0.57]";

export function CustomStyles() {
  return (
    <RadioGroup
      className="w-full max-w-sm gap-3 **:data-[slot=radio]:mt-0"
      defaultValue="yearly"
      name="billing"
      variant="secondary"
    >
      <Label className="font-medium text-foreground">计费周期</Label>
      <Description>选择你的扣费频率。</Description>
      {options.map(({description, label, value}) => (
        <Radio key={value} value={value}>
          <Radio.Content className={contentClassName}>
            <Radio.Control className={controlClassName}>
              <Radio.Indicator className={indicatorClassName} />
            </Radio.Control>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground group-data-[selected=true]:text-success-soft-foreground">
                {label}
              </span>
              <Description className="group-data-[selected=true]:text-success-soft-foreground/80">
                {description}
              </Description>
            </div>
          </Radio.Content>
        </Radio>
      ))}
    </RadioGroup>
  );
}
