import {Switch} from "@heroui/react";

export function WithoutLabel() {
  return (
    <Switch aria-label="Enable notifications">
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}
