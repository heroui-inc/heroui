import type {UseModalReturn} from "./use-modal";

import {createContext} from "@heroui/react-utils";

export const [ModalProvider, useModalContext] = createContext<UseModalReturn>({
  name: "ModalContext",
  errorMessage:
    "useModalContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Modal />`",
});
