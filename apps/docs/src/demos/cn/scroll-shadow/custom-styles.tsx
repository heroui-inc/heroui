import {ScrollShadow} from "@heroui/react";

const entries = [
  "与设计团队一起回顾季度目标。",
  "将深色模式设计令牌发布到生产环境。",
  "合并表单字段的无障碍修复。",
  "发布更新后的组件文档。",
  "安排下一冲刺的性能审计。",
  "在文档站点中添加滚动阴影示例。",
];

export function CustomStyles() {
  return (
    <div className="w-full sm:max-w-sm">
      <ScrollShadow
        hideScrollBar
        className="max-h-48 rounded-xl border border-border/80 bg-linear-to-b from-neutral-50/90 to-white p-4 ring-1 ring-black/5 dark:from-neutral-900/80 dark:to-neutral-900 dark:ring-white/10"
        size={48}
        variant="fade"
      >
        <div className="space-y-3">
          {entries.map((entry) => (
            <p
              key={entry}
              className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
            >
              {entry}
            </p>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
