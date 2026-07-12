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
          pairings: true
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
  await prisma.player.create({
    data: {
      tournamentId,
      name,
      rating,
      score: 0,
      buchholz: 0,
    }
  });
  return getTournamentDetails(tournamentId);
}

export async function removePlayer(playerId: string, tournamentId: string) {
  await prisma.player.delete({
    where: { id: playerId }
  });
  return getTournamentDetails(tournamentId);
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

  return getTournamentDetails(tournamentId);
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

  return getTournamentDetails(tournamentId);
}

export async function updateMatchResult(pairingId: string, result: "1-0" | "0-1" | "0.5-0.5" | null) {
  const pairing = await prisma.pairing.update({
    where: { id: pairingId },
    data: { result },
    include: { round: true }
  });

  await updateScoresAndBuchholz(pairing.round.tournamentId);
  return getTournamentDetails(pairing.round.tournamentId);
}

async function updateScoresAndBuchholz(tournamentId: string) {
  await prisma.$executeRaw`
    WITH RawMatches AS (
      SELECT 
        p."p1Id" AS player_id,
        p."p2Id" AS opponent_id,
        CASE 
          WHEN p.result = '1-0' THEN 1.0
          WHEN p.result = '0-1' THEN 0.0
          WHEN p.result = '0.5-0.5' THEN 0.5
          ELSE 0.0
        END AS score
      FROM "Pairing" p
      JOIN "Round" r ON p."roundId" = r.id
      WHERE r."tournamentId" = ${tournamentId}

      UNION ALL

      SELECT 
        p."p2Id" AS player_id,
        p."p1Id" AS opponent_id,
        CASE 
          WHEN p.result = '1-0' THEN 0.0
          WHEN p.result = '0-1' THEN 1.0
          WHEN p.result = '0.5-0.5' THEN 0.5
          ELSE 0.0
        END AS score
      FROM "Pairing" p
      JOIN "Round" r ON p."roundId" = r.id
      WHERE r."tournamentId" = ${tournamentId} AND p."p2Id" IS NOT NULL
    ),
    PlayerScores AS (
      SELECT 
        pl.id AS player_id,
        COALESCE(SUM(rm.score), 0.0) AS total_score
      FROM "Player" pl
      LEFT JOIN RawMatches rm ON pl.id = rm.player_id
      WHERE pl."tournamentId" = ${tournamentId}
      GROUP BY pl.id
    ),
    PlayerBuchholz AS (
      SELECT 
        pl.id AS player_id,
        COALESCE(SUM(ops.total_score), 0.0) AS total_buchholz
      FROM "Player" pl
      LEFT JOIN RawMatches rm ON pl.id = rm.player_id AND rm.opponent_id IS NOT NULL
      LEFT JOIN PlayerScores ops ON rm.opponent_id = ops.player_id
      WHERE pl."tournamentId" = ${tournamentId}
      GROUP BY pl.id
    )
    UPDATE "Player" p
    SET 
      score = ps.total_score,
      buchholz = pb.total_buchholz
    FROM PlayerScores ps
    JOIN PlayerBuchholz pb ON ps.player_id = pb.player_id
    WHERE p.id = ps.player_id AND p."tournamentId" = ${tournamentId};
  `;
}
