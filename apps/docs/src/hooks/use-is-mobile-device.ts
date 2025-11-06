import {useEffect, useState} from "react";

/**
 * Hook to detect if the current device is a mobile device (iOS/Android)
 * @returns boolean indicating if the device is mobile
 */
export function useIsMobileDevice(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return isMobile;
}
