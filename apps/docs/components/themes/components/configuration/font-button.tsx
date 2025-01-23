import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

interface FontButtonProps {
  title: any;
  className: string;
  value: string;
  setValue: (value: any) => void;
}

function getFontStyle(fontName) {
  switch (fontName) {
    case "inter":
      return {fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em"};
    case "roboto":
      return {fontFamily: "'Roboto', sans-serif"};
    case "outfit":
      return {fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em"};
    case "lora":
      return {fontFamily: "'Lora', serif"};
    default:
      return {};
  }
}

const FontButton = ({title, value, setValue}: FontButtonProps) => {
  const style = getFontStyle(title);

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
      <div className="font-medium text-2xl" style={style}>
        Ag
      </div>
      <div className="relative text-sm text-default-500">
        <div className="">{title}</div>
      </div>
    </Button>
  );
};

export default FontButton;
