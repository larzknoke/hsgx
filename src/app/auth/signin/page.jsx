import SignInForm from "@/components/auth/signin-form";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Anmelden | HSGX",
  description: "Melden Sie sich mit Ihrem Konto an",
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  // Redirect if already logged in
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignInForm />
    </div>
  );
}
