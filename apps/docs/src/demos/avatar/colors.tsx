"use client";

import {AvatarFallback, AvatarRoot} from "@heroui/react";

export function Colors() {
  return (
    <div className="flex items-center gap-4">
      <AvatarRoot color="default">
        <AvatarFallback>DF</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot color="accent">
        <AvatarFallback>AC</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot color="success">
        <AvatarFallback>SC</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot color="warning">
        <AvatarFallback>WR</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot color="danger">
        <AvatarFallback>DG</AvatarFallback>
      </AvatarRoot>
    </div>
  );
}
