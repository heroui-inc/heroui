import {Divider} from "@heroui/react";
import Link from "next/link";

import {useThemeBuilder} from "../provider";
import {FontName} from "../types";

interface ShowcaseComponentProps {
  children: React.ReactElement | React.ReactElement[];
  id?: string;
  name: string;
}

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
    <div className="bg-background text-foreground py-6 p-4 rounded-lg group" id={id} style={style}>
      <div className="flex items-center gap-x-4">
        <span className="text-xl font-medium text-black dark:text-white">{name}</span>
        <Link
          className="text-sm text-blue-400 hover:text-blue-500 dark:text-blue-500 hover:dark:text-blue-600 opacity-0 group-hover:opacity-100 transition-[opacity,color] duration-100 group-hover:flex items-center px-8 py-2"
          href={`/docs/components/${name.toLowerCase()}`}
        >
          View in docs
        </Link>
      </div>
      <Divider className="mt-4 mb-6" />
      <div className="flex flex-wrap gap-6 mt-8">{children}</div>
    </div>
  );
}
