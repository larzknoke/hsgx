"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { CheckCircle2, OctagonAlertIcon, PlusIcon } from "lucide-react";
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
      <div className="w-full flex flex-row gap-6 justify-between">
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Suche..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Suche</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button variant="success" asChild>
          <Link href="/abrechnung/neu">
            <PlusIcon /> Neuer Trainer
          </Link>
        </Button>
      </div>
      <TrainerTable dummyData={dummyData} />
    </div>
  );
}

export default Trainer;
