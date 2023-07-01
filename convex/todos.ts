import { mutation, query } from "./_generated/server";

export const create = mutation(
  async ({ db, auth }, { text }: { text: string }) => {
    const user = await auth.getUserIdentity();

    if (!user) {
      throw new Error("you must be logged in to create a todo");
    }

    return db.insert("todos", { text, userId: user.subject });
  }
);

export const get = query(async ({ db, auth }) => {
  const user = await auth.getUserIdentity();

  if (!user) {
    return [];
  }

  return db
    .query("todos")
    .filter((q) => q.eq(q.field("userId"), user.subject))
    .collect();
});
