import {addToast, Button, ToastProvider} from "@heroui/react";
import React from "react";

export default function App() {
  const [placement, setPlacement] = React.useState("right-bottom");

  return (
    <>
      <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0} />
      <div className="flex flex-wrap gap-x-2">
        {[
          "left-top",
          "right-top",
          "center-top",
          "left-bottom",
          "right-bottom",
          "center-bottom",
        ].map((position) => (
          <Button
            key={position}
            className="w-fit m-2"
            variant={"bordered"}
            onPress={() => {
              setPlacement(position);
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
              });
            }}
          >
            Show toast at {position}
          </Button>
        ))}
      </div>
    </>
  );
}
