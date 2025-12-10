import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

// export const { signIn, signUp, useSession } = createAuthClient();

export const authClient = createAuthClient({
  plugins: [adminClient()],
});
