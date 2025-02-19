import {addToast, ToastProvider, Button} from "@heroui/react";
import React from "react";

export default function App() {
  const [placement, setPlacement] = React.useState("bottom-right");

  return (
    <>
      <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0} />
      <div className="flex flex-wrap gap-2">
        {[
          "top-left",
          "top-center",
          "top-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ].map((position) => (
          <Button
            key={position}
            variant={"flat"}
            onPress={() => {
              setPlacement(position);
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
              });
            }}
          >
            {position}
          </Button>
        ))}
      </div>
    </>
  );
}
