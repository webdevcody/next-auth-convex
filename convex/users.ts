import { mutation, query } from "./_generated/server";

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
      .filter((q) => q.eq(q.field("providerAccountId"), providerAccountId))
      .first();
    if (!account) return null;
    const user = await db.get(account.userId);
    return user;
  }
);

export const getUserByEmail = query(({ db }, { email }: { email: string }) => {
  console.log(email);
  return db
    .query("users")
    .filter((q) => q.eq(q.field("email"), email))
    .first();
});

export const getUserById = query(({ db }, { id }: { id: any }) => {
  return db.get(id);
});

export const create = mutation(({ db }, user) => {
  return db.insert("users", user);
});

export const update = mutation(({ db }, { _id, ...updates }: { _id: any }) => {
  console.log(_id);
  console.log(updates);
  return db.patch(_id, updates);
});
