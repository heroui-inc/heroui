import {Spinner} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="default"
        variant="default"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="gradient"
        variant="gradient"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="star"
        variant="star"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="dots"
        variant="dots"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="dots-blink"
        variant="dots-blink"
      />
    </div>
  );
}
