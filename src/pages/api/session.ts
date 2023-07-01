import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "~/server/auth";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).send("you must be logged in to get your session");
  }

  const token = jwt.sign(session, "my-password");

  if (req.method === "GET") {
    return res.json(token);
  } else {
    return res.status(404).send("not found");
  }
}
