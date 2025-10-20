"use client";

import {KbdAbbr, KbdContent, KbdRoot} from "@heroui/react";

export function InstructionalText() {
  return (
    <div className="space-y-3">
      <div className="bg-surface-2 rounded-lg p-4">
        <h4 className="mb-2 text-sm font-semibold">Quick Actions</h4>
        <ul className="space-y-2 text-sm">
          <li>
            • Open search:{" "}
            <KbdRoot>
              <KbdAbbr keyValue="command" />
              <KbdContent>K</KbdContent>
            </KbdRoot>
          </li>
          <li>
            • Toggle sidebar:{" "}
            <KbdRoot>
              <KbdAbbr keyValue="command" />
              <KbdContent>B</KbdContent>
            </KbdRoot>
          </li>
          <li>
            • New file:{" "}
            <KbdRoot>
              <KbdAbbr keyValue="command" />
              <KbdContent>N</KbdContent>
            </KbdRoot>
          </li>
          <li>
            • Quick save:{" "}
            <KbdRoot>
              <KbdAbbr keyValue="command" />
              <KbdContent>S</KbdContent>
            </KbdRoot>
          </li>
        </ul>
      </div>
    </div>
  );
}
