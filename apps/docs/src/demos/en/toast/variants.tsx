"use client";

import {HardDrive, Persons} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="tertiary"
          onPress={() => {
            const id = toast("You have been invited to join a team", {
              actionProps: {
                children: "Dismiss",
                onPress: () => toast.close(id),
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
          onPress={() => {
            const id = toast.info("You have 2 credits left", {
              actionProps: {children: "Upgrade", onPress: () => toast.close(id)},
              description: "Get a paid plan for more credits",
            });
          }}
        >
          Accent toast
        </Button>
        <Button
          className="text-success-soft-foreground"
          size="sm"
          variant="tertiary"
          onPress={() => {
            const id = toast.success("You have upgraded your plan", {
              actionProps: {
                children: "Billing",
                className: "bg-success text-success-foreground",
                onPress: () => toast.close(id),
              },
              description: "You can continue using HeroUI Chat",
            });
          }}
        >
          Success toast
        </Button>
        <Button
          className="text-warning-soft-foreground"
          size="sm"
          variant="tertiary"
          onPress={() => {
            const id = toast.warning("You have no credits left", {
              actionProps: {
                children: "Upgrade",
                className: "bg-warning text-warning-foreground",
                onPress: () => toast.close(id),
              },
              description: "Upgrade to a paid plan to continue",
            });
          }}
        >
          Warning toast
        </Button>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() => {
            const id = toast.danger("Storage is full", {
              actionProps: {children: "Remove", onPress: () => toast.close(id), variant: "danger"},
              description:
                "Remove files to release space. Adding more text to demonstrate longer content display",
              indicator: <HardDrive />,
            });
          }}
        >
          Danger toast
        </Button>
      </div>
    </div>
  );
}
