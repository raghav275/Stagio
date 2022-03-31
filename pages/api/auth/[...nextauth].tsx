import { login } from "@actions/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, {
  Session,
  SessionStrategy,
  User
} from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(
          credentials: Record<"email" | "password", string> | undefined
        ): Promise<Omit<User, "id"> | { id?: string | undefined } | null> {
          // Add logic here to look up the user from the credentials supplied
          const response = await login(
            credentials?.email!,
            credentials?.password!
          );
          res.setHeader("Set-Cookie",response.headers['set-cookie']);
          if (response) {
            var user = { ...response.data.user };
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    refetchInterval: 1 * 24 * 60 * 60,
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    session: {
      strategy: "jwt" as SessionStrategy,
      maxAge: 3 * 24 * 60 * 60,
    },
    jwt: {
      maxAge: 3 * 24 * 60 * 60,
    },
    callbacks: {
      jwt: async ({ token, user }: { token: JWT; user?: User }) => {
        user &&
          (token.user = {
            username: user.username,
            email: user.email,
            image: user.image,
          });
        return token;
      },
      session: async ({ session, token }: { session: Session; token: JWT }) => {
        session.user = token.user;
        session.token = token.token;

        return session;
      },
    },
  };
};
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
