"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const callbackUrl = searchParams.get("callbackUrl") || "/home";
  const error = searchParams.get("error");

  // Show error if redirected with error param
  if (error) {
    setTimeout(() => {
      toast.error("Email oder Passwort ist falsch");
    }, 100);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Client-side validation
    const newErrors = {};
    if (!email) newErrors.email = "E-Mail ist erforderlich";
    if (!password) newErrors.password = "Passwort ist erforderlich";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ submit: result.error });
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success("Anmeldung erfolgreich!");
        router.push(callbackUrl);
      }
    } catch (error) {
      toast.error("Ein Fehler ist aufgetreten");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Anmelden</h1>
          <p className="text-gray-600">Melden Sie sich mit Ihrem Konto an</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="max@example.com"
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Ihr Passwort"
              disabled={isLoading}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded">
              {errors.submit}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            variant="success"
          >
            {isLoading ? "Wird angemeldet..." : "Anmelden"}
          </Button>
        </form>

        {/* Register Link */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Noch kein Konto?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
