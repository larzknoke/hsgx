import BillForm from "./components/bill-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/auth-helper";

async function getTrainers() {
  const trainers = await prisma.trainer.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return trainers;
}

async function getTeams() {
  const teams = await prisma.team.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return teams;
}

async function NewBill() {
  const session = await requireSession();
  const trainers = await getTrainers();
  const teams = await getTeams();
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { trainerId: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1>Neue Abrechnungen</h1>
      <BillForm trainers={trainers} teams={teams} currentUser={currentUser} />
    </div>
  );
}

export default NewBill;
