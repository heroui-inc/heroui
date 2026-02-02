"use client";

import {Button, Checkbox, Label} from "@heroui/react";
import React from "react";

export function Form() {
  const handleSubmit = (e: React.SyntheticEvent) => {
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
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Checkbox id="form-notifications" name="notifications" value="on">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
          <Label htmlFor="form-notifications">Enable notifications</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox defaultSelected id="form-newsletter" name="newsletter" value="on">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
          <Label htmlFor="form-newsletter">Subscribe to newsletter</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="form-marketing" name="marketing" value="on">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
          <Label htmlFor="form-marketing">Receive marketing updates</Label>
        </div>
      </div>
      <Button className="mt-4" size="sm" type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
