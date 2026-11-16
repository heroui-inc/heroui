import type {InputProps} from "@heroui/react";

import {Input} from "@heroui/react";

export function Basic(props: InputProps) {
  return <Input {...props} aria-label="姓名" className="w-64" placeholder="输入你的姓名" />;
}
