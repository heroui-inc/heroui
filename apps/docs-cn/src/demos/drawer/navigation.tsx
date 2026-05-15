import type {ComponentType, SVGProps} from "react";

import {Bars, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";

export function Navigation() {
  const navItems: {icon: ComponentType<SVGProps<SVGSVGElement>>; label: string}[] = [
    {icon: House, label: "首页"},
    {icon: Magnifier, label: "搜索"},
    {icon: Bell, label: "通知"},
    {icon: Envelope, label: "消息"},
    {icon: Person, label: "个人资料"},
    {icon: Gear, label: "设置"},
  ];

  return (
    <Drawer>
      <Button variant="secondary">
        <Bars />
        菜单
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>导航</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
