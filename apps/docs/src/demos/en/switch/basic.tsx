import type {SwitchProps} from "@heroui/react";

import {Switch} from "@heroui/react";

export function Basic(props: SwitchProps) {
  return (
    <Switch {...props}>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        Enable notifications
      </Switch.Content>
    </Switch>
  );
}
