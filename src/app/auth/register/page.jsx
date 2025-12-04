import RegisterForm from "@/components/auth/register-form";

export const metadata = {
  title: "Registrieren | HSGX",
  description: "Erstellen Sie ein neues Konto",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm />
    </div>
  );
}
