import NextAuth from "next-auth";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.id_token) {
        token.id_token = account.id_token;
      }
      if (account?.refresh_token) {
        token.refresh_token = account.refresh_token;
      }
      return token;
    },
    session: ({ session }) => {
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export default NextAuth(authOptions);
