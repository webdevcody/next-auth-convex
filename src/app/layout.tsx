"use client";

import "src/styles/globals.css";
import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useAuthFromNextAuth } from "./ConvexProviderWithNextAuth";
import { env } from "~/env.mjs";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

// do not cache this layout
export const revalidate = 0;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className="bg-gray-100">
      <body>
        <SessionProvider>
          <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>
            {children}
          </ConvexProviderWithAuth>
        </SessionProvider>
      </body>
    </html>
  );
}
