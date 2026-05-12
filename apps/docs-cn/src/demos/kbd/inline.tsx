import {Kbd} from "@heroui/react";

export function InlineUsage() {
  return (
    <div className="space-y-4">
      <p className="text-sm">
        Press{" "}
        <Kbd>
          <Kbd.Content>Esc</Kbd.Content>
        </Kbd>{" "}
        to close the dialog.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>{" "}
        to open the command palette.
      </p>
      <p className="text-sm">
        Navigate with{" "}
        <Kbd>
          <Kbd.Abbr keyValue="up" />
        </Kbd>{" "}
        and{" "}
        <Kbd>
          <Kbd.Abbr keyValue="down" />
        </Kbd>{" "}
        arrow keys.
      </p>
      <p className="text-sm">
        Save your work with{" "}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>S</Kbd.Content>
        </Kbd>{" "}
        regularly.
      </p>
    </div>
  );
}
