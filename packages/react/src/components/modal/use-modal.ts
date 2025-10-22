import type {OverlayTriggerProps} from "react-stately";

import {useOverlayTriggerState} from "react-stately";

export interface UseModalStateProps extends OverlayTriggerProps {}

export interface UseModalStateReturn extends ReturnType<typeof useOverlayTriggerState> {}

export const useModalState = (props: UseModalStateProps = {}): UseModalStateReturn => {
  return useOverlayTriggerState(props);
};
