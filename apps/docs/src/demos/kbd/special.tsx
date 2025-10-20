"use client";

import {KbdAbbr, KbdRoot} from "@heroui/react";

export function SpecialKeys() {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        Press{" "}
        <KbdRoot>
          <KbdAbbr keyValue="enter" />
        </KbdRoot>{" "}
        to confirm or{" "}
        <KbdRoot>
          <KbdAbbr keyValue="escape" />
        </KbdRoot>{" "}
        to cancel.
      </p>
      <p className="text-sm">
        Use{" "}
        <KbdRoot>
          <KbdAbbr keyValue="tab" />
        </KbdRoot>{" "}
        to navigate between form fields and{" "}
        <KbdRoot>
          <KbdAbbr keyValue="shift" />
          <KbdAbbr keyValue="tab" />
        </KbdRoot>{" "}
        to go back.
      </p>
      <p className="text-sm">
        Hold{" "}
        <KbdRoot>
          <KbdAbbr keyValue="space" />
        </KbdRoot>{" "}
        to temporarily enable panning mode.
      </p>
    </div>
  );
}
