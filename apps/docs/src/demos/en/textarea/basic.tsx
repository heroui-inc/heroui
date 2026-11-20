import type {TextAreaProps} from "@heroui/react";

import {TextArea} from "@heroui/react";

export function Basic(props: TextAreaProps) {
  return (
    <TextArea
      {...props}
      aria-label="Quick project update"
      className="h-32 w-96"
      placeholder="Share a quick project update..."
    />
  );
}
