import {ToastOptions, ToastQueue, useToastQueue} from "@react-stately/toast";
import {useProviderContext} from "@heroui/system";
import {AnimatePresence, LazyMotion} from "framer-motion";

import {RegionProps, ToastRegion} from "./toast-region";
import {ToastProps, ToastPlacement} from "./use-toast";

const loadFeatures = () => import("framer-motion").then((res) => res.domMax);

let globalToastQueue: ToastQueue<ToastProps> | null = null;

interface ToastProviderProps {
  maxVisibleToasts?: number;
  placement?: ToastPlacement;
  disableAnimation?: boolean;
  toastProps?: ToastProps;
  toastOffset?: number;
  regionProps?: RegionProps;
}

export const getToastQueue = () => {
  if (!globalToastQueue) {
    globalToastQueue = new ToastQueue({
      maxVisibleToasts: Infinity,
    });
  }

  return globalToastQueue;
};

export const ToastProvider = ({
  placement = "bottom-right",
  disableAnimation: disableAnimationProp = false,
  maxVisibleToasts = 3,
  toastOffset = 0,
  toastProps = {},
  regionProps,
}: ToastProviderProps) => {
  const toastQueue = useToastQueue(getToastQueue());
  const globalContext = useProviderContext();
  const disableAnimation = disableAnimationProp ?? globalContext?.disableAnimation ?? false;

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        {toastQueue.visibleToasts.length > 0 ? (
          <ToastRegion
            disableAnimation={disableAnimation}
            maxVisibleToasts={maxVisibleToasts}
            placement={placement}
            toastOffset={toastOffset}
            toastProps={toastProps}
            toastQueue={toastQueue}
            {...regionProps}
          />
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
};

export const addToast = ({...props}: ToastProps & ToastOptions) => {
  if (!globalToastQueue) {
    return;
  }
  globalToastQueue.add(props);
};

export const closeAll = () => {
  if (!globalToastQueue) {
    return;
  }

  const keys = globalToastQueue.visibleToasts.map((toast) => toast.key);

  keys.map((key) => {
    globalToastQueue?.close(key);
  });
};
