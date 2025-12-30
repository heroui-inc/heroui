import {i, init} from "@instantdb/react";
import {useEffect, useRef} from "react";

import {authClient} from "./auth-client";
import {useInstantAuth} from "./use-instant-auth";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
    }),
    apiKeys: i.entity({
      userId: i.string().indexed(),
    }),
    sessions: i.entity({
      createdAt: i.number(),
      expiresAt: i.number(),
      sessionToken: i.string().unique().indexed(),
      userId: i.string().indexed(),
    }),
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

const appId =
  typeof process !== "undefined" ? (process.env["NEXT_PUBLIC_INSTANT_APP_ID"] ?? "") : "";

export const db = appId
  ? init<AppSchema>({
      appId,
      devtool:
        typeof process !== "undefined"
          ? process.env["NEXT_PUBLIC_APP_ENV"] === "development"
          : false,
      schema,
    })
  : null;

export const useInstantDBAuth = () => {
  const isAuthEnabled =
    appId && typeof process !== "undefined" && process.env["NEXT_PUBLIC_PLATFORM_API_URL"];

  const {data: session, isPending} = authClient.useSession();
  const user = session?.user;

  useInstantAuth({
    authClient,
    db: isAuthEnabled && db ? db : null,
    persistent: true,
  });

  useSessionMonitor(isAuthEnabled ? user?.id || null : null);

  return {
    data: session,
    error: null,
    isLoading: isPending,
    user: isAuthEnabled ? user : null,
  };
};

function useSessionMonitor(userId: string | null | undefined) {
  const {data: session, isPending} = authClient.useSession();

  const {data: sessionsData} = db
    ? db.useQuery(
        userId
          ? {
              sessions: {
                $: {
                  where: {
                    userId,
                  },
                },
              },
            }
          : null,
      )
    : {data: undefined};

  const hasSeenSessionsRef = useRef(false);

  useEffect(() => {
    if (!userId || isPending) {
      return;
    }

    const sessions = sessionsData?.sessions || [];

    if (sessions.length > 0) {
      hasSeenSessionsRef.current = true;
    }

    const hasSessionsData = sessionsData !== undefined;

    if (sessions.length === 0 && hasSessionsData && hasSeenSessionsRef.current) {
      if (!session || !session.session) {
        authClient.signOut();
      }
    }
  }, [sessionsData?.sessions, userId, isPending, session]);
}
