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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [groupBy, setGroupBy] = useState("team");

  const openDeleteDialog = (player) =>
    setDeleteDialogState({ open: true, player });
  const closeDeleteDialog = () =>
    setDeleteDialogState({ open: false, player: null });

  const openEditDialog = (player) => setEditDialogState({ open: true, player });
  const closeEditDialog = () =>
    setEditDialogState({ open: false, player: null });

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Group players based on selected grouping method
  const groupedPlayers = filteredPlayers.reduce((acc, player) => {
    let groupKeys = [];

    if (groupBy === "team") {
      // Handle players with no teams
      if (!player.playerTeams || player.playerTeams.length === 0) {
        groupKeys = ["Kein Team"];
      } else {
        // Add player to each of their teams
        groupKeys = player.playerTeams.map((pt) => pt.team.name);
      }
    } else if (groupBy === "year") {
      const year = new Date(player.birthday).getFullYear();
      const gender = player.gender || "Unbekannt";
      groupKeys = [`${year} - ${gender}`];
    } else if (groupBy === "stammverein") {
      const stammverein = player.stammverein || "Kein Stammverein";
      groupKeys = [stammverein];
    }

    groupKeys.forEach((key) => {
      if (!acc[key]) acc[key] = [];
      acc[key].push(player);
    });

    return acc;
  }, {});

  // Sort groups and sort players within each group
  const sortedGroups = Object.keys(groupedPlayers).sort((a, b) => {
    // For year grouping, sort numerically by year, then by gender
    if (groupBy === "year") {
      const [yearA, genderA] = a.split(" - ");
      const [yearB, genderB] = b.split(" - ");
      const yearDiff = parseInt(yearA) - parseInt(yearB);
      if (yearDiff !== 0) return yearDiff;
      return (genderA || "").localeCompare(genderB || "");
    }
    // For others, sort alphabetically
    return a.localeCompare(b);
  });

  sortedGroups.forEach((groupName) => {
    groupedPlayers[groupName].sort((a, b) => {
      const yearA = new Date(a.birthday).getFullYear();
      const yearB = new Date(b.birthday).getFullYear();
      if (yearA !== yearB) return yearA - yearB;
      return a.name.localeCompare(b.name);
    });
  });

  return (
    <>
      <div className="w-full flex flex-row gap-6 justify-between">
        <div className="flex flex-row gap-4 items-center">
          <InputGroup className="max-w-sm md:w-80">
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
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team">Gruppieren nach Team</SelectItem>
              <SelectItem value="year">Gruppieren nach Jahrgang</SelectItem>
              <SelectItem value="stammverein">
                Gruppieren nach Stammverein
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="success" onClick={() => setNewDialogOpen(true)}>
          <PlusIcon /> Neuer Spieler
        </Button>
      </div>
      <div className="space-y-8">
        {sortedGroups.map((groupName) => (
          <div key={groupName}>
            <h3 className="text-lg font-semibold mb-2">{groupName}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Jahrgang</TableHead>
                  <TableHead>Geschlecht</TableHead>
                  <TableHead>Stammverein</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedPlayers[groupName].map((player) => (
                  <TableRow key={`${groupName}-${player.id}`}>
                    <TableCell className="font-medium">{player.id}</TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>
                      {new Date(player.birthday).getFullYear()}
                    </TableCell>
                    <TableCell>{player.gender || "-"}</TableCell>
                    <TableCell>{player.stammverein || "-"}</TableCell>
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
