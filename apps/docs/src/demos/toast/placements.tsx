"use client";

import type {ToastVariants} from "@heroui/react";

import {Button, Toast, ToastQueue} from "@heroui/react";

type Placement = NonNullable<ToastVariants["placement"]>;

const placements = ["top start", "top", "top end", "bottom start", "bottom", "bottom end"] as const;

// Create a separate queue for each placement
const placementQueues = Object.fromEntries(
  placements.map((p) => [p, new ToastQueue({maxVisibleToasts: 3})]),
) as Record<Placement, ToastQueue>;

export function Placements() {
  const showToast = (placement: Placement) => {
    placementQueues[placement].add({
      description: "This toast demonstrates the placement option",
      title: `Toast at ${placement}`,
      variant: "default",
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      {/* Render a ToastProvider for each placement */}
      {placements.map((p) => (
        <Toast.Provider key={p} placement={p} queue={placementQueues[p]} />
      ))}
      <div className="flex max-w-xs flex-wrap justify-center gap-2">
        {placements.map((p) => (
          <Button key={p} size="sm" variant="secondary" onPress={() => showToast(p)}>
            {p}
          </Button>
        ))}
      </div>
    </div>
  );
}
