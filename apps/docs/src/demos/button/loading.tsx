"use client";

import {Button, Spinner} from "@heroui/react";
import React from "react";

export function Loading() {
  return (
    <Button isPending>
      {({isPending}) => (
        <>
          {isPending ? <Spinner /> : null}
          Uploading...
        </>
      )}
    </Button>
  );
}
