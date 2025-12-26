import type {ContextType} from "./use-card";

import {createContext} from "@heroui/react-utils";

export const [CardProvider, useCardContext] = createContext<ContextType>({
  name: "CardContext",
  strict: true,
  errorMessage:
    "useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />",
});
