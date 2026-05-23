"use client";

import {Button} from "@heroui/react";

import {useDictionary} from "@/hooks/use-dictionary";

export const ButtonsDemo = () => {
  const {demos} = useDictionary();
  const label = demos.buttons.clickMe;

  return (
    <div className="grid grid-cols-3 gap-x-3 gap-y-2">
      <Button size="sm">{label}</Button>
      <Button size="sm" variant="secondary">
        {label}
      </Button>
      <Button size="sm" variant="tertiary">
        {label}
      </Button>
      <Button size="sm" variant="danger">
        {label}
      </Button>
      <Button size="sm" variant="danger-soft">
        {label}
      </Button>
      <Button size="sm" variant="ghost">
        {label}
      </Button>
    </div>
  );
};
