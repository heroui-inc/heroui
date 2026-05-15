"use client";

import {Description, Kbd, Label, SearchField} from "@heroui/react";
import React from "react";

export function WithKeyboardShortcut() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Shift+S
      if (e.shiftKey && e.key === "S" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Check for ESC key to blur the input
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    // Add global event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <SearchField name="search" value={value} onChange={setValue}>
          <Label>搜索</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input ref={inputRef} className="w-[280px]" placeholder="搜索…" />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>使用键盘快捷键快速聚焦此输入框</Description>
        </SearchField>
      </div>
      <div className="text-default-500 flex items-center gap-2 text-sm">
        <span>按</span>
        <Kbd>
          <Kbd.Abbr keyValue="shift" />
          <Kbd.Content>S</Kbd.Content>
        </Kbd>
        <span>聚焦搜索框</span>
      </div>
    </div>
  );
}
