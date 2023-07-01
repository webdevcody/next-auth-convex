import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import {
  ConvexProvider,
  ConvexProviderWithAuth,
  ConvexReactClient,
} from "convex/react";
import { useAuthFromNextAuth } from "~/ConvexProviderWithNextAuth";
import { env } from "~/env.mjs";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>
        <Component {...pageProps} />
      </ConvexProviderWithAuth>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
