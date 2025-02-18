import {addToast, Button} from "@heroui/react";
import React from "react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      {["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"].map(
        (position) => (
          <Button
            key={position}
            variant={"flat"}
            onPress={() => {
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
              });
            }}
          >
            {position}
          </Button>
        ),
      )}
    </div>
  );
}
