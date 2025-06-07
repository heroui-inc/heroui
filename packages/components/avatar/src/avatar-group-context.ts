import type {ContextType} from "./use-avatar-group";

import {createContext} from "@heroui/react-utils";

export const [AvatarGroupProvider, useAvatarGroupContext] = createContext<ContextType>({
  name: "AvatarGroupContext",
  strict: false,
});
