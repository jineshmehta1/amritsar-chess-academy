"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Users, Play, RotateCcw, Trash2, Plus, Download, Lock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExportRoundButton } from "@/components/export-round-button";
import { 
  verifyAdminPassword, 
  getTournaments, 
  getTournamentDetails, 
  createTournament,
  addPlayer,
  removePlayer,
  resetTournamentData,
  saveRoundWithPairings,
  updateMatchResult,
  deleteTournament
} from "@/lib/actions/tournament";

type MatchResult = "1-0" | "0-1" | "0.5-0.5" | null;


export default function PairingAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Tournament State
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [activeTournamentId, setActiveTournamentId] = useState<string | null>(null);
  const [tournamentData, setTournamentData] = useState<any>(null);
  const [newTournamentName, setNewTournamentName] = useState("");
  
  // Player Input State
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerRating, setNewPlayerRating] = useState("1200");

  useEffect(() => {
    if (isAuthenticated) {
      loadTournaments();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTournamentId) {
      loadTournamentData(activeTournamentId);
    } else {
      setTournamentData(null);
    }
  }, [activeTournamentId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError("");
    try {
      const isValid = await verifyAdminPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        setError("Invalid password");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loadTournaments = async () => {
    const data = await getTournaments();
    setTournaments(data);
    if (data.length > 0 && !activeTournamentId) {
      setActiveTournamentId(data[0].id);
    }
  };

  const loadTournamentData = async (id: string) => {
    const data = await getTournamentDetails(id);
    setTournamentData(data);
  };

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTournamentName.trim()) return;
    const t = await createTournament(newTournamentName.trim());
    setNewTournamentName("");
    await loadTournaments();
    setActiveTournamentId(t.id);
  };

  const handleDeleteTournament = async () => {
    if (!activeTournamentId) return;
    if (confirm("Are you sure you want to delete this tournament? This cannot be undone.")) {
      await deleteTournament(activeTournamentId);
      setActiveTournamentId(null);
      await loadTournaments();
    }
  }

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim() || !activeTournamentId) return;
    const updated = await addPlayer(activeTournamentId, newPlayerName.trim(), parseInt(newPlayerRating) || 1200);
    setNewPlayerName("");
    setTournamentData(updated);
  };

  const handleRemovePlayer = async (id: string) => {
    if (tournamentData?.rounds?.length > 0) {
      alert("Cannot remove players after tournament has started.");
      return;
    }
    const updated = await removePlayer(id, activeTournamentId!);
    setTournamentData(updated);
  };

  const handleResetTournament = async () => {
    if (confirm("Are you sure you want to reset all progress? Players will be kept but scores and rounds will be cleared.")) {
      const updated = await resetTournamentData(activeTournamentId!);
      setTournamentData(updated);
    }
  };

  const handleGenerateNextRound = async () => {
    if (!tournamentData) return;
    
    // Simulate Pairings 
    // Get all played opponent sets to avoid re-pairing
    const playedOpponents = new Map<string, Set<string>>();
    tournamentData.players.forEach((p: any) => playedOpponents.set(p.id, new Set()));
    
    tournamentData.rounds.forEach((round: any) => {
      round.pairings.forEach((pairing: any) => {
        if (pairing.p1Id && pairing.p2Id) {
          playedOpponents.get(pairing.p1Id)?.add(pairing.p2Id);
          playedOpponents.get(pairing.p2Id)?.add(pairing.p1Id);
        }
      });
    });

    // Players are already sorted by score and buchholz from the server
    const sortedPlayers = [...tournamentData.players];
    const newPairings: { p1Id: string, p2Id: string | null }[] = [];
    const pairedIds = new Set<string>();

    for (let i = 0; i < sortedPlayers.length; i++) {
      const p1 = sortedPlayers[i];
      if (pairedIds.has(p1.id)) continue;

      let p2: any = null;
      
      // Find suitable opponent
      for (let j = i + 1; j < sortedPlayers.length; j++) {
        const potentialOpponent = sortedPlayers[j];
        if (!pairedIds.has(potentialOpponent.id) && !playedOpponents.get(p1.id)?.has(potentialOpponent.id)) {
          p2 = potentialOpponent;
          break;
        }
      }

      if (p2) {
        newPairings.push({ p1Id: p1.id, p2Id: p2.id });
        pairedIds.add(p1.id);
        pairedIds.add(p2.id);
      } else {
        // Bye
        newPairings.push({ p1Id: p1.id, p2Id: null });
        pairedIds.add(p1.id);
      }
    }

    const nextRoundNumber = (tournamentData.rounds?.length || 0) + 1;
    const updated = await saveRoundWithPairings(activeTournamentId!, nextRoundNumber, newPairings);
    setTournamentData(updated);
  };

  const handleResultChange = async (pairingId: string, result: MatchResult) => {
    // 1. Calculate and set the optimistic UI state instantly
    if (tournamentData) {
      const optimisticData = recalculateClientScores(tournamentData, pairingId, result);
      setTournamentData(optimisticData);
    }

    // 2. Perform the server update in the background
    try {
      const updated = await updateMatchResult(pairingId, result);
      setTournamentData(updated);
    } catch (err) {
      console.error("Failed to sync match result with server:", err);
      // Optional: reload page or show error if sync failed
    }
  };

  // Helper function to recalculate scores and Buchholz instantly on the client side
  const recalculateClientScores = (data: any, targetPairingId: string, newResult: MatchResult) => {
    const clone = JSON.parse(JSON.stringify(data));
    
    let found = false;
    for (const round of clone.rounds) {
      for (const pairing of round.pairings) {
        if (pairing.id === targetPairingId) {
          pairing.result = newResult === "pending" ? null : newResult;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    const playerStats = new Map<string, { score: number, playedAgainst: string[] }>();
    clone.players.forEach((p: any) => {
      playerStats.set(p.id, { score: 0, playedAgainst: [] });
    });

    clone.rounds.forEach((round: any) => {
      round.pairings.forEach((pairing: any) => {
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

    clone.players.forEach((player: any) => {
      const stats = playerStats.get(player.id);
      if (!stats) return;

      let buchholz = 0;
      for (const oppId of stats.playedAgainst) {
        buchholz += playerStats.get(oppId)?.score || 0;
      }

      player.score = stats.score;
      player.buchholz = buchholz;
    });

    clone.players.sort((a: any, b: any) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.buchholz - a.buchholz;
    });

    return clone;
  };

  const exportToCSV = () => {
    if (!tournamentData) return;
    const headers = ["Rank", "Name", "Rating", "Score", "Buchholz (Bukos)"];
    const csvContent = [
      headers.join(","),
      ...tournamentData.players.map((p: any, i: number) => 
        [i + 1, `"${p.name}"`, p.rating, p.score, p.buchholz].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `tournament_${tournamentData.name}_round_${tournamentData.rounds.length}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-28 pb-12">
          <Card className="w-full max-w-md shadow-xl border-slate-200">
            <CardHeader className="space-y-2 text-center pb-8">
              <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <Lock className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#12123D]">Admin Access</CardTitle>
              <CardDescription>Enter the pairing administrator password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    className="h-12 text-center text-lg"
                  />
                  {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}
                </div>
                <Button type="submit" className="w-full h-12 bg-[#FF6B00] hover:bg-[#e66000] text-white font-bold" disabled={isAuthenticating}>
                  {isAuthenticating ? "Verifying..." : "Login to Pairing System"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-12">
        <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#12123D] flex items-center gap-3">
                <Trophy className="w-8 h-8 text-[#FF6B00]" />
                Tournament Admin
              </h1>
              <p className="text-slate-500 mt-2">
                Manage pairings and update results directly to the database.
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={activeTournamentId || ""} onValueChange={setActiveTournamentId}>
                <SelectTrigger className="w-full md:w-[250px] font-semibold border-slate-300">
                  <SelectValue placeholder="Select Tournament" />
                </SelectTrigger>
                <SelectContent>
                  {tournaments.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="border-slate-200 bg-slate-50 shadow-sm">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center">
               <form onSubmit={handleCreateTournament} className="flex gap-2 w-full">
                  <Input 
                    placeholder="New Tournament Name..." 
                    value={newTournamentName}
                    onChange={(e) => setNewTournamentName(e.target.value)}
                    className="flex-1 bg-white"
                  />
                  <Button type="submit" disabled={!newTournamentName.trim()} className="bg-[#12123D] hover:bg-[#12123D]/90 text-white shrink-0">
                    Create Tournament
                  </Button>
               </form>
               {activeTournamentId && (
                 <Button variant="ghost" onClick={handleDeleteTournament} className="text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0">
                   Delete Tournament
                 </Button>
               )}
            </CardContent>
          </Card>

          {tournamentData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
              {/* Left Column: Player Management & Standings */}
              <div className="space-y-8 lg:col-span-1">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#12123D] flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#FF6B00]" />
                      Players & Standings
                    </h2>
                    {tournamentData.rounds.length > 0 && (
                      <Button variant="outline" size="sm" onClick={exportToCSV} className="border-slate-200 h-8 text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                    )}
                </div>

                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                      <form onSubmit={handleAddPlayer} className="flex gap-2">
                        <div className="flex-1">
                          <Input 
                            placeholder="Name" 
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            disabled={tournamentData.rounds.length > 0}
                            className="bg-white"
                          />
                        </div>
                        <div className="w-20">
                          <Input 
                            type="number"
                            placeholder="Rating" 
                            value={newPlayerRating}
                            onChange={(e) => setNewPlayerRating(e.target.value)}
                            disabled={tournamentData.rounds.length > 0}
                            className="bg-white px-2"
                          />
                        </div>
                        <Button type="submit" disabled={!newPlayerName.trim() || tournamentData.rounds.length > 0} size="icon" className="bg-[#12123D] text-white shrink-0">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto">
                      <Table>
                        <TableHeader className="bg-white sticky top-0 z-10 shadow-sm">
                          <TableRow>
                            <TableHead className="w-12 text-center text-xs">#</TableHead>
                            <TableHead className="text-xs">Player</TableHead>
                            <TableHead className="text-center text-xs" title="Score">Pts</TableHead>
                            <TableHead className="text-center text-xs" title="Buchholz (Bukos)">Bkz</TableHead>
                            <TableHead className="w-8"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tournamentData.players.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center text-slate-400 py-8">
                                No players added.
                              </TableCell>
                            </TableRow>
                          ) : (
                            tournamentData.players.map((player: any, index: number) => (
                              <TableRow key={player.id}>
                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                <TableCell>
                                  <div className="font-semibold text-[#12123D] leading-tight">{player.name}</div>
                                  <div className="text-[10px] text-slate-500">R: {player.rating}</div>
                                </TableCell>
                                <TableCell className="text-center font-bold text-[#FF6B00]">
                                  {player.score}
                                </TableCell>
                                <TableCell className="text-center text-xs font-medium text-slate-600">
                                  {player.buchholz}
                                </TableCell>
                                <TableCell className="p-2">
                                  {tournamentData.rounds.length === 0 && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 text-red-400 hover:bg-red-50 hover:text-red-600"
                                      onClick={() => handleRemovePlayer(player.id)}
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
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#12123D] flex items-center gap-2">
                      Rounds
                    </h2>
                    <div className="flex gap-2">
                      {tournamentData.rounds.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={handleResetTournament} className="text-red-500 hover:bg-red-50 h-8">
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reset Rounds
                        </Button>
                      )}
                      {tournamentData.players.length >= 2 && (
                        <Button onClick={handleGenerateNextRound} size="sm" className="bg-[#FF6B00] hover:bg-[#e66000] text-white h-8">
                          <Play className="w-3 h-3 mr-1" />
                          Pair Round {tournamentData.rounds.length + 1}
                        </Button>
                      )}
                    </div>
                </div>

                {tournamentData.rounds.length === 0 ? (
                  <Card className="h-full border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-3 max-w-sm px-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                        <Trophy className="w-6 h-6 text-[#FF6B00]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#12123D]">No Rounds Yet</h3>
                      <p className="text-slate-500 text-sm">
                        Add players and generate the first round.
                      </p>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-6 flex flex-col-reverse">
                    {tournamentData.rounds.map((round: any, rIndex: number) => (
                      <Card key={round.id} className="border-slate-200 shadow-sm animate-in slide-in-from-bottom-4 duration-300">
                        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/80 border-b border-slate-100 pb-4 space-y-0">
                          <CardTitle className="text-[#12123D]">Round {round.roundNumber}</CardTitle>
                          <ExportRoundButton round={round} tournamentName={tournamentData.name} />
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            {round.pairings.map((pairing: any, pIndex: number) => {
                              const p1 = tournamentData.players.find((p: any) => p.id === pairing.p1Id);
                              const p2 = pairing.p2Id ? tournamentData.players.find((p: any) => p.id === pairing.p2Id) : null;

                              return (
                              <div key={pairing.id} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-[#FF6B00]/30 hover:shadow-md transition-all">
                                <div className="flex-1 flex justify-end font-semibold text-lg text-[#12123D]">
                                  {p1?.name} <span className="text-xs text-slate-400 ml-2 hidden md:inline">({p1?.score})</span>
                                </div>
                                
                                <div className="w-full md:w-48 shrink-0">
                                  {pairing.p2Id === null ? (
                                    <div className="text-center py-2 px-3 bg-slate-100 rounded-md text-sm font-semibold text-slate-500 border border-slate-200">
                                      BYE (1 - 0)
                                    </div>
                                  ) : (
                                    <Select
                                      value={pairing.result || "pending"}
                                      onValueChange={(val) => handleResultChange(pairing.id, val as MatchResult)}
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
                                  <span className="text-xs text-slate-400 mr-2 hidden md:inline">({p2?.score})</span> {p2 ? p2.name : "None"}
                                </div>
                              </div>
                            )})}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
