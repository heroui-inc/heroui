import {Checkbox, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <Checkbox
      className="group gap-3.5 **:data-[slot=checkbox-default-indicator--checkmark]:text-transparent group-data-[selected=true]:**:data-[slot=checkbox-default-indicator--checkmark]:text-white dark:group-data-[selected=true]:**:data-[slot=checkbox-default-indicator--checkmark]:text-black"
      id="remember-device"
      variant="secondary"
    >
      <Checkbox.Control className="size-5 rounded-full border border-neutral-300/70 bg-linear-to-b from-white to-neutral-50 shadow-sm ring-1 ring-black/5 transition-[border-color,box-shadow,transform] group-data-[selected=true]:border-transparent group-data-[selected=true]:shadow-md before:scale-70 before:rounded-full before:bg-transparent! before:opacity-0 group-hover:before:bg-neutral-200/50! group-hover:before:opacity-100 group-data-[selected=true]:before:scale-100 group-data-[selected=true]:before:bg-neutral-900! group-data-[selected=true]:before:opacity-100 group-data-[selected=true]:group-hover:before:bg-neutral-900! hover:border-neutral-400/90 active:scale-95 dark:border-neutral-600/70 dark:from-neutral-800 dark:to-neutral-900 dark:ring-white/10 dark:group-hover:before:bg-neutral-700/40! dark:group-data-[selected=true]:before:bg-neutral-100! dark:group-data-[selected=true]:group-hover:before:bg-neutral-100! dark:hover:border-neutral-500">
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label
          className="font-medium text-neutral-800 dark:text-neutral-100"
          htmlFor="remember-device"
        >
          Remember this device
        </Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
