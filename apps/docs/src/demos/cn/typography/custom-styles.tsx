import {Typography} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex max-w-md flex-col gap-2 rounded-xl border border-border/80 bg-surface-secondary p-4">
      <Typography
        className="text-xs font-medium tracking-wide text-accent uppercase"
        type="body-xs"
      >
        更新日志
      </Typography>
      <Typography className="font-semibold tracking-tight text-foreground" type="h4">
        更快的搜索结果
      </Typography>
      <Typography className="text-sm leading-relaxed text-muted" type="body-sm">
        得益于改进的索引，查询现在在 200 毫秒内返回。
      </Typography>
    </div>
  );
}
