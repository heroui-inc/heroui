import {Tabs} from "@heroui/react";

export function SecondaryVertical() {
  return (
    <Tabs className="w-full max-w-lg" orientation="vertical" variant="secondary">
      <Tabs.ListContainer>
        <Tabs.List aria-label="垂直标签页">
          <Tabs.Tab id="account">
            账户
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="security">
            安全
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="notifications">
            通知
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="billing">
            账单
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="px-4" id="account">
        <h3 className="mb-2 font-semibold">账户 Settings</h3>
        <p className="text-sm text-muted">管理你的账户信息与偏好设置。</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="security">
        <h3 className="mb-2 font-semibold">安全 Settings</h3>
        <p className="text-sm text-muted">配置双重认证与密码设置。</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="notifications">
        <h3 className="mb-2 font-semibold">通知偏好</h3>
        <p className="text-sm text-muted">选择接收通知的方式与时间。</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="billing">
        <h3 className="mb-2 font-semibold">账单 Information</h3>
        <p className="text-sm text-muted">查看并管理订阅与支付方式。</p>
      </Tabs.Panel>
    </Tabs>
  );
}
