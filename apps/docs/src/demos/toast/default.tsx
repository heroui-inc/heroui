"use client";

import {Persons} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";

export function Default() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          toast("You have been invited to join a team", {
            actionProps: {
              children: "Dismiss",
              onPress: () => toast.clear(),
              variant: "tertiary",
            },
            description: "Bob sent you an invitation to join HeroUI team",
            indicator: <Persons />,
            variant: "default",
          });
        }}
      >
        Show toast
      </Button>
    </div>
  );
}
