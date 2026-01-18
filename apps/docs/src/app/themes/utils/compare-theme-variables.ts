import type {ThemeVariables} from "../constants";

export function compareThemeVariables(
  variables: ThemeVariables,
  snapshotVariables: ThemeVariables,
) {
  return (
    variables.chroma === snapshotVariables.chroma &&
    variables.hue === snapshotVariables.hue &&
    variables.lightness === snapshotVariables.lightness &&
    variables.fontFamily === snapshotVariables.fontFamily &&
    variables.formRadius === snapshotVariables.formRadius &&
    variables.radius === snapshotVariables.radius &&
    variables.theme === snapshotVariables.theme &&
    variables.base === snapshotVariables.base
  );
}
