"use client";

import {Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <div className="flex gap-3">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <div className="flex flex-col gap-1">
            <Switch.Label>Public profile</Switch.Label>
            <p className="text-muted text-sm">Allow others to see your profile information</p>
          </div>
        </div>
      </Switch>
    </div>
  );
}
