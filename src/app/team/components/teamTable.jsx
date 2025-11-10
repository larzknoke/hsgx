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
import TeamListDropdown from "./teamListDropdown";
import TeamDeleteDialog from "./teamDeleteDialog";
import TeamNewDialog from "./teamNewDialog";

function TeamTable({ teams, trainers }) {
  const router = useRouter();
  const [deleteDialogState, setDeleteDialogState] = useState({
    open: false,
    team: null,
  });
  const [newDialogOpen, setNewDialogOpen] = useState(false);

  const openDeleteDialog = (team) => setDeleteDialogState({ open: true, team });
  const closeDeleteDialog = () =>
    setDeleteDialogState({ open: false, team: null });

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
          <PlusIcon /> Neues Team
        </Button>
      </div>
      <Table>
        <TableCaption>Alle Teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Trainer</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium">{team.id}</TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>
                {team.trainerTeams.map((tt) => tt.trainer.name).join(", ")}
              </TableCell>
              <TableCell className="text-right">
                <TeamListDropdown
                  onDeleteClick={() => openDeleteDialog(team)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TeamDeleteDialog
        open={deleteDialogState.open}
        team={deleteDialogState.team}
        onClose={() => {
          setDeleteDialogState({ open: false, team: null });
          router.refresh();
        }}
      />
      <TeamNewDialog
        open={newDialogOpen}
        trainers={trainers}
        onClose={() => {
          setNewDialogOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}

export default TeamTable;
