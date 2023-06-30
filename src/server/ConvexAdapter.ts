import { type ConvexHttpClient } from "convex/browser";
import { type Adapter } from "next-auth/adapters";

export function ConvexAdapter(client: ConvexHttpClient): Adapter {
  return {
    createUser: async (data) => {
      const id = await client.mutation("users:create", data);
      client.mutation("users:update", { _id: id, id });
      return client.query("users:getUserById", { id });
    },
    getUser: async (id) => {
      return client.query("users:getUserById", { id });
    },
    getUserByEmail: (email) => client.query("users:getUserByEmail", { email }),
    async getUserByAccount(provider_providerAccountId) {
      return client.query(
        "users:getUserByAccountId",
        provider_providerAccountId
      );
    },
    updateUser: ({ id, ...data }) => {
      return client.mutation("users:update", { _id: id, ...data });
    },
    deleteUser: (id) => client.mutation("users:delete", id),
    linkAccount: async (data) => {
      const accountId = await client.mutation("accounts:create", data);
      return client.mutation("accounts:get", { accountId });
    },
    unlinkAccount: (provider_providerAccountId) =>
      client.mutation("accounts:delete", provider_providerAccountId),
    async getSessionAndUser(sessionToken) {
      const session = await client.query("sessions:get", { sessionToken });
      if (!session) return null;
      const user = await client.query("users:getUserById", {
        id: session.userId,
      });
      if (!user) return null;
      return {
        user,
        session: {
          ...session,
          expires: new Date(session.expires),
        },
      };
    },
    createSession: async (data) => {
      await client.mutation("sessions:create", {
        ...data,
        expires: data.expires.toISOString(),
      });
      return data;
    },
    updateSession: (data) => client.mutation("sessions:update", data),
    deleteSession: async (sessionToken) => {
      const session = await client.query("sessions:get", { sessionToken });
      await client.mutation("sessions:remove", { sessionId: session._id });
    },
    async createVerificationToken(data) {
      // TODO: needed for JWT auth I think
      return null;
    },
    async useVerificationToken(identifier_token) {
      // TODO: needed for JWT auth I think
      return null;
    },
  };
}
