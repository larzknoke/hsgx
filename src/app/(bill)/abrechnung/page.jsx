import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BillTable from "./components/billTable";
import prisma from "@/lib/prisma";
import { hasRole } from "@/lib/roles";
import { redirect } from "next/navigation";

async function getBills(session) {
  const isAdminOrKassenwart =
    hasRole(session, "admin") || hasRole(session, "kassenwart");

  const bills = await prisma.bill.findMany({
    where: isAdminOrKassenwart ? {} : { userId: session.user.id },
    include: {
      trainer: true,
      team: true,
      user: true,
    },
    orderBy: [{ year: "desc" }, { quarter: "desc" }],
  });

  console.log("Fetched bills:", bills);
  return bills;
}

async function Abrechnung() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // Check if user logged in
  if (!session) redirect("/signin");

  const bills = await getBills(session);

  return (
    <div className="flex flex-col gap-6">
      <h1>Abrechnungen</h1>
      <Suspense fallback={<Skeleton />}>
        <BillTable bills={bills} session={session} />
      </Suspense>
    </div>
  );
}

export default Abrechnung;
