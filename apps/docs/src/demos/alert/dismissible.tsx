"use client";

import {
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertRoot,
  AlertTitle,
} from "@heroui/react";
import {useState} from "react";

export function Dismissible() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        onClick={() => setIsVisible(true)}
      >
        Show alert again
      </button>
    );
  }

  return (
    <AlertRoot className="max-w-lg">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>
          This alert can be dismissed by clicking the close button.
        </AlertDescription>
      </AlertContent>
      <AlertClose onClick={() => setIsVisible(false)} />
    </AlertRoot>
  );
}
