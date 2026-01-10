"use client";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
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
import PlayerListDropdown from "./playerListDropdown";
import PlayerDeleteDialog from "./playerDeleteDialog";
import PlayerNewDialog from "./playerNewDialog";
import PlayerEditDialog from "./playerEditDialog";

function PlayerTable({ players, teams }) {
  const router = useRouter();
  const [deleteDialogState, setDeleteDialogState] = useState({
    open: false,
    player: null,
  });
  const [editDialogState, setEditDialogState] = useState({
    open: false,
    player: null,
  });
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openDeleteDialog = (player) =>
    setDeleteDialogState({ open: true, player });
  const closeDeleteDialog = () =>
    setDeleteDialogState({ open: false, player: null });

  const openEditDialog = (player) => setEditDialogState({ open: true, player });
  const closeEditDialog = () =>
    setEditDialogState({ open: false, player: null });

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group players by team
  const playersByTeam = filteredPlayers.reduce((acc, player) => {
    // Handle players with no teams
    if (!player.playerTeams || player.playerTeams.length === 0) {
      if (!acc["Kein Team"]) acc["Kein Team"] = [];
      acc["Kein Team"].push(player);
    } else {
      // Add player to each of their teams
      player.playerTeams.forEach((pt) => {
        const teamName = pt.team.name;
        if (!acc[teamName]) acc[teamName] = [];
        acc[teamName].push(player);
      });
    }
    return acc;
  }, {});

  // Sort teams alphabetically and sort players within each team by year and name
  const sortedTeams = Object.keys(playersByTeam).sort();
  sortedTeams.forEach((teamName) => {
    playersByTeam[teamName].sort((a, b) => {
      const yearA = new Date(a.birthday).getFullYear();
      const yearB = new Date(b.birthday).getFullYear();
      if (yearA !== yearB) return yearA - yearB;
      return a.name.localeCompare(b.name);
    });
  });

  return (
    <>
      <div className="w-full flex flex-row gap-6 justify-between">
        <InputGroup className="max-w-sm">
          <InputGroupInput
            placeholder="Suche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="secondary"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm ? "Zurücksetzen" : "Suche"}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button variant="success" onClick={() => setNewDialogOpen(true)}>
          <PlusIcon /> Neuer Spieler
        </Button>
      </div>
      <div className="space-y-8">
        {sortedTeams.map((teamName) => (
          <div key={teamName}>
            <h3 className="text-lg font-semibold mb-2">{teamName}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Jahrgang</TableHead>
                  <TableHead>Geschlecht</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playersByTeam[teamName].map((player) => (
                  <TableRow key={`${teamName}-${player.id}`}>
                    <TableCell className="font-medium">{player.id}</TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>
                      {new Date(player.birthday).getFullYear()}
                    </TableCell>
                    <TableCell>{player.gender || "-"}</TableCell>
                    <TableCell>
                      {player.playerTeams.map((pt) => pt.team.name).join(", ")}
                    </TableCell>
                    <TableCell className="text-right">
                      <PlayerListDropdown
                        onDeleteClick={() => openDeleteDialog(player)}
                        onEditClick={() => openEditDialog(player)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
      <PlayerDeleteDialog
        open={deleteDialogState.open}
        player={deleteDialogState.player}
        onClose={() => {
          setDeleteDialogState({ open: false, player: null });
          router.refresh();
        }}
      />
      <PlayerEditDialog
        open={editDialogState.open}
        player={editDialogState.player}
        teams={teams}
        onClose={() => {
          setEditDialogState({ open: false, player: null });
          router.refresh();
        }}
      />
      <PlayerNewDialog
        open={newDialogOpen}
        teams={teams}
        onClose={() => {
          setNewDialogOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}

export default PlayerTable;
