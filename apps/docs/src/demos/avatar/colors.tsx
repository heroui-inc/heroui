"use client";

import {Avatar} from "@heroui/react";

export function Colors() {
  return (
    <div className="flex items-center gap-4">
      <Avatar color="default">
        <Avatar.Fallback>DF</Avatar.Fallback>
      </Avatar>
      <Avatar color="accent">
        <Avatar.Fallback>AC</Avatar.Fallback>
      </Avatar>
      <Avatar color="success">
        <Avatar.Fallback>SC</Avatar.Fallback>
      </Avatar>
      <Avatar color="warning">
        <Avatar.Fallback>WR</Avatar.Fallback>
      </Avatar>
      <Avatar color="danger">
        <Avatar.Fallback>DG</Avatar.Fallback>
      </Avatar>
    </div>
  );
}
