import {Typography} from "@heroui/react";

const scale = [
  {
    label: "h1",
    meta: "36px / 600 / 1.11 / tight",
    sample: "打造更出色的界面",
    type: "h1" as const,
  },
  {
    label: "h2",
    meta: "30px / 600 / 1.17 / tight",
    sample: "为智能时代而生",
    type: "h2" as const,
  },
  {
    label: "h3",
    meta: "24px / 600 / 1.25 / tight",
    sample: "按您的条件定价",
    type: "h3" as const,
  },
  {
    label: "h4",
    meta: "20px / 600 / 1.33 / tight",
    sample: "申请创业计划",
    type: "h4" as const,
  },
  {
    label: "h5",
    meta: "18px / 600 / 1.39 / tight",
    sample: "卡片标题",
    type: "h5" as const,
  },
  {
    label: "h6",
    meta: "16px / 600 / 1.50 / tight",
    sample: "较小的功能标题",
    type: "h6" as const,
  },
  {
    label: "body",
    meta: "16px / 400 / 1.75",
    sample: "用于文档、营销文案与描述的主要正文。",
    type: "body" as const,
  },
  {
    label: "body-sm",
    meta: "14px / 400 / 1.50",
    sample: "次要正文、表格单元格、导航与侧边栏项。",
    type: "body-sm" as const,
  },
  {
    label: "body-xs",
    meta: "12px / 400 / 1.25",
    sample: "说明文字、徽章、辅助文本与细则。",
    type: "body-xs" as const,
  },
  {
    label: "code",
    meta: "14px / mono",
    sample: "pnpm add @heroui/react",
    type: "code" as const,
  },
] as const;

export const TypographyScale = () => {
  return (
    <div className="flex w-full flex-col divide-y divide-border">
      {scale.map((row) => (
        <div key={row.label} className="grid grid-cols-[160px_1fr] items-center gap-8 py-5">
          <div className="flex shrink-0 flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">{row.label}</span>
            <span className="text-xs whitespace-nowrap text-muted">{row.meta}</span>
          </div>
          <Typography type={row.type}>{row.sample}</Typography>
        </div>
      ))}
    </div>
  );
};
