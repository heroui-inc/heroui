"use client";

import {Switch, SwitchGroup} from "@heroui/react";
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
            <Switch.Label>Enable notifications</Switch.Label>
          </Switch>
          <Switch defaultSelected name="newsletter" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Subscribe to newsletter</Switch.Label>
          </Switch>
          <Switch name="marketing" value="on">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Receive marketing updates</Switch.Label>
          </Switch>
        </SwitchGroup.Items>
      </SwitchGroup>
      <button
        className="bg-accent text-accent-foreground hover:bg-accent-hover mt-4 rounded-md px-4 py-2 text-sm font-medium"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
