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
      roles: ["admin", "kassenwart", "trainer"],
      defaultRole: "trainer",
      adminRole: "admin",
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Send notification email to admin when a new user signs up
          try {
            const { sendAdminNewUserNotification } =
              await import("./send-new-user-email.js");
            await sendAdminNewUserNotification(user);
          } catch (error) {
            console.error(
              "Error sending admin notification for new signup:",
              error
            );
            // Don't throw - we don't want to fail the signup if email fails
          }
        },
      },
    },
  },
});
