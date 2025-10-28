import {Button, Spinner} from "@heroui/react";
import React from "react";

export function Loading() {
  return (
    <Button isPending>
      {({isPending}) => (
        <>
          {isPending ? <Spinner size="sm" /> : null}
          Uploading...
        </>
      )}
    </Button>
  );
}
