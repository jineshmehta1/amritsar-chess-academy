"use server"

import prisma from "@/lib/prisma"

// Authentication
export async function verifyAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not set in environment variables.");
  }
  return password === adminPassword;
}

// Read Operations
export async function getTournaments() {
  return prisma.tournament.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTournamentDetails(id: string) {
  return prisma.tournament.findUnique({
    where: { id },
    include: {
      players: {
        orderBy: [
          { score: 'desc' },
          { buchholz: 'desc' }
        ]
      },
      rounds: {
        include: {
          pairings: {
            include: {
              p1: true,
              p2: true
            }
          }
        },
        orderBy: { roundNumber: 'asc' }
      }
    }
  });
}

// Write Operations
export async function createTournament(name: string) {
  return prisma.tournament.create({
    data: { name },
  });
}

export async function deleteTournament(id: string) {
  return prisma.tournament.delete({
    where: { id }
  });
}

export async function addPlayer(tournamentId: string, name: string, rating: number) {
  return prisma.player.create({
    data: {
      tournamentId,
      name,
      rating,
      score: 0,
      buchholz: 0,
    }
  });
}

export async function removePlayer(playerId: string) {
  return prisma.player.delete({
    where: { id: playerId }
  });
}

export async function resetTournamentData(tournamentId: string) {
  // Delete all rounds (which deletes pairings due to cascade)
  await prisma.round.deleteMany({
    where: { tournamentId }
  });

  // Reset player scores
  await prisma.player.updateMany({
    where: { tournamentId },
    data: { score: 0, buchholz: 0 }
  });

  return { success: true };
}

export async function saveRoundWithPairings(tournamentId: string, roundNumber: number, pairings: { p1Id: string, p2Id: string | null }[]) {
  const round = await prisma.round.create({
    data: {
      tournamentId,
      roundNumber,
      pairings: {
        create: pairings.map(p => ({
          p1Id: p.p1Id,
          p2Id: p.p2Id,
          result: p.p2Id === null ? "1-0" : null // Auto-win for bye
        }))
      }
    }
  });

  if (pairings.some(p => p.p2Id === null)) {
    // If someone got a bye, update their score immediately
    await updateScoresAndBuchholz(tournamentId);
  }

  return round;
}

export async function updateMatchResult(pairingId: string, result: "1-0" | "0-1" | "0.5-0.5" | null) {
  const pairing = await prisma.pairing.update({
    where: { id: pairingId },
    data: { result },
    include: { round: true }
  });

  await updateScoresAndBuchholz(pairing.round.tournamentId);
  return pairing;
}

// Helper to recalculate all scores and buchholz for a tournament
async function updateScoresAndBuchholz(tournamentId: string) {
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: {
      players: true,
      rounds: {
        include: { pairings: true }
      }
    }
  });

  if (!tournament) return;

  const playerStats = new Map<string, { score: number, playedAgainst: string[] }>();
  
  tournament.players.forEach(p => {
    playerStats.set(p.id, { score: 0, playedAgainst: [] });
  });

  // Calculate base scores
  tournament.rounds.forEach(round => {
    round.pairings.forEach(pairing => {
      const p1Stats = playerStats.get(pairing.p1Id);
      const p2Stats = pairing.p2Id ? playerStats.get(pairing.p2Id) : null;

      if (p1Stats && p2Stats && pairing.p2Id) {
         p1Stats.playedAgainst.push(pairing.p2Id);
         p2Stats.playedAgainst.push(pairing.p1Id);
      }

      if (pairing.result === "1-0" && p1Stats) {
        p1Stats.score += 1;
      } else if (pairing.result === "0-1" && p2Stats) {
        p2Stats.score += 1;
      } else if (pairing.result === "0.5-0.5" && p1Stats && p2Stats) {
        p1Stats.score += 0.5;
        p2Stats.score += 0.5;
      }
    });
  });

  // Calculate Buchholz and prepare update promises
  const updatePromises = tournament.players.map(player => {
    const stats = playerStats.get(player.id);
    if (!stats) return null;

    let buchholz = 0;
    for (const oppId of stats.playedAgainst) {
      buchholz += playerStats.get(oppId)?.score || 0;
    }

    return prisma.player.update({
      where: { id: player.id },
      data: {
        score: stats.score,
        buchholz: buchholz
      }
    });
  }).filter(Boolean);

  // Execute all updates in a single transaction
  await prisma.$transaction(updatePromises as any);
}
