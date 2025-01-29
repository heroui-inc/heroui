import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import ValueButton from "./value-button";

import {Scaling as ScalingIcon} from "@/components/icons/scaling";

export function Scaling() {
  const {scaling, setScaling} = useThemeBuilder();

  return (
    <ConfigSection icon={<ScalingIcon className="h-5 w-5" />} title="Scaling">
      <ValueButton
        currentValue={scaling}
        endContent="%"
        setValue={(value) => {
          setScaling(value);
        }}
        value={90}
      />
      <ValueButton
        currentValue={scaling}
        endContent="%"
        setValue={(value) => {
          setScaling(value);
        }}
        value={95}
      />
      <ValueButton
        currentValue={scaling}
        endContent="%"
        setValue={(value) => {
          setScaling(value);
        }}
        value={100}
      />
      <ValueButton
        currentValue={scaling}
        endContent="%"
        setValue={(value) => {
          setScaling(value);
        }}
        value={105}
      />
      <ValueButton
        currentValue={scaling}
        endContent="%"
        setValue={(value) => {
          setScaling(value);
        }}
        value={110}
      />
    </ConfigSection>
  );
}
