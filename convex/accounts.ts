import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";

export const create = mutation(({ db }, account: Doc<"accounts">) => {
  return db.insert("accounts", account);
});

export const get = query(
  ({ db }, { accountId }: { accountId: Id<"accounts"> }) => {
    return db.get(accountId);
  }
);
