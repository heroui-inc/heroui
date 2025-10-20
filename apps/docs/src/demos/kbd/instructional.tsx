"use client";

import {Kbd, KbdAbbr, KbdContent} from "@heroui/react";

export function InstructionalText() {
  return (
    <div className="space-y-3">
      <div className="bg-surface-2 rounded-lg p-4">
        <h4 className="mb-2 text-sm font-semibold">Quick Actions</h4>
        <ul className="space-y-2 text-sm">
          <li>
            • Open search:{" "}
            <Kbd>
              <KbdAbbr keyValue="command" />
              <KbdContent>K</KbdContent>
            </Kbd>
          </li>
          <li>
            • Toggle sidebar:{" "}
            <Kbd>
              <KbdAbbr keyValue="command" />
              <KbdContent>B</KbdContent>
            </Kbd>
          </li>
          <li>
            • New file:{" "}
            <Kbd>
              <KbdAbbr keyValue="command" />
              <KbdContent>N</KbdContent>
            </Kbd>
          </li>
          <li>
            • Quick save:{" "}
            <Kbd>
              <KbdAbbr keyValue="command" />
              <KbdContent>S</KbdContent>
            </Kbd>
          </li>
        </ul>
      </div>
    </div>
  );
}
