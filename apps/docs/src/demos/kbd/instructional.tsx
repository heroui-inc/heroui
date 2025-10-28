import {Kbd} from "@heroui/react";

export function InstructionalText() {
  return (
    <div className="space-y-3">
      <div className="bg-surface-2 rounded-lg p-4">
        <h4 className="mb-2 text-sm font-semibold">Quick Actions</h4>
        <ul className="space-y-2 text-sm">
          <li>
            • Open search:{" "}
            <Kbd.Root>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd.Root>
          </li>
          <li>
            • Toggle sidebar:{" "}
            <Kbd.Root>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>B</Kbd.Content>
            </Kbd.Root>
          </li>
          <li>
            • New file:{" "}
            <Kbd.Root>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd.Root>
          </li>
          <li>
            • Quick save:{" "}
            <Kbd.Root>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd.Root>
          </li>
        </ul>
      </div>
    </div>
  );
}
