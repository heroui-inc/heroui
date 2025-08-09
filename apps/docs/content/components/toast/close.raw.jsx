import {addToast, Button, closeToast, closeAll} from "@heroui/react";
import React from "react";

export default function App() {
  const [toastKey, setToastKey] = React.useState([]);

  return (
    <>
      <div className="fixed z-[100]" />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="flat"
          onPress={() => {
            const key = addToast({
              title: "New Toast",
              timeout: Infinity,
            });

            if (!key) return;
            setToastKey((prev) => [...prev, key]);
          }}
        >
          Add Toast
        </Button>
        <Button
          variant="flat"
          onPress={() => {
            if (toastKey.length == 0) return;
            closeToast(toastKey[toastKey.length - 1]);
            setToastKey((prev) => prev.slice(0, prev.length - 1));
          }}
        >
          Close The Last Toast
        </Button>
        <Button
          variant="flat"
          onPress={() => {
            closeAll();
            setToastKey([]);
          }}
        >
          Close All Toasts
        </Button>
      </div>
    </>
  );
}
