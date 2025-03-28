import {addToast, Button, closeToast, closeAll} from "@heroui/react";
import React from "react";

export default function App() {
  const [toastKey, setToastKey] = React.useState([]);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onPress={() => {
          const key = addToast({
            title: "New Toast",
            timeout: Infinity,
          });

          setToastKey((prev) => [...prev, key]);
        }}
      >
        Create Toast
      </Button>
      <Button
        onPress={() => {
          if (toastKey.length == 0) return;
          closeToast(toastKey[toastKey.length - 1]);
          setToastKey((prev) => prev.slice(0, prev.length - 1));
        }}
      >
        Close The Last Toast
      </Button>
      <Button
        onPress={() => {
          closeAll();
          setToastKey([]);
        }}
      >
        Close All Toast
      </Button>
    </div>
  );
}
