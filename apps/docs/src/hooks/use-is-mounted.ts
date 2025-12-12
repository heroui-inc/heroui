import {useEffect, useState} from "react";

export function useIsMounted(): boolean {
  // Initialize as true since component is mounted when hook is called
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Component is already mounted, but ensure cleanup sets it to false
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
}
