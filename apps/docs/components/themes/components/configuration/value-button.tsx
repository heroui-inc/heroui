import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

interface ValueButtonProps {
  currentValue: string | number;
  value: string | number;
  setValue: (value: any) => void;
  endContent?: string;
}

const ValueButton = ({currentValue, value, setValue, endContent}: ValueButtonProps) => {
  return (
    <Button
      isIconOnly
      className={clsx(
        "group h-auto w-auto rounded-md p-0.5 px-1 text-base font-normal",
        value === currentValue ? "border-foreground" : "",
      )}
      variant="bordered"
      onPress={() => {
        setValue(value);
      }}
    >
      {value}
      {endContent}
    </Button>
  );
};

export default ValueButton;
