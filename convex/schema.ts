import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    access_token: v.string(),
    expires_at: v.number(),
    id_token: v.string(),
    provider: v.string(),
    providerAccountId: v.string(),
    scope: v.string(),
    token_type: v.string(),
    type: v.string(),
    userId: v.id("users"),
  }).index("account_id", ["providerAccountId"]),
  sessions: defineTable({
    expires: v.string(),
    sessionToken: v.string(),
    userId: v.id("users"),
  }).index("session_token", ["sessionToken"]),
  users: defineTable({
    email: v.string(),
    emailVerified: v.null(),
    id: v.id("users"),
    image: v.string(),
    name: v.string(),
  }).index("email", ["email"]),
});
