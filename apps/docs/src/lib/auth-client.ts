import {createAuthClient} from "better-auth/react";
import {useState} from "react";

const baseURL =
  typeof process !== "undefined" ? process.env["NEXT_PUBLIC_PLATFORM_API_URL"] : undefined;
const isAuthEnabled = !!baseURL;

const createNoOpAuthClient = () => {
  const useSession = () => {
    const [isPending] = useState(false);

    return {
      data: null,
      error: null,
      isPending,
      isRefetching: false,
      refetch: async () => {},
    };
  };

  return {
    $ERROR_CODES: {} as any,
    $Infer: {} as any,
    $fetch: {} as any,
    $store: {} as any,
    signIn: {} as any,
    signOut: async () => {},
    useSession,
  };
};

export const authClient = isAuthEnabled
  ? createAuthClient({
      basePath: "/api/auth",
      baseURL,
    })
  : createNoOpAuthClient();
