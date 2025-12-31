import {Button} from "@heroui/react";

export const ButtonsDemo = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button size="sm">Call to action</Button>
      <Button size="sm" variant="secondary">
        Call to action
      </Button>
      <Button size="sm" variant="tertiary">
        Call to action
      </Button>
      <Button size="sm" variant="danger">
        Call to action
      </Button>
      <Button size="sm" variant="danger-soft">
        Call to action
      </Button>
      <Button size="sm" variant="ghost">
        Call to action
      </Button>
    </div>
  );
};
