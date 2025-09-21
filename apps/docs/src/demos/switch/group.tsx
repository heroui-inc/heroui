"use client";

import {Switch, SwitchGroup} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Allow Notifications</Switch.Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Marketing emails</Switch.Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Social media updates</Switch.Label>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  );
}
