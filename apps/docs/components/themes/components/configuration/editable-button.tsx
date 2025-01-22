import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

interface EditableButtonProps {
  title: any;
  className: string;
  value: string;
  setValue: (value: any) => void;
}

const EditableButton = ({title, className, value, setValue}: EditableButtonProps) => {
  return (
    <Button
      className={clsx(
        "group h-auto p-4 flex flex-col justify-between",
        value === title ? "border-foreground" : "",
      )}
      variant="bordered"
      onPress={() => {
        setValue(title);
      }}
    >
      <div
        className={clsx(
          "h-9 w-9 border-t-2 border-l-2 border-primary-500 bg-gradient-to-b from-[#0077ff1A] to-[#92c5ff00]",
          className,
        )}
      />
      <div className="relative text-sm text-default-500">
        <div className="">{title}</div>
      </div>
    </Button>
  );
};

export default EditableButton;
