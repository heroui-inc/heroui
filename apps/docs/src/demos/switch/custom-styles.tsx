import {Label, Switch} from "@heroui/react";

export function CustomStyles() {
  return (
    <Switch className="[--switch-control-bg-checked:#404040] [--switch-control-bg:#e5e5e5] dark:[--switch-control-bg-checked:#e5e5e5] dark:[--switch-control-bg:#404040]">
      <Switch.Control className="shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <Switch.Thumb className="bg-white dark:bg-neutral-950" />
      </Switch.Control>
      <Switch.Content>
        <Label className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
          Enable notifications
        </Label>
      </Switch.Content>
    </Switch>
  );
}
