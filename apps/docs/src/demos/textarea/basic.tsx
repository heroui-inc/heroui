"use client";

import {TextArea} from "@heroui/react";

export function Basic() {
  return (
    <TextArea
      aria-label="Quick project update"
      className="h-32 w-96"
      placeholder="Share a quick project update..."
    />
  );
}
