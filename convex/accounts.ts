import { mutation, query } from "./_generated/server";

export const create = mutation(({ db }, account) => {
  return db.insert("accounts", account);
});

export const get = query(({ db }, { accountId }: { accountId: any }) => {
  return db.get(accountId);
});
