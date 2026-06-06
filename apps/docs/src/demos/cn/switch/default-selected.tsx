import {Switch} from "@heroui/react";

export function DefaultSelected() {
  return (
    <Switch defaultSelected>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        启用通知
      </Switch.Content>
    </Switch>
  );
}
