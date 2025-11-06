"use client";

import Link from "next/link";
import TrainerTable from "./components/trainerTable";

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

function Trainer() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Trainer</h1>
      <TrainerTable dummyData={dummyData} />
    </div>
  );
}

export default Trainer;
