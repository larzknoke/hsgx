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
import TrainerListDropdown from "./trainerListDropdown";
import TrainerDeleteDialog from "./trainerDeleteDialog";
function TrainerTable({ dummyData }) {
  const [deleteDialogState, setDeleteDialogState] = useState({
    open: false,
    trainer: null,
  });

  const openDeleteDialog = (trainer) =>
    setDeleteDialogState({ open: true, trainer });
  const closeDeleteDialog = () =>
    setDeleteDialogState({ open: false, trainer: null });

  return (
    <>
      <Table>
        <TableCaption>Alle Abrechnungen - Update 14.10.2025</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Trainer</TableHead>
            <TableHead>Mannschaften</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.id}</TableCell>
              <TableCell className="font-medium">{entry.trainer}</TableCell>
              <TableCell>
                {entry.mannschaften.map((m) => m.name).join(", ")}
              </TableCell>
              <TableCell className="text-right">
                <TrainerListDropdown
                  onDeleteClick={() => openDeleteDialog(entry)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TrainerDeleteDialog
        open={deleteDialogState.open}
        trainer={deleteDialogState.trainer}
        onClose={closeDeleteDialog}
      />
    </>
  );
}

export default TrainerTable;
