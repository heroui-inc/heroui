import {Kbd} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>复制：</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>C</Kbd.Content>
        </Kbd>
        <Kbd variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>C</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>粘贴：</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>V</Kbd.Content>
        </Kbd>
        <Kbd variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>V</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>剪切：</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>X</Kbd.Content>
        </Kbd>
        <Kbd variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>X</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>撤销：</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd>
        <Kbd variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>重做：</span>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd>
        <Kbd variant="light">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>Z</Kbd.Content>
        </Kbd>
      </div>
    </div>
  );
}
