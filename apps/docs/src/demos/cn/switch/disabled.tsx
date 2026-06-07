import {Switch} from "@heroui/react";

export function Disabled() {
  return (
    <Switch isDisabled>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        启用通知
      </Switch.Content>
    </Switch>
  );
}
