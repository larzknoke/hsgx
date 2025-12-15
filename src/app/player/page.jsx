import { Suspense } from "react";
import PlayerTable from "./components/playerTable";
import prisma from "@/lib/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import { requireSession } from "@/lib/auth-helper";

async function getPlayers() {
  const players = await prisma.player.findMany({
    include: {
      playerTeams: {
        include: {
          team: true,
        },
      },
    },
  });
  console.log("Fetched players:", players);
  return players;
}

async function getTeams() {
  const teams = await prisma.team.findMany();
  return teams;
}

async function Player() {
  const session = await requireSession();
  const players = await getPlayers();
  const teams = await getTeams();

  return (
    <div className="flex flex-col gap-6">
      <h1>Spieler</h1>
      <Suspense fallback={<Skeleton />}>
        <PlayerTable players={players} teams={teams} />
      </Suspense>
    </div>
  );
}

export default Player;
