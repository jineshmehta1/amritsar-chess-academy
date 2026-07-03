"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Users, Play, RotateCcw, Trash2, Plus, Download } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Types
type Player = {
  id: string;
  name: string;
  rating: number;
  score: number;
  playedAgainst: string[];
};

type MatchResult = "1-0" | "0-1" | "0.5-0.5" | null;

type Pairing = {
  p1: Player | null; // null if Bye
  p2: Player | null;
  result: MatchResult;
};

type Round = {
  roundNumber: number;
  pairings: Pairing[];
};

export default function PairingPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerRating, setNewPlayerRating] = useState("1200");
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load from local storage
  useEffect(() => {
    const savedPlayers = localStorage.getItem("bbp_players");
    const savedRounds = localStorage.getItem("bbp_rounds");
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    if (savedRounds) setRounds(JSON.parse(savedRounds));
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bbp_players", JSON.stringify(players));
      localStorage.setItem("bbp_rounds", JSON.stringify(rounds));
    }
  }, [players, rounds, isLoaded]);

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    const newPlayer: Player = {
      id: Math.random().toString(36).substring(7),
      name: newPlayerName.trim(),
      rating: parseInt(newPlayerRating) || 1200,
      score: 0,
      playedAgainst: [],
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
  };

  const removePlayer = (id: string) => {
    if (rounds.length > 0) {
      alert("Cannot remove players after tournament has started.");
      return;
    }
    setPlayers(players.filter(p => p.id !== id));
  };

  const resetTournament = () => {
    if (confirm("Are you sure you want to reset all progress? Players will be kept but scores and rounds will be cleared.")) {
      const resetPlayers = players.map(p => ({ ...p, score: 0, playedAgainst: [] }));
      setPlayers(resetPlayers);
      setRounds([]);
    }
  };

  const generateNextRound = () => {
    // Basic BBP-style Swiss Pairing Simulator
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.rating - a.rating;
    });

    const currentRound = rounds.length + 1;
    const newPairings: Pairing[] = [];
    const pairedIds = new Set<string>();

    for (let i = 0; i < sortedPlayers.length; i++) {
      const p1 = sortedPlayers[i];
      if (pairedIds.has(p1.id)) continue;

      let p2: Player | null = null;
      
      // Find suitable opponent
      for (let j = i + 1; j < sortedPlayers.length; j++) {
        const potentialOpponent = sortedPlayers[j];
        if (!pairedIds.has(potentialOpponent.id) && !p1.playedAgainst.includes(potentialOpponent.id)) {
          p2 = potentialOpponent;
          break;
        }
      }

      if (p2) {
        newPairings.push({ p1, p2, result: null });
        pairedIds.add(p1.id);
        pairedIds.add(p2.id);
      } else {
        // Player gets a bye
        newPairings.push({ p1, p2: null, result: "1-0" }); // Auto-win for bye
        pairedIds.add(p1.id);
      }
    }

    setRounds([...rounds, { roundNumber: currentRound, pairings: newPairings }]);
  };

  const handleResultChange = (roundIndex: number, pairingIndex: number, result: MatchResult) => {
    const updatedRounds = [...rounds];
    updatedRounds[roundIndex].pairings[pairingIndex].result = result;
    setRounds(updatedRounds);
    
    // Recalculate all scores
    recalculateScores(updatedRounds);
  };

  const recalculateScores = (currentRounds: Round[]) => {
    // Reset scores
    const newPlayers = players.map(p => ({ ...p, score: 0, playedAgainst: [] as string[] }));
    
    currentRounds.forEach(round => {
      round.pairings.forEach(pairing => {
        const p1Index = newPlayers.findIndex(p => p.id === pairing.p1?.id);
        const p2Index = newPlayers.findIndex(p => p.id === pairing.p2?.id);
        
        if (pairing.p1 && pairing.p2) {
          // Record they played each other
          if (p1Index !== -1 && !newPlayers[p1Index].playedAgainst.includes(pairing.p2.id)) {
             newPlayers[p1Index].playedAgainst.push(pairing.p2.id);
          }
          if (p2Index !== -1 && !newPlayers[p2Index].playedAgainst.includes(pairing.p1.id)) {
             newPlayers[p2Index].playedAgainst.push(pairing.p1.id);
          }
        }

        if (pairing.result === "1-0") {
          if (p1Index !== -1) newPlayers[p1Index].score += 1;
        } else if (pairing.result === "0-1") {
          if (p2Index !== -1) newPlayers[p2Index].score += 1;
        } else if (pairing.result === "0.5-0.5") {
          if (p1Index !== -1) newPlayers[p1Index].score += 0.5;
          if (p2Index !== -1) newPlayers[p2Index].score += 0.5;
        }
      });
    });

    setPlayers(newPlayers);
  };

  const getBuchholz = (player: Player) => {
    return player.playedAgainst.reduce((sum, opponentId) => {
      const opponent = players.find(p => p.id === opponentId);
      return sum + (opponent?.score || 0);
    }, 0);
  };

  const exportToCSV = () => {
    const headers = ["Rank", "Name", "Rating", "Score", "Buchholz (Bukos)"];
    const csvContent = [
      headers.join(","),
      ...sortedStandings.map((p, i) => 
        [i + 1, `"${p.name}"`, p.rating, p.score, getBuchholz(p)].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `tournament_standings_round_${rounds.length}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sortedStandings = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return getBuchholz(b) - getBuchholz(a); // Tie-break with Buchholz
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-12">
        <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#12123D] flex items-center gap-3">
                <Trophy className="w-8 h-8 text-[#FF6B00]" />
                Tournament Pairing
              </h1>
              <p className="text-slate-500 mt-2">
                BBP-Style Swiss System Simulator. Runs entirely in your browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {players.length >= 2 && (
                <Button onClick={generateNextRound} className="bg-[#FF6B00] hover:bg-[#e66000] text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Pair Round {rounds.length + 1}
                </Button>
              )}
              {rounds.length > 0 && (
                <Button variant="outline" onClick={exportToCSV} className="border-slate-200">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
              {rounds.length > 0 && (
                <Button variant="destructive" onClick={resetTournament}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Player Management & Standings */}
            <div className="space-y-8 lg:col-span-1">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-[#12123D]">
                    <Users className="w-5 h-5 text-[#FF6B00]" />
                    Players & Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddPlayer} className="flex gap-2 mb-6">
                    <div className="flex-1 space-y-1">
                      <Input 
                        placeholder="Player Name" 
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        disabled={rounds.length > 0}
                      />
                    </div>
                    <div className="w-20 space-y-1">
                      <Input 
                        type="number"
                        placeholder="Rating" 
                        value={newPlayerRating}
                        onChange={(e) => setNewPlayerRating(e.target.value)}
                        disabled={rounds.length > 0}
                      />
                    </div>
                    <Button type="submit" disabled={!newPlayerName.trim() || rounds.length > 0} size="icon" className="bg-[#12123D] hover:bg-[#12123D]/90 text-white">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </form>

                  <div className="rounded-md border border-slate-200 max-h-[500px] overflow-y-auto">
                    <Table>
                      <TableHeader className="bg-slate-50 sticky top-0 z-10">
                        <TableRow>
                          <TableHead className="w-12 text-center">#</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead className="text-center" title="Score">Pts</TableHead>
                          <TableHead className="text-center" title="Buchholz (Bukos)">Bkz</TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedStandings.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-slate-400 py-8">
                              No players added yet.
                            </TableCell>
                          </TableRow>
                        ) : (
                          sortedStandings.map((player, index) => (
                            <TableRow key={player.id}>
                              <TableCell className="font-medium text-center">{index + 1}</TableCell>
                              <TableCell>
                                <div className="font-semibold text-[#12123D]">{player.name}</div>
                                <div className="text-[10px] text-slate-500">R: {player.rating}</div>
                              </TableCell>
                              <TableCell className="text-center font-bold text-[#FF6B00]">
                                {player.score}
                              </TableCell>
                              <TableCell className="text-center text-xs font-medium text-slate-600">
                                {getBuchholz(player)}
                              </TableCell>
                              <TableCell>
                                {rounds.length === 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600"
                                    onClick={() => removePlayer(player.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Pairings / Rounds */}
            <div className="lg:col-span-2 space-y-6">
              {rounds.length === 0 ? (
                <Card className="h-full border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-3 max-w-sm px-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                      <Trophy className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#12123D]">Tournament Not Started</h3>
                    <p className="text-slate-500 text-sm">
                      Add at least 2 players and click "Pair Round 1" to start the BBP-style Swiss pairing.
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6 flex flex-col-reverse">
                  {rounds.map((round, rIndex) => (
                    <Card key={rIndex} className="border-slate-200 shadow-sm animate-in slide-in-from-bottom-4 duration-300">
                      <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                        <CardTitle className="text-[#12123D]">Round {round.roundNumber}</CardTitle>
                        <CardDescription>Enter results for this round to update standings.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {round.pairings.map((pairing, pIndex) => (
                            <div key={pIndex} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-[#FF6B00]/30 hover:shadow-md transition-all">
                              <div className="flex-1 flex justify-end font-semibold text-lg text-[#12123D]">
                                {pairing.p1?.name} <span className="text-xs text-slate-400 ml-2 hidden md:inline">({pairing.p1?.score})</span>
                              </div>
                              
                              <div className="w-full md:w-48 shrink-0">
                                {pairing.p2 === null ? (
                                  <div className="text-center py-2 px-3 bg-slate-100 rounded-md text-sm font-semibold text-slate-500 border border-slate-200">
                                    BYE (1 - 0)
                                  </div>
                                ) : (
                                  <Select
                                    value={pairing.result || "pending"}
                                    onValueChange={(val) => handleResultChange(rIndex, pIndex, val as MatchResult)}
                                  >
                                    <SelectTrigger className={`w-full font-bold text-center ${pairing.result ? 'border-[#FF6B00]/50 bg-orange-50/50 text-[#FF6B00]' : ''}`}>
                                      <SelectValue placeholder="Select Result" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending" disabled>Match Pending</SelectItem>
                                      <SelectItem value="1-0">1 - 0 (White Wins)</SelectItem>
                                      <SelectItem value="0-1">0 - 1 (Black Wins)</SelectItem>
                                      <SelectItem value="0.5-0.5">½ - ½ (Draw)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>

                              <div className="flex-1 flex justify-start font-semibold text-lg text-[#12123D]">
                                <span className="text-xs text-slate-400 mr-2 hidden md:inline">({pairing.p2?.score})</span> {pairing.p2 ? pairing.p2.name : "None"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
