import {addToast, Button, ToastProvider} from "@heroui/react";
import React from "react";

export default function App() {
  const topToasterId = "multi-toaster-top";
  const bottomToasterId = "multi-toaster-bottom";

  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider placement="top-right" toastOffset={60} toasterId={topToasterId} />
        <ToastProvider placement="bottom-right" toasterId={bottomToasterId} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="flat"
          onPress={() => {
            addToast({
              title: "Top Toast Title",
              description: "Toast Displayed Successfully",
              toasterId: topToasterId,
            });
          }}
        >
          Show top toast
        </Button>
        <Button
          variant="flat"
          onPress={() => {
            addToast({
              title: "Bottom Toast Title",
              description: "Toast Displayed Successfully",
              toasterId: bottomToasterId,
            });
          }}
        >
          Show bottom toast
        </Button>
      </div>
    </>
  );
}
