"use client";

import {KbdAbbr, KbdContent, KbdRoot} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-4">
      <KbdRoot>
        <KbdAbbr keyValue="command" />
        <KbdContent>K</KbdContent>
      </KbdRoot>
      <KbdRoot>
        <KbdAbbr keyValue="shift" />
        <KbdContent>P</KbdContent>
      </KbdRoot>
      <KbdRoot>
        <KbdAbbr keyValue="ctrl" />
        <KbdContent>C</KbdContent>
      </KbdRoot>
      <KbdRoot>
        <KbdAbbr keyValue="option" />
        <KbdContent>D</KbdContent>
      </KbdRoot>
    </div>
  );
}
