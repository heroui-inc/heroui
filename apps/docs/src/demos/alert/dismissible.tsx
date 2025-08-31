"use client";

import {useState} from "react";
import {Alert} from "@heroui/react";

export function Dismissible() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
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