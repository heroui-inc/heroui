import {Kbd} from "@heroui/react";

export function SpecialKeys() {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        按{" "}
        <Kbd>
          <Kbd.Abbr keyValue="enter" />
        </Kbd>{" "}
        确认，或按{" "}
        <Kbd>
          <Kbd.Abbr keyValue="escape" />
        </Kbd>{" "}
        取消。
      </p>
      <p className="text-sm">
        使用{" "}
        <Kbd>
          <Kbd.Abbr keyValue="tab" />
        </Kbd>{" "}
        在表单字段间切换，使用{" "}
        <Kbd>
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Abbr keyValue="tab" />
        </Kbd>{" "}
        返回上一项。
      </p>
      <p className="text-sm">
        按住{" "}
        <Kbd>
          <Kbd.Abbr keyValue="space" />
        </Kbd>{" "}
        可临时启用平移模式。
      </p>
    </div>
  );
}
