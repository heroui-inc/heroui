"use client";

import {Kbd, KbdAbbr, KbdContent} from "@heroui/react";

export function InlineUsage() {
  return (
    <div className="space-y-4">
      <p className="text-sm">
        Press{" "}
        <Kbd>
          <KbdContent>Esc</KbdContent>
        </Kbd>{" "}
        to close the dialog.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdContent>K</KbdContent>
        </Kbd>{" "}
        to open the command palette.
      </p>
      <p className="text-sm">
        Navigate with{" "}
        <Kbd>
          <KbdAbbr keyValue="up" />
        </Kbd>{" "}
        and{" "}
        <Kbd>
          <KbdAbbr keyValue="down" />
        </Kbd>{" "}
        arrow keys.
      </p>
      <p className="text-sm">
        Save your work with{" "}
        <Kbd>
          <KbdAbbr keyValue="command" />
          <KbdContent>S</KbdContent>
        </Kbd>{" "}
        regularly.
      </p>
    </div>
  );
}
