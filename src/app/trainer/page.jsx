import { Suspense } from "react";
import TrainerTable from "./components/trainerTable";
import prisma from "@/lib/prisma";
import { Skeleton } from "@/components/ui/skeleton";

const dummyData = [
  {
    id: 1,
    trainer: "Kerstin Gronstedt",
    mannschaften: [{ name: "Weibl. C" }, { name: "Weibl. D" }],
  },
  {
    id: 2,
    trainer: "Johannes Wellmann",
    mannschaften: [{ name: "Männl. D" }],
  },
  {
    id: 3,
    trainer: "Lars Knoke",
    mannschaften: [{ name: "Herren 1" }, { name: "Herren 2" }],
  },
];

async function getTrainers() {
  const trainers = await prisma.trainer.findMany();
  console.log("Fetched trainers:", trainers);
  return trainers;
}

async function Trainer() {
  const trainers = await getTrainers();
  return (
    <div className="flex flex-col gap-6">
      <h1>Trainer</h1>
      <Suspense fallback={<Skeleton />}>
        <TrainerTable dummyData={dummyData} trainers={trainers} />
      </Suspense>
    </div>
  );
}

export default Trainer;
