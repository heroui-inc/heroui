import type {UseDropdownReturn} from "./use-dropdown";

import {createContext} from "@heroui/react-utils";

export const [DropdownProvider, useDropdownContext] = createContext<UseDropdownReturn>({
  name: "DropdownContext",
  errorMessage:
    "useDropdownContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Dropdown />`",
});
