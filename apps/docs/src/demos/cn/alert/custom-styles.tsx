import {Alert, Button, CloseButton} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="w-full max-w-xl">
      <Alert
        className="relative overflow-hidden rounded-xl border border-warning/20 bg-linear-to-br from-warning/10 via-surface to-surface-secondary shadow-sm dark:border-warning/30 dark:from-warning/15 dark:via-surface dark:to-warning/5"
        status="warning"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 -right-8 size-28 rounded-full bg-warning/15 blur-2xl dark:bg-warning/25"
        />
        <Alert.Indicator className="relative text-warning" />
        <Alert.Content className="relative">
          <Alert.Title>支付方式即将过期</Alert.Title>
          <Alert.Description>
            您的 Visa 卡（尾号 4242）将于 3 月 28 日过期。请更新账单信息，以免影响 Pro 订阅。
          </Alert.Description>
          <Button className="mt-3 sm:hidden" size="sm" variant="tertiary">
            更新账单
          </Button>
        </Alert.Content>
        <Button className="relative hidden shrink-0 sm:inline-flex" size="sm" variant="tertiary">
          更新账单
        </Button>
        <CloseButton className="relative" />
      </Alert>
    </div>
  );
}
