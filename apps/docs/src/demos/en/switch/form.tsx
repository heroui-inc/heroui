"use client";

import {Button, Switch, SwitchGroup} from "@heroui/react";
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
        <Switch name="notifications" value="on">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            Enable notifications
          </Switch.Content>
        </Switch>
        <Switch defaultSelected name="newsletter" value="on">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            Subscribe to newsletter
          </Switch.Content>
        </Switch>
        <Switch name="marketing" value="on">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            Receive marketing updates
          </Switch.Content>
        </Switch>
      </SwitchGroup>
      <Button className="mt-4" size="sm" type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
