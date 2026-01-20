import {Button} from "@heroui/react";

export const ButtonsDemo = () => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      <Button size="sm">Click me</Button>
      <Button size="sm" variant="secondary">
        Click me
      </Button>
      <Button size="sm" variant="tertiary">
        Click me
      </Button>
      <Button size="sm" variant="danger">
        Click me
      </Button>
      <Button size="sm" variant="danger-soft">
        Click me
      </Button>
      <Button size="sm" variant="ghost">
        Click me
      </Button>
    </div>
  );
};
