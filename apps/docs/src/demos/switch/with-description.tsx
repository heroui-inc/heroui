"use client";

import {Description, Label, Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <div className="flex gap-3">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-normal">Public profile</Label>
            <Description>Allow others to see your profile information</Description>
          </div>
        </div>
      </Switch>
    </div>
  );
}
