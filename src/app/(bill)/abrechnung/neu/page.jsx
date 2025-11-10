import BillForm from "./components/bill-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getTrainers() {
  const trainers = await prisma.trainer.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return trainers;
}

async function NewBill() {
  const trainers = await getTrainers();

  return (
    <div className="flex flex-col gap-6">
      <h1>Neue Abrechnungen</h1>
      <BillForm trainers={trainers} />
    </div>
  );
}

export default NewBill;
