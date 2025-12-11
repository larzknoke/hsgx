import { Suspense } from "react";
import TrainerTable from "./components/trainerTable";
import prisma from "@/lib/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getTrainers() {
  const trainers = await prisma.trainer.findMany({
    include: {
      trainerTeams: {
        include: {
          team: true,
        },
      },
    },
  });
  console.log("Fetched trainers:", trainers);
  return trainers;
}

async function Trainer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/signin");

  const trainers = await getTrainers();
  return (
    <div className="flex flex-col gap-6">
      <h1>Trainer</h1>
      <Suspense fallback={<Skeleton />}>
        <TrainerTable trainers={trainers} session={session} />
      </Suspense>
    </div>
  );
}

export default Trainer;
