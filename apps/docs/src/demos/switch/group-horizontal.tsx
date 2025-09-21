"use client";

import {Switch, SwitchGroup} from "@heroui/react";

export function GroupHorizontal() {
  return (
    <SwitchGroup orientation="horizontal">
      <SwitchGroup.Items>
        <Switch name="notifications">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Notifications</Switch.Label>
        </Switch>
        <Switch name="marketing">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Marketing</Switch.Label>
        </Switch>
        <Switch name="social">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Social</Switch.Label>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  );
}
