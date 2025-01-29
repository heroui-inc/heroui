import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

interface ValueButtonProps {
  currentValue: string | number;
  value: string | number;
  setValue: (value: any) => void;
}

const ValueButton = ({currentValue, value, setValue}: ValueButtonProps) => {
  return (
    <Button
      isIconOnly
      className={clsx(
        "group h-auto rounded-md p-0.5 p-x-1 text-sm",
        value === currentValue ? "border-foreground" : "",
      )}
      variant="bordered"
      onPress={() => {
        setValue(value);
      }}
    >
      {value}
    </Button>
  );
};

export default ValueButton;
