"use client";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import TrainerListDropdown from "./trainerListDropdown";
import TrainerDeleteDialog from "./trainerDeleteDialog";
import TrainerNewDialog from "./trainerNewDialog";

function TrainerTable({ dummyData, trainers }) {
  const router = useRouter();
  const [deleteDialogState, setDeleteDialogState] = useState({
    open: false,
    trainer: null,
  });
  const [newDialogOpen, setNewDialogOpen] = useState(false);

  const openDeleteDialog = (trainer) =>
    setDeleteDialogState({ open: true, trainer });
  const closeDeleteDialog = () =>
    setDeleteDialogState({ open: false, trainer: null });

  return (
    <>
      <div className="w-full flex flex-row gap-6 justify-between">
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Suche..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Suche</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button variant="success" onClick={() => setNewDialogOpen(true)}>
          <PlusIcon /> Neuer Trainer
        </Button>
      </div>
      <Table>
        <TableCaption>Alle Abrechnungen - Update 14.10.2025</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Trainer</TableHead>
            {/* <TableHead>Mannschaften</TableHead> */}
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow key={trainer.id}>
              <TableCell className="font-medium">{trainer.id}</TableCell>
              <TableCell className="font-medium">{trainer.name}</TableCell>
              {/* <TableCell>
                {trainer.mannschaften.map((m) => m.name).join(", ")}
              </TableCell> */}
              <TableCell className="text-right">
                <TrainerListDropdown
                  onDeleteClick={() => openDeleteDialog(trainer)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TrainerDeleteDialog
        open={deleteDialogState.open}
        trainer={deleteDialogState.trainer}
        onClose={() => {
          setDeleteDialogState({ open: false, trainer: null });
          // ✅ refresh nach erfolgreichem Delete
          router.refresh();
        }}
      />
      <TrainerNewDialog
        open={newDialogOpen}
        onClose={() => {
          setNewDialogOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}

export default TrainerTable;
