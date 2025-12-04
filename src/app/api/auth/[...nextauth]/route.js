import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkCredentials } from "@/app/api/auth/actions/check-credentials";

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "max.mustermann@server.de",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        console.log("credentials: ", credentials);
        const user = await checkCredentials({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (user) {
          console.log("user: ", user);
          return user;
        } else {
          console.log("no user");
          throw new Error("Email oder Passwort ist falsch");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    register: "/auth/register",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
