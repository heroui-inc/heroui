import {Tabs} from "@heroui/react";

export function VerticalAlignment() {
  return (
    <Tabs align="start" className="w-full max-w-lg" orientation="vertical" variant="secondary">
      <Tabs.ListContainer>
        <Tabs.List aria-label="设置">
          <Tabs.Tab id="general">
            通用
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="billing">
            订阅与账单
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="appearance">
            外观
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="notifications">
            通知
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="privacy">
            隐私
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="px-4" id="general">
        <h3 className="mb-2 font-semibold">通用</h3>
        <p className="text-sm text-muted">管理你的账户信息与偏好设置。</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="billing">
        <h3 className="mb-2 font-semibold">订阅与账单</h3>
        <p className="text-sm text-muted">查看并管理你的套餐与支付方式。</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="appearance">
        <h3 className="mb-2 font-semibold">外观</h3>
        <p className="text-sm text-muted">选择主题并调整界面密度。</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="notifications">
        <h3 className="mb-2 font-semibold">通知</h3>
        <p className="text-sm text-muted">选择接收通知的方式与时间。</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="privacy">
        <h3 className="mb-2 font-semibold">隐私</h3>
        <p className="text-sm text-muted">控制你分享的内容以及谁可以查看你的动态。</p>
      </Tabs.Panel>
    </Tabs>
  );
}
