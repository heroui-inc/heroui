import {Typography} from "@heroui/react";

export const Default = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography type="h1">打造更出色的界面</Typography>
      <Typography type="h2">保持语义化的排版</Typography>
      <Typography type="h3">默认可组合</Typography>
      <Typography type="h4">小标题</Typography>
      <Typography>
        HeroUI Typography 以 React Aria Components Text 为原语，提供语义化排版类型与 render prop
        多态。
      </Typography>
      <Typography color="muted" type="body-sm">
        用于次要说明的较小弱化正文。
      </Typography>
      <Typography type="code">pnpm add @heroui/react</Typography>
    </div>
  );
};
