import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./sevice-data";
import { loginChecker } from "./helper";
import { signInSchema } from "./zod";
import { ZodError } from "zod";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SERCET,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, request) => {
        try {
          let user = null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          user = await loginChecker(email, password);

          // return json object with the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    // to save the user on databa
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email as string);
        if (!existingUser)
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        console.log("Created user");

        return true;
      } catch {
        return false;
      }
    },
    //to use id everywhere instead of detching em everywehre
    async session({ session, user }) {
      const userD = await getUser(session.user.email);

      session.user.id = userD._id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
