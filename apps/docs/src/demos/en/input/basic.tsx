import type {InputProps} from "@heroui/react";

import {Input} from "@heroui/react";

export function Basic(props: InputProps) {
  return <Input {...props} aria-label="Name" className="w-64" placeholder="Enter your name" />;
}
