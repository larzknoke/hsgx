"use server";

import prisma from "@/lib/prisma";
import sha256 from "crypto-js/sha256";
import { omit } from "lodash";

// Server Action: verify user credentials without a network hop
// Input: { email: string, password: string }
// Output: user object without password on success, or null on failure
export async function checkCredentials({ email, password }) {
  if (!email || !password) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
      },
    });

    const hashPassword = (pwd) => sha256(pwd).toString();

    if (user && user.password === hashPassword(password)) {
      // Remove password before returning to NextAuth authorize
      return omit(user, "password");
    }

    return null;
  } catch (error) {
    console.log("checkCredentials error:", error);
    return null;
  }
}
