import type {UseNavbarReturn} from "./use-navbar";

import {createContext} from "@heroui/react-utils";

export const [NavbarProvider, useNavbarContext] = createContext<UseNavbarReturn>({
  name: "NavbarContext",
  strict: true,
  errorMessage:
    "useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />",
});
