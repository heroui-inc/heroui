"use client";

import {Button, Label, Switch, SwitchGroup} from "@heroui/react";
import React from "react";

export function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    alert(
      `Form submitted with:\n${Array.from(formData.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}`,
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <SwitchGroup>
        <SwitchGroup.Items>
          <Switch name="notifications" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label className="text-sm font-normal">Enable notifications</Label>
          </Switch>
          <Switch defaultSelected name="newsletter" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label className="text-sm font-normal">Subscribe to newsletter</Label>
          </Switch>
          <Switch name="marketing" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label className="text-sm font-normal">Receive marketing updates</Label>
          </Switch>
        </SwitchGroup.Items>
      </SwitchGroup>
      <Button className="mt-4" size="sm" type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
