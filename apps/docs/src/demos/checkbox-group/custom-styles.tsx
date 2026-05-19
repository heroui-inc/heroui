import {Checkbox, CheckboxGroup, Label} from "@heroui/react";

const checkboxRoot =
  "group **:data-[slot=checkbox-default-indicator--checkmark]:text-transparent group-data-[selected=true]:**:data-[slot=checkbox-default-indicator--checkmark]:text-white dark:group-data-[selected=true]:**:data-[slot=checkbox-default-indicator--checkmark]:text-black";

const control =
  "size-4 rounded-md border border-neutral-300/70 bg-linear-to-b from-white to-neutral-50 shadow-sm ring-1 ring-black/5 transition-[border-color,box-shadow,transform] group-data-[selected=true]:border-transparent group-data-[selected=true]:shadow-sm before:scale-70 before:rounded-md before:bg-transparent! before:opacity-0 group-hover:before:bg-neutral-200/50! group-hover:before:opacity-100 group-data-[selected=true]:before:scale-100 group-data-[selected=true]:before:bg-neutral-900! group-data-[selected=true]:before:opacity-100 group-data-[selected=true]:group-hover:before:bg-neutral-900! hover:border-neutral-400/90 dark:border-neutral-600/70 dark:from-neutral-800 dark:to-neutral-900 dark:ring-white/10 dark:group-hover:before:bg-neutral-700/40! dark:group-data-[selected=true]:before:bg-neutral-100! dark:group-data-[selected=true]:group-hover:before:bg-neutral-100!";

export function CustomStyles() {
  return (
    <CheckboxGroup
      className="w-full max-w-xs gap-3 rounded-xl border border-border/70 bg-linear-to-b from-neutral-50/90 to-white p-4 ring-1 ring-black/5 dark:from-neutral-900/80 dark:to-neutral-900 dark:ring-white/10"
      name="channels"
      variant="secondary"
    >
      <Label className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
        Notify me via
      </Label>
      <Checkbox className={checkboxRoot} value="email">
        <Checkbox.Control className={control}>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Email</Label>
        </Checkbox.Content>
      </Checkbox>
      <Checkbox className={checkboxRoot} value="sms">
        <Checkbox.Control className={control}>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>SMS</Label>
        </Checkbox.Content>
      </Checkbox>
      <Checkbox className={checkboxRoot} value="push">
        <Checkbox.Control className={control}>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Push</Label>
        </Checkbox.Content>
      </Checkbox>
    </CheckboxGroup>
  );
}
