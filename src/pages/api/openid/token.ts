import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { env } from "~/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
    if (token) {
      return res.json(token.id_token);
    } else {
      return res.json(null);
    }
  } else {
    return res.status(404).send("not found");
  }
}
