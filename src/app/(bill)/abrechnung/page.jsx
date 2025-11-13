import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BillTable from "./components/billTable";
import prisma from "@/lib/prisma";

async function getBills() {
  const bills = await prisma.bill.findMany({
    include: {
      trainer: true,
      team: true,
    },
    orderBy: [{ year: "desc" }, { quarter: "desc" }],
  });

  console.log("Fetched bills:", bills);
  return bills;
}

async function Abrechnung() {
  const bills = await getBills();

  return (
    <div className="flex flex-col gap-6">
      <h1>Abrechnungen</h1>
      <Suspense fallback={<Skeleton />}>
        <BillTable bills={bills} />
      </Suspense>
    </div>
  );
}

export default Abrechnung;
