import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <div className="flex flex-wrap gap-x-2">
        {["none", "sm", "md", "lg", "full"].map((radius) => (
          <Button
            key={radius}
            radius={radius}
            variant={"solid"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                // @ts-ignore
                radius: radius,
              })
            }
          >
            {radius}
          </Button>
        ))}
      </div>
    </>
  );
}
