"use client";

import {Label, Switch, SwitchGroup} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Allow Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Marketing emails</Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Social media updates</Label>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  );
}
