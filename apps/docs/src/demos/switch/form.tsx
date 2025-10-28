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
        <Switch.Root name="notifications" value="on">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Enable notifications</Label>
        </Switch.Root>
        <Switch.Root defaultSelected name="newsletter" value="on">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Subscribe to newsletter</Label>
        </Switch.Root>
        <Switch.Root name="marketing" value="on">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Receive marketing updates</Label>
        </Switch.Root>
      </SwitchGroup>
      <Button className="mt-4" size="sm" type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
