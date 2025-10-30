import {Kbd} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Copy:</span>
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
        <span>Paste:</span>
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
        <span>Cut:</span>
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
        <span>Undo:</span>
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
        <span>Redo:</span>
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
