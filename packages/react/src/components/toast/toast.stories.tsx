import type {ToastVariants} from "./index";

import React, {useState} from "react";

import {Button} from "../button";

import {Toast, toast} from "./index";

type Placement = NonNullable<ToastVariants["placement"]>;

export default {
  argTypes: {},
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Feedback/Toast",
};

export const Default = {
  render: () => {
    return (
      <>
        <Toast.Region placement="bottom-right" />

        <div className="min-h-screen p-8">
          <div className="flex max-w-md flex-col gap-4">
            <h2 className="text-2xl font-bold">Toast API Examples</h2>

            <div className="flex flex-col gap-2">
              {/* 1. Default toast */}
              <Button
                onPress={() => {
                  toast("Event has been created");
                }}
              >
                1. Default Toast
              </Button>

              {/* 2. Toast with description */}
              <Button
                onPress={() => {
                  toast("Event has been created", {
                    description: "Monday, January 3rd at 6:00pm",
                  });
                }}
              >
                2. Toast with Description
              </Button>

              {/* 3. Success toast */}
              <Button
                onPress={() => {
                  toast.success("Event has been created");
                }}
              >
                3. Success Toast
              </Button>

              {/* 4. Info toast */}
              <Button
                onPress={() => {
                  toast.info("Be at the area 10 minutes before the event time");
                }}
              >
                4. Info Toast
              </Button>

              {/* 5. Warning toast */}
              <Button
                onPress={() => {
                  toast.warning("Event start time cannot be earlier than 8am");
                }}
              >
                5. Warning Toast
              </Button>

              {/* 6. Danger toast */}
              <Button
                onPress={() => {
                  toast.danger("Event has not been created");
                }}
              >
                6. Danger Toast
              </Button>

              {/* 7. Toast with action */}
              <Button
                onPress={() => {
                  toast("Event has been created", {
                    action: {
                      label: "Undo",
                      onClick: () => {
                        toast.info("Event undone");
                      },
                    },
                  });
                }}
              >
                7. Toast with Action
              </Button>

              {/* 8. Promise toast */}
              <Button
                onPress={() => {
                  const promise = () =>
                    new Promise<{name: string}>((resolve) =>
                      setTimeout(() => resolve({name: "Sonner"}), 2000),
                    );

                  toast.promise(promise, {
                    loading: "Loading...",
                    success: (data) => {
                      return `${data.name} toast has been added`;
                    },
                    error: "Error",
                  });
                }}
              >
                8. Promise Toast
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  },
};

export const Placement = {
  render: () => {
    const PlacementComponent = () => {
      const [placement, setPlacement] = useState<Placement>("bottom-right");

      const handlePlacementChange = (newPlacement: Placement) => {
        toast.clear();

        setPlacement(newPlacement);

        const placementLabels: Record<Placement, string> = {
          "top-left": "Top Left",
          "top-right": "Top Right",
          "bottom-left": "Bottom Left",
          "bottom-right": "Bottom Right",
        };

        toast(`${placementLabels[newPlacement]}`, {
          description: `Toast appears in the ${placementLabels[newPlacement].toLowerCase()}.`,
        });
      };

      return (
        <div className="min-h-screen p-8">
          <Toast.Region placement={placement} />

          <div className="flex max-w-md flex-col gap-4">
            <h2 className="text-2xl font-bold">Placement Options</h2>

            <div className="flex flex-col gap-2">
              <Button onPress={() => handlePlacementChange("top-left")}>Top Left</Button>
              <Button onPress={() => handlePlacementChange("top-right")}>Top Right</Button>
              <Button onPress={() => handlePlacementChange("bottom-left")}>Bottom Left</Button>
              <Button onPress={() => handlePlacementChange("bottom-right")}>Bottom Right</Button>
            </div>
          </div>
        </div>
      );
    };

    return <PlacementComponent />;
  },
};
