import type {ContextType} from "./use-checkbox-group";

import {createContext} from "@heroui/react-utils";

export const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<ContextType>({
  name: "CheckboxGroupContext",
  strict: false,
});
