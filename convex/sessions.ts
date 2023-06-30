import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";

export const create = mutation(({ db }, session: Doc<"sessions">) => {
  return db.insert("sessions", session);
});

export const remove = mutation(
  async ({ db }, { sessionId }: { sessionId: Id<"sessions"> }) => {
    await db.delete(sessionId);
  }
);

export const get = query(
  ({ db }, { sessionToken }: { sessionToken: string }) => {
    return db
      .query("sessions")
      .withIndex("session_token", (q) => q.eq("sessionToken", sessionToken))
      .first();
  }
);
