import {pointerMap} from "@react-aria/test-utils";
import userEvent from "@testing-library/user-event";

export type SetupUserOptions = Parameters<typeof userEvent.setup>[0];

/** RAC-standard userEvent (`delay: null` + `pointerMap`). */
export const setupUser = (options?: SetupUserOptions) =>
  userEvent.setup({
    delay: null,
    pointerMap,
    ...options,
  });
