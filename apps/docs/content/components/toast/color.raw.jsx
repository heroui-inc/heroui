import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <div className="flex flex-wrap gap-x-2">
        {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
          <Button
            key={color}
            // @ts-ignore
            color={color}
            variant={"solid"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                // @ts-ignore
                color: color,
              })
            }
          >
            {color}
          </Button>
        ))}
      </div>
    </>
  );
}
