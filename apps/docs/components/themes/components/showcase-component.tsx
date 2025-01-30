import {Divider} from "@heroui/react";

import {useThemeBuilder} from "../provider";

interface ShowcaseComponentProps {
  children: React.ReactElement | React.ReactElement[];
  id?: string;
  name: string;
}

type FontName = "inter" | "roboto" | "outfit" | "lora";

const FONT_CONFIGS: Record<FontName, {family: string; type: "sans-serif" | "serif"}> = {
  inter: {family: "Inter", type: "sans-serif"},
  roboto: {family: "Roboto", type: "sans-serif"},
  outfit: {family: "Outfit", type: "sans-serif"},
  lora: {family: "Lora", type: "serif"},
};

function getFontStyle(fontName: FontName) {
  const config = FONT_CONFIGS[fontName];

  return config ? {fontFamily: `'${config.family}', ${config.type}`} : {};
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
