"use client";

import {Typography} from "@heroui/react";

export const RenderProps = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography render={({children, ...domProps}) => <h2 {...domProps}>{children}</h2>} type="h1">
        H1 视觉样式，h2 语义元素
      </Typography>
      <Typography render={({children, ...domProps}) => <span {...domProps}>{children}</span>}>
        render prop 可更换底层元素，同时保留 HeroUI 的 props 与样式。
      </Typography>
    </div>
  );
};
