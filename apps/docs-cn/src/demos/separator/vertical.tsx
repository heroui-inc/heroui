import {Separator} from "@heroui/react";

export function Vertical() {
  return (
    <div className="text-small flex h-5 items-center space-x-4">
      <div>博客</div>
      <Separator orientation="vertical" />
      <div>文档</div>
      <Separator orientation="vertical" />
      <div>源码</div>
    </div>
  );
}
