import type { NextApiRequest, NextApiResponse } from "next";
import { type TokenSet } from "next-auth";
import { getToken } from "next-auth/jwt";
import { env } from "~/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = (await getToken({ req, secret: env.NEXTAUTH_SECRET })) as {
      refresh_token: string;
    };

    if (token) {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refresh_token,
        }),
        method: "POST",
      });

      const tokens = (await response.json()) as TokenSet;

      if (!response.ok) {
        return res.status(500).send("error refreshing id token");
      }

      return res.json(tokens.id_token);
    } else {
      return res.json(null);
    }
  } else {
    return res.status(404).send("not found");
  }
}
