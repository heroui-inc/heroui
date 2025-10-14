"use client";

import {Label, TextArea} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex w-96 flex-col gap-2">
      <Label htmlFor="textarea-disabled">Project summary</Label>
      <TextArea
        isDisabled
        id="textarea-disabled"
        placeholder="Summaries are disabled while the review is in progress."
        rows={4}
      />
    </div>
  );
}
