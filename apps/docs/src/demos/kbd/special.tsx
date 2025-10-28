import {Kbd} from "@heroui/react";

export function SpecialKeys() {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        Press{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="enter" />
        </Kbd.Root>{" "}
        to confirm or{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="escape" />
        </Kbd.Root>{" "}
        to cancel.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="tab" />
        </Kbd.Root>{" "}
        to navigate between form fields and{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Abbr keyValue="tab" />
        </Kbd.Root>{" "}
        to go back.
      </p>
      <p className="text-sm">
        Hold{" "}
        <Kbd.Root>
          <Kbd.Abbr keyValue="space" />
        </Kbd.Root>{" "}
        to temporarily enable panning mode.
      </p>
    </div>
  );
}
