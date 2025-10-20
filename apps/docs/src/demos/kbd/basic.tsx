"use client";

import {Kbd, KbdAbbr, KbdContent} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-4">
      <Kbd>
        <KbdAbbr keyValue="command" />
        <KbdContent>K</KbdContent>
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="shift" />
        <KbdContent>P</KbdContent>
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="ctrl" />
        <KbdContent>C</KbdContent>
      </Kbd>
      <Kbd>
        <KbdAbbr keyValue="option" />
        <KbdContent>D</KbdContent>
      </Kbd>
    </div>
  );
}
