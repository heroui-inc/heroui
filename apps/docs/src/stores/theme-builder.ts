import {temporal} from "zundo";
import {create} from "zustand";

export type ThemeVariables = {
  accentColor: string;
  fontFamily: string;
  radius: string;
  formRadius: string;
  theme: string;
};

const defaultVariables: ThemeVariables = {
  accentColor: "#0072f5",
  fontFamily: "inter",
  formRadius: "large",
  radius: "medium",
  theme: "default",
};

interface ThemeBuilderState {
  variables: ThemeVariables;
  lockedVariables: Record<keyof ThemeVariables, boolean>;
  toggleVariableLock: (variable: keyof ThemeVariables) => void;
  setVariable: (variable: keyof ThemeVariables, value: string) => void;
  reset: () => void;
  randomize: (options: {
    colors: string[];
    fonts: string[];
    radiusOptions: string[];
    themes: string[];
  }) => void;
}

export const useThemeBuilder = create<ThemeBuilderState>()(
  temporal((set, get) => ({
    lockedVariables: {
      accentColor: false,
      fontFamily: false,
      formRadius: false,
      radius: false,
      theme: false,
    },
    randomize: ({colors, fonts, radiusOptions, themes}) => {
      const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;
      const lockedVariables = get().lockedVariables;
      const variables = get().variables;

      set({
        variables: {
          accentColor: lockedVariables.accentColor ? variables.accentColor : randomPick(colors),
          fontFamily: lockedVariables.fontFamily ? variables.fontFamily : randomPick(fonts),
          formRadius: lockedVariables.formRadius ? variables.formRadius : randomPick(radiusOptions),
          radius: lockedVariables.radius ? variables.radius : randomPick(radiusOptions),
          theme: lockedVariables.theme ? variables.theme : randomPick(themes),
        },
      });
    },
    reset: () =>
      set({
        variables: {...defaultVariables},
      }),
    setVariable: (variable: keyof ThemeVariables, value: string) =>
      set((state) => ({
        variables: {
          ...state.variables,
          [variable]: value,
        },
      })),
    toggleVariableLock: (variable: keyof ThemeVariables) =>
      set((state) => ({
        lockedVariables: {
          ...state.lockedVariables,
          [variable]: !state.lockedVariables[variable],
        },
      })),
    variables: {
      ...defaultVariables,
    },
  })),
);
