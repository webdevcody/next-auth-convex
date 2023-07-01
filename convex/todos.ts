import { internalMutation } from "./_generated/server";

export const create = internalMutation(
  async ({ db }, { text }: { text: string }) => {
    return db.insert("todos", { text });
  }
);
