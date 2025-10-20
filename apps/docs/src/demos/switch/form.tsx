"use client";

import {
  Button,
  Label,
  SwitchControl,
  SwitchGroupItems,
  SwitchGroupRoot,
  SwitchRoot,
  SwitchThumb,
} from "@heroui/react";
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
      <SwitchGroupRoot>
        <SwitchGroupItems>
          <SwitchRoot name="notifications" value="on">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
            <Label className="text-sm">Enable notifications</Label>
          </SwitchRoot>
          <SwitchRoot defaultSelected name="newsletter" value="on">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
            <Label className="text-sm">Subscribe to newsletter</Label>
          </SwitchRoot>
          <SwitchRoot name="marketing" value="on">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
            <Label className="text-sm">Receive marketing updates</Label>
          </SwitchRoot>
        </SwitchGroupItems>
      </SwitchGroupRoot>
      <Button className="mt-4" size="sm" type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
