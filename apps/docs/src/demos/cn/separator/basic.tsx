import {Separator} from "@heroui/react";

export function Basic() {
  return (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">HeroUI v3 组件</h4>
        <p className="text-small text-default-400">美观、快速、现代的 React UI 库。</p>
      </div>
      <Separator className="my-4" />
      <div className="text-small flex h-5 items-center space-x-4">
        <div>博客</div>
        <Separator orientation="vertical" />
        <div>文档</div>
        <Separator orientation="vertical" />
        <div>源码</div>
      </div>
    </div>
  );
}
