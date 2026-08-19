export {render, type HeroUIRenderOptions} from "./render";
export {setupUser, type SetupUserOptions} from "./user";
export {advanceTimersByTime, runAllTimers} from "./timers";
export {isDocumentScrollLocked} from "./scroll-lock";
export {ssrSmoke, type SsrSmokeOptions} from "./ssr";

export {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
  within,
  type RenderResult,
} from "@testing-library/react";

export {
  installMouseEvent,
  installPointerEvent,
  pointerMap,
  triggerLongPress,
  User,
} from "@react-aria/test-utils";
