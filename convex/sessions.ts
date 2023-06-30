import { mutation, query } from "./_generated/server";

export const create = mutation(({ db }, session) => {
  return db.insert("sessions", session);
});

export const remove = mutation(
  async ({ db }, { sessionId }: { sessionId: any }) => {
    await db.delete(sessionId);
  }
);

export const get = query(
  ({ db }, { sessionToken }: { sessionToken: string }) => {
    return db
      .query("sessions")
      .filter((q) => q.eq(q.field("sessionToken"), sessionToken))
      .first();
  }
);
