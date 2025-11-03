"use client";

import {Alert} from "@heroui/react";
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
    <Alert className="max-w-lg">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>Dismissible Alert</Alert.Title>
        <Alert.Description>
          This alert can be dismissed by clicking the close button.
        </Alert.Description>
      </Alert.Content>
      <Alert.Close onClick={() => setIsVisible(false)} />
    </Alert>
  );
}
