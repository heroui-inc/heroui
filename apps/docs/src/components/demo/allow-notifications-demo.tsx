"use client";

import {Description, Label, Switch} from "@heroui/react";

import {useDictionary} from "@/hooks/use-dictionary";

export function AllowNotificationsDemo() {
  const {demos} = useDictionary();
  const t = demos.allowNotifications;

  return (
    <div className="flex w-full justify-center">
      <Switch defaultSelected>
        <div className="flex gap-8 p-4">
          <div className="-mt-0.5 flex flex-col justify-start gap-1">
            <Label className="w-fit text-sm font-medium">{t.label}</Label>
            <Description>{t.description}</Description>
          </div>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </div>
      </Switch>
    </div>
  );
}
