import type {ToastOptions} from "@react-stately/toast";
import type {RegionProps} from "./toast-region";
import type {ToastProps, ToastPlacement} from "./use-toast";

import {ToastQueue, useToastQueue} from "@react-stately/toast";
import {useProviderContext} from "@heroui/system";
import {LazyMotion} from "framer-motion";

import {ToastRegion} from "./toast-region";

const loadFeatures = () => import("framer-motion").then((res) => res.domMax);

const defaultToasterId = "heroui";
let globalToastQueues: {[key: string]: ToastQueue<ToastProps> | null} = {};

interface ToastProviderProps {
  maxVisibleToasts?: number;
  placement?: ToastPlacement;
  disableAnimation?: boolean;
  toastProps?: ToastProps;
  toastOffset?: number;
  regionProps?: RegionProps;
  toasterId?: string;
}

export const getToastQueue = ({toasterId}: {toasterId: string}) => {
  if (!globalToastQueues[toasterId]) {
    globalToastQueues[toasterId] = new ToastQueue({
      maxVisibleToasts: Infinity,
    });
  }

  return globalToastQueues[toasterId];
};

export const ToastProvider = ({
  placement = "bottom-right",
  disableAnimation: disableAnimationProp = false,
  maxVisibleToasts = 3,
  toastOffset = 0,
  toastProps = {},
  toasterId = defaultToasterId,
  regionProps,
}: ToastProviderProps) => {
  const toastQueue = useToastQueue(getToastQueue({toasterId}));
  const globalContext = useProviderContext();
  const disableAnimation = disableAnimationProp ?? globalContext?.disableAnimation ?? false;

  return (
    <LazyMotion features={loadFeatures}>
      {toastQueue.visibleToasts.length > 0 && (
        <ToastRegion
          disableAnimation={disableAnimation}
          maxVisibleToasts={maxVisibleToasts}
          placement={placement}
          toastOffset={toastOffset}
          toastProps={toastProps}
          toastQueue={toastQueue}
          {...regionProps}
        />
      )}
    </LazyMotion>
  );
};

export const addToast = ({toasterId = defaultToasterId, ...props}: ToastProps & ToastOptions) => {
  if (!globalToastQueues[toasterId]) {
    return null;
  }

  return globalToastQueues[toasterId].add(props);
};

export const closeToast = ({
  key,
  toasterId = defaultToasterId,
}: {
  key: string;
  toasterId?: string;
}) => {
  if (!globalToastQueues[toasterId]) {
    return;
  }
  globalToastQueues[toasterId].close(key);
};

export const closeAll = (toasterId = defaultToasterId) => {
  if (!globalToastQueues[toasterId]) {
    return;
  }

  const keys = globalToastQueues[toasterId].visibleToasts.map((toast) => toast.key);

  keys.map((key) => {
    globalToastQueues[toasterId]?.close(key);
  });
};
