import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

import {FontName, FontType} from "../../types";

interface FontButtonProps {
  title: FontName;
  className: string;
  value: string | undefined;
  setValue: (value: FontType) => void;
}

interface FontStyle {
  fontFamily: string;
  letterSpacing?: string;
}

function getFontStyle(fontName: FontName | undefined): FontStyle {
  if (!fontName) {
    return {fontFamily: "'Inter', sans-serif"};
  }
  switch (fontName) {
    case "Inter":
      return {fontFamily: "'Inter', sans-serif"};
    case "Roboto":
      return {fontFamily: "'Roboto', sans-serif"};
    case "Outfit":
      return {fontFamily: "'Outfit', sans-serif"};
    case "Lora":
      return {fontFamily: "'Lora', serif"};
    default:
      return {fontFamily: "'Inter', sans-serif"};
  }
}

const FontButton = ({title, value, setValue}: FontButtonProps) => {
  const style = getFontStyle(title);

  return (
    <Button
      className={clsx(
        "group h-24 flex flex-col justify-center items-center gap-y-2 px-0",
        value === title ? "border-foreground" : "",
      )}
      variant="bordered"
      onPress={() => {
        setValue(title);
      }}
    >
      <div className="font-medium text-2xl" style={style}>
        Ag12
      </div>
      <div className="relative text-tiny text-default-500">
        <div className="">{title}</div>
      </div>
    </Button>
  );
};

export default FontButton;
