"use client";

import {useVariablesState} from "../hooks/use-variables-state";

import {ChromaSlider} from "./chroma-slider";
import {LockableLabel} from "./lockable-label";

export function BaseColorSlider() {
  const [variables, setVariables] = useVariablesState();
  const {base, hue} = variables;

  const handleBaseSliderChange = (value: number) => {
    setVariables({
      ...variables,
      base: value,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <LockableLabel
        label="Base"
        tooltip="Controls how much gray is used in neutrals like backgrounds and surfaces"
        variable="base"
      />
      <ChromaSlider
        className="h-6 w-[160px]"
        hue={hue}
        value={base}
        onChange={handleBaseSliderChange}
      />
    </div>
  );
}
