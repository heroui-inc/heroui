"use client";

import {Kbd, KbdAbbr} from "@heroui/react";

export function SpecialKeys() {
  return (
    <div className="space-y-3">
      <p className="text-sm">
        Press{" "}
        <Kbd>
          <KbdAbbr keyValue="enter" />
        </Kbd>{" "}
        to confirm or{" "}
        <Kbd>
          <KbdAbbr keyValue="escape" />
        </Kbd>{" "}
        to cancel.
      </p>
      <p className="text-sm">
        Use{" "}
        <Kbd>
          <KbdAbbr keyValue="tab" />
        </Kbd>{" "}
        to navigate between form fields and{" "}
        <Kbd>
          <KbdAbbr keyValue="shift" />
          <KbdAbbr keyValue="tab" />
        </Kbd>{" "}
        to go back.
      </p>
      <p className="text-sm">
        Hold{" "}
        <Kbd>
          <KbdAbbr keyValue="space" />
        </Kbd>{" "}
        to temporarily enable panning mode.
      </p>
    </div>
  );
}
