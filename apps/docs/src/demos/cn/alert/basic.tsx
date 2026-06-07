import {Alert, Button, CloseButton, Spinner} from "@heroui/react";
import React from "react";

export function Basic() {
  return (
    <div className="grid w-full max-w-xl gap-4">
      {/* 默认 — 一般信息 */}
      <Alert>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>新功能已上线</Alert.Title>
          <Alert.Description>
            查看我们的最新更新，包括深色模式支持与改进的无障碍体验。
          </Alert.Description>
        </Alert.Content>
      </Alert>

      {/* 强调 — 重要信息含操作 */}
      <Alert status="accent">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>有可用更新</Alert.Title>
          <Alert.Description>
            应用有新版本可用。请刷新页面以获取最新功能与问题修复。
          </Alert.Description>
          <Button className="mt-2 sm:hidden" size="sm" variant="primary">
            刷新
          </Button>
        </Alert.Content>
        <Button className="hidden sm:block" size="sm" variant="primary">
          刷新
        </Button>
      </Alert>

      {/* 危险 — 错误与排查步骤 */}
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>无法连接到服务器</Alert.Title>
          <Alert.Description>
            当前遇到连接问题，请尝试以下操作：
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>检查网络连接</li>
              <li>刷新页面</li>
              <li>清除浏览器缓存</li>
            </ul>
          </Alert.Description>
          <Button className="mt-2 sm:hidden" size="sm" variant="danger">
            重试
          </Button>
        </Alert.Content>
        <Button className="hidden sm:block" size="sm" variant="danger">
          重试
        </Button>
      </Alert>

      {/* 无描述 */}
      <Alert status="success">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>个人资料已更新</Alert.Title>
        </Alert.Content>
        <CloseButton />
      </Alert>

      {/* 自定义指示器 — 加载中 */}
      <Alert status="accent">
        <Alert.Indicator>
          <Spinner size="sm" />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>正在处理你的请求</Alert.Title>
          <Alert.Description>正在同步你的数据，请稍候，这可能需要一点时间。</Alert.Description>
        </Alert.Content>
      </Alert>

      {/* 无关闭按钮 */}
      <Alert status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>计划维护</Alert.Title>
          <Alert.Description>
            我们将于 UTC 时间 3 月 15 日（周日）凌晨 2:00 至上午 6:00
            进行计划维护，期间服务将暂时不可用。
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}
