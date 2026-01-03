"use client";

import {Shuffle} from "@gravity-ui/icons";
import {Button, Label} from "@heroui/react";

import {useRandomizeVariables} from "../hooks";

export function ShuffleButton() {
  const randomize = useRandomizeVariables();

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-transparent">Shuffle</Label>
      <Button isIconOnly size="md" variant="tertiary" onPress={randomize}>
        <Shuffle />
      </Button>
    </div>
  );
}
