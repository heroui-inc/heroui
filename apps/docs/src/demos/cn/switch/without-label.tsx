import {Switch} from "@heroui/react";

export function WithoutLabel() {
  return (
    <Switch aria-label="启用通知">
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  );
}
