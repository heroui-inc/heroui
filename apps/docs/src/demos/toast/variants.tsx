"use client";

import {HardDrive, Persons} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";

const noop = () => {};

export function Variants() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="tertiary"
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
          Default toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.info("You have 2 credits left", {
              actionProps: {children: "Upgrade", onPress: noop},
              description: "Get a paid plan for more credits",
            })
          }
        >
          Accent toast
        </Button>
        <Button
          className="text-success"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.success("You have upgraded your plan", {
              actionProps: {
                children: "Billing",
                className: "bg-success text-success-foreground",
                onPress: noop,
              },
              description: "You can continue using HeroUI Chat",
            })
          }
        >
          Success toast
        </Button>
        <Button
          className="text-warning"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.warning("You have no credits left", {
              actionProps: {
                children: "Upgrade",
                className: "bg-warning text-warning-foreground",
                onPress: noop,
              },
              description: "Upgrade to a paid plan to continue",
            })
          }
        >
          Warning toast
        </Button>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() =>
            toast.danger("Storage is full", {
              actionProps: {children: "Remove", onPress: noop, variant: "danger"},
              description:
                "Remove files to release space. I'm adding more text as usual but it's okay I guess I just want to see how it looks with a lot of information",
              indicator: <HardDrive />,
            })
          }
        >
          Danger toast
        </Button>
      </div>
    </div>
  );
}
