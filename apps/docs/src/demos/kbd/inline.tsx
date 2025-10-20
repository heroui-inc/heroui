"use client";

import {KbdAbbr, KbdContent, KbdRoot} from "@heroui/react";

export function InlineUsage() {
  return (
    <div className="space-y-4">
      <p className="text-sm">
        Press{" "}
        <KbdRoot>
          <KbdContent>Esc</KbdContent>
        </KbdRoot>{" "}
        to close the dialog.
      </p>
      <p className="text-sm">
        Use{" "}
        <KbdRoot>
          <KbdAbbr keyValue="command" />
          <KbdContent>K</KbdContent>
        </KbdRoot>{" "}
        to open the command palette.
      </p>
      <p className="text-sm">
        Navigate with{" "}
        <KbdRoot>
          <KbdAbbr keyValue="up" />
        </KbdRoot>{" "}
        and{" "}
        <KbdRoot>
          <KbdAbbr keyValue="down" />
        </KbdRoot>{" "}
        arrow keys.
      </p>
      <p className="text-sm">
        Save your work with{" "}
        <KbdRoot>
          <KbdAbbr keyValue="command" />
          <KbdContent>S</KbdContent>
        </KbdRoot>{" "}
        regularly.
      </p>
    </div>
  );
}
