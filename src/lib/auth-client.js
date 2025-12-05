import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, useSession } = createAuthClient();
// You can also export the auth client itself if needed
export const authClient = createAuthClient();
