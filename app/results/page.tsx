import { getTournaments, getTournamentDetails } from "@/lib/actions/tournament";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Trophy, Medal, Users, Target, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ResultsPage() {
  const tournaments = await getTournaments();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-12">
          {/* Hero Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#FF6B00] rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Trophy className="w-4 h-4" />
              Live Tournament Results
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#12123D] tracking-tight">
              Tournament Standings
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              View real-time pairings, results and the leaderboard for all Amritsar Chess Club tournaments.
            </p>
          </div>

          {tournaments.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-2xl font-bold text-[#12123D] mb-2">No Tournaments Yet</h3>
              <p className="text-slate-500">Check back soon! Tournament results will appear here once an admin creates a tournament.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {await Promise.all(tournaments.map(async (t) => {
                const data = await getTournamentDetails(t.id);
                if (!data) return null;
                return <TournamentSection key={t.id} data={data} />;
              }))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

async function TournamentSection({ data }: { data: any }) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-[#FF6B00]/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#12123D] p-3 rounded-2xl">
            <Trophy className="w-6 h-6 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#12123D]">{data.name}</h2>
            <p className="text-slate-500 text-sm">
              {data.players.length} Players · {data.rounds.length} Rounds completed
            </p>
          </div>
        </div>
        <Badge
          className={`px-4 py-1.5 text-sm font-bold rounded-full ${
            data.status === "active"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-slate-100 text-slate-600"
          }`}
          variant="outline"
        >
          {data.status === "active" ? "🟢 In Progress" : "✅ Completed"}
        </Badge>
      </div>

      {data.players.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No players registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-[#12123D] text-white pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Medal className="w-5 h-5 text-[#FF6B00]" />
                  Leaderboard
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Sorted by Points · Tiebreak: Buchholz
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="text-center w-12">#</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead className="text-center" title="Points">Pts</TableHead>
                      <TableHead className="text-center" title="Buchholz (Bukos)">Bkz</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.players.map((player: any, index: number) => (
                      <TableRow
                        key={player.id}
                        className={index === 0 ? "bg-orange-50 font-bold" : ""}
                      >
                        <TableCell className="text-center">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-[#12123D]">{player.name}</div>
                          <div className="text-xs text-slate-400">Rating: {player.rating}</div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-[#FF6B00] text-lg">
                          {player.score}
                        </TableCell>
                        <TableCell className="text-center text-sm text-slate-500">
                          {player.buchholz}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Rounds */}
          <div className="lg:col-span-3 space-y-6 flex flex-col-reverse">
            {data.rounds.length === 0 ? (
              <div className="flex items-center justify-center min-h-[200px] bg-slate-100 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400">Pairings not yet generated.</p>
              </div>
            ) : (
              data.rounds.map((round: any) => (
                <Card key={round.id} className="border-slate-200 shadow-sm">
                  <CardHeader className="border-b border-slate-100 bg-slate-50/80 pb-3">
                    <CardTitle className="text-base text-[#12123D]">Round {round.roundNumber}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {round.pairings.map((pairing: any) => {
                      const resultColor = pairing.result
                        ? "border-l-4 border-l-[#FF6B00]"
                        : "border-l-4 border-l-slate-200";
                      return (
                        <div
                          key={pairing.id}
                          className={`flex items-center justify-between p-3 rounded-lg bg-white border border-slate-100 ${resultColor}`}
                        >
                          <div className="flex-1 text-right">
                            <p className="font-semibold text-[#12123D] text-sm">{pairing.p1?.name}</p>
                            <p className="text-xs text-slate-400">{pairing.p1?.score} pts</p>
                          </div>

                          <div className="mx-4 w-28 text-center shrink-0">
                            {pairing.p2 === null ? (
                              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">BYE</span>
                            ) : pairing.result ? (
                              <span className="font-black text-[#FF6B00] text-sm tracking-widest">
                                {pairing.result === "0.5-0.5" ? "½ - ½" : pairing.result}
                              </span>
                            ) : (
                              <span className="text-xs font-bold bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">Pending</span>
                            )}
                          </div>

                          <div className="flex-1 text-left">
                            <p className="font-semibold text-[#12123D] text-sm">{pairing.p2?.name}</p>
                            <p className="text-xs text-slate-400">{pairing.p2?.score} pts</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}
