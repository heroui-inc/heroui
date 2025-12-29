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

export const db = init<AppSchema>({
  appId,
  devtool:
    typeof process !== "undefined" ? process.env["NEXT_PUBLIC_APP_ENV"] === "development" : false,
  schema,
});

export const useInstantDBAuth = () => {
  const {data: session, isPending} = authClient.useSession();
  const user = session?.user;

  useInstantAuth({
    authClient,
    db,
    persistent: true,
  });

  useSessionMonitor(user?.id || null);

  return {
    data: session,
    error: null,
    isLoading: isPending,
    user,
  };
};

function useSessionMonitor(userId: string | null | undefined) {
  const {data: session, isPending} = authClient.useSession();

  const {data: sessionsData} = db.useQuery(
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
  );

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
        authClient.signOut().catch(() => {
          // Silent fail - error handling done by auth client
        });
      }
    }
  }, [sessionsData?.sessions, userId, isPending, session]);
}
