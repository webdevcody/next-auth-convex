import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";

export const getUserByAccountId = query(
  async (
    { db },
    {
      providerAccountId,
      provider,
    }: { providerAccountId: string; provider: string }
  ) => {
    const account = await db
      .query("accounts")
      .withIndex("account_id", (q) =>
        q.eq("providerAccountId", providerAccountId)
      )
      .first();
    if (!account) return null;
    const user = await db.get(account.userId);
    return user;
  }
);

export const getUserByEmail = query(({ db }, { email }: { email: string }) => {
  return db
    .query("users")
    .withIndex("email", (q) => q.eq("email", email))
    .first();
});

export const getUserById = query(({ db }, { id }: { id: Id<"users"> }) => {
  return db.get(id);
});

export const create = mutation(({ db }, user: Doc<"users">) => {
  return db.insert("users", user);
});

export const update = mutation(
  ({ db }, { _id, ...updates }: { _id: Id<"users"> }) => {
    return db.patch(_id, updates);
  }
);
