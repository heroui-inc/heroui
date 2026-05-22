import {Kbd} from "@heroui/react";

export function InstructionalText() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-surface p-4">
        <h4 className="mb-2 text-sm font-semibold">快捷操作</h4>
        <ul className="space-y-2 text-sm">
          <li>
            • 打开搜索：{" "}
            <Kbd>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd>
          </li>
          <li>
            • 切换侧边栏：{" "}
            <Kbd>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>B</Kbd.Content>
            </Kbd>
          </li>
          <li>
            • 新建文件：{" "}
            <Kbd>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </li>
          <li>
            • 快速保存：{" "}
            <Kbd>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </li>
        </ul>
      </div>
    </div>
  );
}
