import {Surface} from "@heroui/react";

export function CustomStyles() {
  return (
    <Surface
      className="w-full max-w-sm rounded-xl border border-accent/15 bg-linear-to-br from-accent/8 via-surface to-surface-secondary p-4"
      variant="default"
    >
      <h3 className="text-sm font-semibold text-foreground">账单概览</h3>
      <p className="text-sm text-muted">在此查看发票和支付方式。</p>
    </Surface>
  );
}
