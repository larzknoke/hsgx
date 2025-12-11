import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { admin } from "better-auth/plugins";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  appUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  plugins: [
    admin({
      // optional: defaultRole oder adminRole angeben, wenn du willst
      roles: ["admin", "kassenwart", "trainer"],
      defaultRole: "trainer", // optional
      adminRole: "admin", // optional
    }),
  ],
});
