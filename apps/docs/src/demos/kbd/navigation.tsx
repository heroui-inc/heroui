"use client";

import {KbdAbbr, KbdRoot} from "@heroui/react";

export function NavigationKeys() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-muted text-sm">Arrow Keys:</span>
        <div className="flex items-center gap-2">
          <KbdRoot>
            <KbdAbbr keyValue="up" />
          </KbdRoot>
          <KbdRoot>
            <KbdAbbr keyValue="down" />
          </KbdRoot>
          <KbdRoot>
            <KbdAbbr keyValue="left" />
          </KbdRoot>
          <KbdRoot>
            <KbdAbbr keyValue="right" />
          </KbdRoot>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted text-sm">Page Navigation:</span>
        <div className="flex items-center gap-2">
          <KbdRoot>
            <KbdAbbr keyValue="pageup" />
          </KbdRoot>
          <KbdRoot>
            <KbdAbbr keyValue="pagedown" />
          </KbdRoot>
          <KbdRoot>
            <KbdAbbr keyValue="home" />
          </KbdRoot>
          <KbdRoot>
            <KbdAbbr keyValue="end" />
          </KbdRoot>
        </div>
      </div>
    </div>
  );
}
