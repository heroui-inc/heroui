"use client";

import {Kbd, KbdAbbr} from "@heroui/react";

export function NavigationKeys() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-muted text-sm">Arrow Keys:</span>
        <div className="flex items-center gap-2">
          <Kbd>
            <KbdAbbr keyValue="up" />
          </Kbd>
          <Kbd>
            <KbdAbbr keyValue="down" />
          </Kbd>
          <Kbd>
            <KbdAbbr keyValue="left" />
          </Kbd>
          <Kbd>
            <KbdAbbr keyValue="right" />
          </Kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted text-sm">Page Navigation:</span>
        <div className="flex items-center gap-2">
          <Kbd>
            <KbdAbbr keyValue="pageup" />
          </Kbd>
          <Kbd>
            <KbdAbbr keyValue="pagedown" />
          </Kbd>
          <Kbd>
            <KbdAbbr keyValue="home" />
          </Kbd>
          <Kbd>
            <KbdAbbr keyValue="end" />
          </Kbd>
        </div>
      </div>
    </div>
  );
}
