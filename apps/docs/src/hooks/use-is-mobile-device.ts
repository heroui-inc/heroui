import {useState} from "react";

/**
 * Hook to detect if the current device is a mobile device (iOS/Android)
 * @returns boolean indicating if the device is mobile
 */
export function useIsMobileDevice(): boolean {
  // Initialize state synchronously if possible, avoiding setState in effect
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  });

  return isMobile;
}
