import type {ConfigColors} from "../../types";

import {cn} from "@heroui/theme";

interface SwatchProps {
  colors: {background: string} & ConfigColors["baseColor"];
  className?: string;
  innerClassName?: string;
}

export default function Swatch({colors, className, innerClassName}: SwatchProps) {
  return (
    <div className={cn("flex h-6", className)}>
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className={cn("w-2 h-full", innerClassName)} style={{background: value}} />
      ))}
    </div>
  );
}
