import {Divider} from "@heroui/react";

import {useThemeBuilder} from "../provider";

interface ShowcaseComponentProps {
  children: React.ReactElement | React.ReactElement[];
  id?: string;
  name: string;
}

function getFontStyle(fontName) {
  switch (fontName) {
    case "inter":
      return {fontFamily: "'Inter', sans-serif"};
    case "roboto":
      return {fontFamily: "'Roboto', sans-serif"};
    case "outfit":
      return {fontFamily: "'Outfit', sans-serif"};
    case "lora":
      return {fontFamily: "'Lora', serif"};
    default:
      return {};
  }
}

export function ShowcaseComponent({children, id, name}: ShowcaseComponentProps) {
  const {font} = useThemeBuilder();
  const style = getFontStyle(font);

  return (
    <div className="bg-background text-foreground py-6 p-4 rounded-lg" id={id} style={style}>
      <span className="text-xl font-medium text-default-800">{name}</span>
      <Divider className="mt-4 mb-6" />
      <div className="flex flex-wrap gap-6 mt-8">{children}</div>
    </div>
  );
}
