import { Suspense } from "react";
import UserTable from "./components/userTable";
import prisma from "@/lib/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hasRole } from "@/lib/roles";

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      sessions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      accounts: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
}

async function UserManagement() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  // Only allow admin users
  if (!hasRole(session, "admin")) {
    redirect("/home");
  }

  const users = await getUsers();

  return (
    <div className="flex flex-col gap-6">
      <h1>Benutzerverwaltung</h1>
      <Suspense fallback={<Skeleton />}>
        <UserTable users={users} session={session} />
      </Suspense>
    </div>
  );
}

export default UserManagement;
