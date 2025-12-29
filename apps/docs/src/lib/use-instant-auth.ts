/**
 * Adapted from better-auth-instantdb (MIT License)
 * Original source: https://github.com/daveycodez/better-auth-instantdb
 * Copyright (c) 2024 daveyplate
 */

import type {InstantReactWebDatabase} from "@instantdb/react";
import type {Session} from "better-auth";
import type {createAuthClient} from "better-auth/react";

import {useEffect, useSyncExternalStore} from "react";

type AuthClient = ReturnType<typeof createAuthClient>;
type SessionResult = ReturnType<AuthClient["useSession"]>;
type MinimalAuthClient<TSessionResult extends SessionResult> = {
  useSession: () => TSessionResult;
};

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

async function instantAuth(db: InstantReactWebDatabase<any, any>, session?: Session) {
  const user = await db.getAuth();

  if (session && user?.id !== session?.userId) {
    db.auth.signInWithToken(session.token);
  }

  if (!session && user) {
    db.auth.signOut();
  }
}

let lastPersisted: any | undefined | null;
let restoredData: any | undefined | null;

function usePersistentSession<
  TSessionResult extends SessionResult,
  TAuthClient extends MinimalAuthClient<TSessionResult>,
>(authClient: TAuthClient) {
  const {data, error, isPending, isRefetching, ...rest} = authClient.useSession();
  const hydrated = useHydrated();

  useEffect(() => {
    if (isPending) return;

    const persistSession = () => {
      if (!data || lastPersisted?.session.id === data?.session.id) return;

      lastPersisted = data;
      localStorage.setItem("ba-instant-session", JSON.stringify(data));
    };

    const unpersistSession = () => {
      if (data || error || (lastPersisted === null && restoredData === null)) return;

      localStorage.removeItem("ba-instant-session");
      lastPersisted = null;
      restoredData = null;
    };

    persistSession();
    unpersistSession();
  }, [data, isPending, error]);

  if (hydrated && !data) {
    if (restoredData === undefined) {
      const persisted = localStorage.getItem("ba-instant-session");

      if (persisted) {
        const data = JSON.parse(persisted) as TSessionResult;

        restoredData = data;
      } else {
        restoredData = null;
      }
    }

    if (restoredData) {
      return {
        data: restoredData,
        error: null,
        isPending: false,
        isRefetching: false,
        ...rest,
      } as TSessionResult;
    }
  }

  return {data, error, isPending, isRefetching, ...rest};
}

export function useInstantAuth<TSessionResult extends SessionResult>({
  authClient,
  db,
  persistent,
}: {
  authClient: MinimalAuthClient<TSessionResult>;
  db: InstantReactWebDatabase<any, any>;
  persistent?: boolean;
}) {
  const regularSession = authClient.useSession();
  const persistentSession = usePersistentSession(authClient);

  const sessionResult = persistent ? persistentSession : regularSession;
  const {data, isPending} = sessionResult;

  useEffect(() => {
    if (isPending) return;

    instantAuth(db, data?.session);
  }, [db, isPending, data?.session]);
}
