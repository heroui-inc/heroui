import {useSyncExternalStore} from "react";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useIsMounted(): boolean {
  // Initialize as true since component is mounted when hook is called
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  return isMounted;
}
