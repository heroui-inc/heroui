"use client";

import {Label, Switch, SwitchGroup} from "@heroui/react";

export function GroupHorizontal() {
  return (
    <SwitchGroup orientation="horizontal">
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Notifications</Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Marketing</Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Social</Label>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  );
}
