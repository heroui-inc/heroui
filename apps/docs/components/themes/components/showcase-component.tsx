import {Children, cloneElement} from "react";

import {useThemeBuilder} from "../provider";

interface ShowcaseComponentProps {
  children: React.ReactElement | React.ReactElement[];
  id?: string;
  name: string;
}

/**
 * Showcase component that renders various UI components for theme preview.
 */
export function ShowcaseComponent({children, id, name}: ShowcaseComponentProps) {
  const {radiusValue} = useThemeBuilder();

  return (
    <div className="bg-background text-foreground p-6 border border-default rounded-lg" id={id}>
      <span className="text-xl font-semibold">{name}</span>
      <div className="flex flex-wrap gap-4 mt-8">
        {Children.map(children, (child) => cloneElement(child, {radius: radiusValue}))}
      </div>
    </div>
  );
}
