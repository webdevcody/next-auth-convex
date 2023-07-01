import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

export function useAuthFromNextAuth() {
  const { data, status } = useSession();

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      // Here you can do whatever transformation to get the ID Token
      // or null
      // Make sure to fetch a new token when `forceRefreshToken` is true
      const response = await fetch("/api/session");
      const json = await response.json();
      return json;
    },
    // If `getToken` isn't correctly memoized
    // remove it from this dependency array
    []
  );

  return useMemo(
    () => ({
      // Whether the auth provider is in a loading state
      isLoading: status === "loading",
      // Whether the auth provider has the user signed in
      isAuthenticated: !!data,
      // The async function to fetch the ID token
      fetchAccessToken,
    }),
    [fetchAccessToken, data, status]
  );
}
