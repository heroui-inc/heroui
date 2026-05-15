import {Typography} from "@heroui/react";

export const Primitives = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography.Heading level={1}>仪表盘</Typography.Heading>
      <Typography.Paragraph>
        便捷原语是 Typography 的薄封装，可在不学习第二套样式系统的情况下选择显式组合。
      </Typography.Paragraph>
      <Typography.Paragraph color="muted" size="sm">
        Paragraph 支持 base、sm 和 xs 尺寸。
      </Typography.Paragraph>
      <Typography.Code>Typography.Code</Typography.Code>
    </div>
  );
};
