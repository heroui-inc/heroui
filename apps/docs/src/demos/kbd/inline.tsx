import {Kbd} from "@heroui/react";

export function InlineUsage() {
  return (
    <div className="space-y-4">
      <p className="text-sm">
        Press{" "}
        <Kbd.Root>
          <Kbd.Content>Esc</Kbd.Content>
        </Kbd.Root>{" "}
        to close the dialog.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd.Root>{" "}
        to open the command palette.
      </p>
      <p className="text-sm">
        Navigate with{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="up" />
        </Kbd.Root>{" "}
        and{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="down" />
        </Kbd.Root>{" "}
        arrow keys.
      </p>
      <p className="text-sm">
        Save your work with{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>S</Kbd.Content>
        </Kbd.Root>{" "}
        regularly.
      </p>
    </div>
  );
}
