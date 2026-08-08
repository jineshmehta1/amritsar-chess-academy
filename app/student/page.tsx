"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import {
  Layers,
  Puzzle as PuzzleIcon,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Palette,
  Info,
  Folder as FolderIcon,
} from "lucide-react";

// Inline definitions to prevent compile errors (since these files do not exist in the project)
function ModernKnightLogo({ size, variant }: { size?: string; variant?: string }) {
  return (
    <div className="text-xl font-black bg-gradient-to-r from-[#FF6B00] to-amber-500 bg-clip-text text-transparent">
      Amritsar Chess Academy
    </div>
  );
}

function ChessPieceSvg({ type, color, className }: { type: string; color: string; className?: string }) {
  if (type === "n" && color === "w") {
    return <span className={`${className} text-xl flex items-center justify-center text-slate-800 font-bold`}>♘</span>;
  }
  if (type === "k" && color === "b") {
    return <span className={`${className} text-xl flex items-center justify-center text-white font-bold`}>♚</span>;
  }
  return null;
}

type BoardTheme = "emerald" | "wood" | "midnight";

export default function StudentPortalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "arena" | "leaderboard">("dashboard");
  const [boardTheme, setBoardTheme] = useState<BoardTheme>("emerald");

  // Dynamic Student Profile Data from LocalStorage / Session
  const [studentProfile, setStudentProfile] = useState({
    id: "demo_student_id",
    name: "Aarav Sharma",
    fideRating: 1640,
    academyXp: 3420,
    dailyStreak: 14,
    badge: "Master Tactician 🏆",
    batch: "Beginner Morning",
  });

  const [dbPuzzles, setDbPuzzles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null);
  const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>([]);
  const [leaderboardEntries, setLeaderboardEntries] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState<any[]>([]);

  const fetchSolvedPuzzles = (studentId: string) => {
    fetch(`/api/students?id=${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.attempts)) {
          setSolvedPuzzleIds(data.attempts.map((a: any) => a.puzzleId));
        }
      })
      .catch((err) => console.error("Error fetching solved puzzle IDs:", err));
  };

  const fetchLeaderboard = () => {
    setLeaderboardLoading(true);
    fetch("/api/students?leaderboard=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const entries = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            batch: item.batch?.name || "General",
            solvedPuzzles: item.attempts || [],
            rating: item.rating || 1000,
          }));
          setLeaderboardEntries(entries);
        }
      })
      .catch((err) => console.error("Error fetching leaderboard:", err))
      .finally(() => setLeaderboardLoading(false));
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth", { method: "DELETE" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  // Fetch leaderboard when leaderboard tab is active
  useEffect(() => {
    if (activeTab === "leaderboard") {
      fetchLeaderboard();
    }
  }, [activeTab]);

  useEffect(() => {
    // Check Session Auth first
    fetch("/api/auth")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unauthenticated");
      })
      .then((authData) => {
        if (authData.authenticated && authData.user.role === "STUDENT") {
          const studentUser = authData.user;
          setStudentProfile({
            id: studentUser.id,
            name: studentUser.name,
            fideRating: studentUser.rating || 1000,
            academyXp: 1200,
            dailyStreak: 14,
            badge: "Master Tactician 🏆",
            batch: studentUser.batch?.name || "All Batches",
          });
          
          fetchSolvedPuzzles(studentUser.id);
          
          // Fetch student details containing their attendance records
          fetch(`/api/students?id=${studentUser.id}`)
            .then((res) => res.json())
            .then((studentData) => {
              if (studentData && Array.isArray(studentData.attendances)) {
                setAttendanceLogs(studentData.attendances);
              }
            })
            .catch((err) => console.error("Error fetching student details:", err));
        } else {
          router.push("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        router.push("/login");
      });

    // Load Puzzles and Folders
    Promise.all([
      fetch("/api/puzzles").then((res) => res.json()),
      fetch("/api/puzzles/folders").then((res) => res.json()),
    ])
      .then(([puzzlesData, foldersData]) => {
        if (Array.isArray(puzzlesData)) setDbPuzzles(puzzlesData);
        if (Array.isArray(foldersData)) setFolders(foldersData);
      })
      .catch((err) => console.error("Error loading puzzles & folders:", err));
  }, []);

  // Default demonstration puzzles
  const defaultPuzzles = [
    {
      id: "demo1",
      title: "Smothered Mate Sequence",
      level: "Intermediate",
      prompt: "White to move! Move Knight on f7 to deliver checkmate!",
      hint: "Move the White Knight to f7 (square marked in gold) to double check the Black King!",
      solutionDesc: "1. Nf7+ Kg8 2. Nh6+ Kh8 3. Qg8+ Rxg8 4. Nf7#",
      assignedBatch: "All Batches",
      fen: "6rk/5Npp/8/8/8/4Q3/5N2/4K3 w - - 0 1",
      pgn: "Nf7+",
    },
    {
      id: "demo2",
      title: "Back Rank Skewer Trap",
      level: "Beginner",
      prompt: "White to move and deliver back-rank mate!",
      hint: "Check the open d-file with your White Rook!",
      solutionDesc: "1. Rd8#",
      assignedBatch: "All Batches",
      fen: "3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
      pgn: "Rd8#",
    },
    {
      id: "demo3",
      title: "Queen Deflection Sacrifice",
      level: "Advanced",
      prompt: "White to move and checkmate!",
      hint: "Sacrifice the White Queen on h8 to draw the Black King out!",
      solutionDesc: "1. Qh8+ Deflection",
      assignedBatch: "All Batches",
      fen: "r1bq1r1k/pppp1p1p/2n2p2/4p3/2B1P3/3P1N2/PPP2PPP/R2QK2R w KQ - 0 1",
      pgn: "Qh8+",
    },
  ];

  // Filter folders: only show folders containing puzzles assigned to the student's batch
  const accessibleFolders = useMemo(() => {
    return folders
      .map((f) => {
        const folderPuzzles = dbPuzzles.filter(
          (p) =>
            p.folderId === f.id &&
            (!(p.assignedBatch) ||
              p.assignedBatch.toLowerCase() === "all batches" ||
              p.assignedBatch.toLowerCase() === (studentProfile.batch || "").toLowerCase())
        );
        const solvedCount = folderPuzzles.filter((p) => solvedPuzzleIds.includes(p.id)).length;
        return {
          ...f,
          puzzlesCount: folderPuzzles.length,
          solvedCount,
        };
      })
      .filter((f) => f.puzzlesCount > 0);
  }, [folders, dbPuzzles, studentProfile.batch, solvedPuzzleIds]);

  // Batch-based Puzzle Filtering (scoped to active folder if selected, or defaulting to first folder)
  const accessiblePuzzles = useMemo(() => {
    let list = dbPuzzles;
    const activeFolder = selectedFolder || accessibleFolders[0];
    if (activeFolder) {
      list = dbPuzzles.filter((p) => p.folderId === activeFolder.id);
    } else {
      // If no folders exist, show all puzzles
      list = dbPuzzles;
    }

    const filtered = list.filter((p) => {
      const b = (p.assignedBatch || "All Batches").toLowerCase();
      return b === "all batches" || b === (studentProfile.batch || "").toLowerCase();
    });

    if (filtered.length === 0) return defaultPuzzles;
    return filtered;
  }, [dbPuzzles, selectedFolder, accessibleFolders, studentProfile.batch]);

  // Interactive Puzzle Arena State
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [moveFeedback, setMoveFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [playedMoves, setPlayedMoves] = useState<string[]>([]);
  const [solutionMoves, setSolutionMoves] = useState<string[]>([]);

  const currentPuzzle = accessiblePuzzles[currentPuzzleIdx] || accessiblePuzzles[0] || defaultPuzzles[0];

  const startingFen = useMemo(() => {
    let f = currentPuzzle?.fen;
    if (currentPuzzle?.pgn) {
      const fenMatch = currentPuzzle.pgn.match(/\[FEN\s+"([^"]+)"\]/i);
      if (fenMatch && fenMatch[1]) {
        f = fenMatch[1];
      }
    }
    return f || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }, [currentPuzzle]);

  const puzzleTurn = useMemo(() => {
    const parts = startingFen.trim().split(/\s+/);
    return parts[1] === "b" ? "black" : "white";
  }, [startingFen]);

  const game = useRef(new Chess());
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

  // Reinitialize board whenever the current puzzle changes
  useEffect(() => {
    try {
      let startingFen = currentPuzzle.fen;
      let cleanMoves: string[] = [];

      if (currentPuzzle.pgn) {
        // Regex extraction fallback for FEN (extremely robust and ignores layout/syntax bugs in PGN)
        const fenMatch = currentPuzzle.pgn.match(/\[FEN\s+"([^"]+)"\]/i);
        if (fenMatch && fenMatch[1]) {
          startingFen = fenMatch[1];
        }

        try {
          const tempGame = new Chess();
          tempGame.loadPgn(currentPuzzle.pgn);
          const fenHeader = tempGame.header().FEN;
          if (fenHeader && !startingFen) {
            startingFen = fenHeader;
          }
          cleanMoves = tempGame.history();
        } catch (e) {
          console.warn("loadPgn failed, using regex fallback:", e);
        }

        // Regex moves extraction if loadPgn history is empty
        if (cleanMoves.length === 0 && currentPuzzle.pgn !== "PLACEMENT_TASK") {
          const cleanText = currentPuzzle.pgn
            .replace(/\[[^\]]+\]/g, "")
            .replace(/\d+\.+\s*/g, "")
            .trim();
          cleanMoves = cleanText
            .split(/\s+/)
            .filter((m) => m && !["1-0", "0-1", "1/2-1/2", "*"].includes(m));
        }
      }

      if (!startingFen) {
        startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      }

      game.current.load(startingFen);
      setFen(startingFen);
      setSolutionMoves(cleanMoves);
      setMoveFeedback(null);
      setShowHint(false);
      setPlayedMoves([]);
    } catch (e) {
      console.error("Error loading puzzle FEN:", e);
    }
  }, [currentPuzzleIdx, currentPuzzle]);

  const recordSolve = async (puzzleId: string) => {
    if (!studentProfile.id || !puzzleId) return;

    // Handle mock/demo student session updates entirely in local state (no DB write)
    if (studentProfile.id === "demo_student_id" || puzzleId.startsWith("demo")) {
      if (!solvedPuzzleIds.includes(puzzleId)) {
        setSolvedPuzzleIds((prev) => [...prev, puzzleId]);
        setStudentProfile((prev) => ({
          ...prev,
          fideRating: prev.fideRating + 10,
        }));
      }
      return;
    }

    try {
      const res = await fetch("/api/students/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: studentProfile.id,
          puzzleId: puzzleId,
          points: 10,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (!data.alreadySolved) {
            setStudentProfile((prev) => ({
              ...prev,
              fideRating: data.newRating,
            }));
            setSolvedPuzzleIds((prev) => [...prev, puzzleId]);
            fetchLeaderboard();
          }
        }
      }
    } catch (e) {
      console.error("Error recording puzzle solve:", e);
    }
  };

  const onPieceDrop = (source: string, target: string, piece: string): boolean => {
    const src = source.toLowerCase();
    const tgt = target.toLowerCase();

    const solutionMovesStr = currentPuzzle.pgn || "";
    if (solutionMovesStr === "PLACEMENT_TASK") {
      try {
        const p = game.current.get(src as any);
        if (p) {
          game.current.remove(src as any);
          game.current.put(p, tgt as any);
          setFen(game.current.fen());
          // Record placement task solves too!
          recordSolve(currentPuzzle.id);
          return true;
        }
      } catch (e) {}
      return false;
    }

    const expectedMoveSan = solutionMoves[playedMoves.length];

    if (!expectedMoveSan) {
      setMoveFeedback("🎉 Puzzle already solved!");
      return false;
    }

    try {
      // Test the move on a temp state
      const tempChess = new Chess(game.current.fen());
      const move = tempChess.move({ from: src, to: tgt, promotion: "q" });

      if (!move) {
        setMoveFeedback("⚠️ Invalid move. That is not a legal chess move.");
        return false;
      }

      const expectedClean = expectedMoveSan.replace(/[+#x=]/g, "").toLowerCase();
      const actualClean = move.san.replace(/[+#x=]/g, "").toLowerCase();
      const actualFromToClean = (move.from + move.to).toLowerCase();
      const expectedFromToClean = expectedMoveSan.replace(/[+#x=]/g, "").toLowerCase();

      const isMatch = (actualClean === expectedClean) || (actualFromToClean === expectedFromToClean);

      if (isMatch) {
        game.current.move({ from: src, to: tgt, promotion: "q" });
        setFen(game.current.fen());

        const newPlayedMoves = [...playedMoves, move.san];
        setPlayedMoves(newPlayedMoves);

        if (newPlayedMoves.length === solutionMoves.length) {
          setMoveFeedback("🎉 EXCELLENT MOVE! Tactical Checkmate Solution Verified!");
          recordSolve(currentPuzzle.id);
        } else {
          setMoveFeedback("🎉 Correct move! Keep going.");

          // Auto-play opponent response if solution continues
          const opponentMoveSan = solutionMoves[newPlayedMoves.length];
          if (opponentMoveSan) {
            setTimeout(() => {
              try {
                const opponentMove = game.current.move(opponentMoveSan);
                if (opponentMove) {
                  setFen(game.current.fen());
                  setPlayedMoves((prev) => [...prev, opponentMove.san]);
                }
              } catch (err) {
                console.error("Opponent play error:", err);
              }
            }, 600);
          }
        }
        return true;
      } else {
        setMoveFeedback("❌ Incorrect move. Try another continuation!");
        return false;
      }
    } catch (e) {
      setMoveFeedback("❌ Incorrect move. Try another continuation!");
      return false;
    }
  };

  const resetBoard = () => {
    try {
      let startingFen = currentPuzzle.fen;
      if (currentPuzzle.pgn) {
        const fenMatch = currentPuzzle.pgn.match(/\[FEN\s+"([^"]+)"\]/i);
        if (fenMatch && fenMatch[1]) {
          startingFen = fenMatch[1];
        }
      }
      if (!startingFen) {
        startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      }
      game.current.load(startingFen);
      setFen(startingFen);
      setMoveFeedback(null);
      setShowHint(false);
      setPlayedMoves([]);
    } catch (e) {
      console.error("Error resetting FEN:", e);
    }
  };

  const getCustomBoardColors = () => {
    switch (boardTheme) {
      case "wood":
        return { dark: "#b58863", light: "#f0d9b5" };
      case "midnight":
        return { dark: "#8ca2ad", light: "#dee3e6" };
      case "emerald":
      default:
        return { dark: "#769656", light: "#eeeed2" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Student Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ModernKnightLogo size="sm" variant="light" />
          <span className="px-3 py-1 bg-pink-900/60 text-pink-300 font-extrabold text-xs rounded-md border border-pink-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Student Tactical Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-slate-300 transition-colors"
          >
            Website Home
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/60 text-xs font-bold rounded-xl border border-rose-900/30 text-rose-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Student Nav Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-sm font-bold">
          {[
            { id: "dashboard", label: "👤 Student Dashboard" },
            { id: "arena", label: "⚔️ Grandmaster Puzzle Arena" },
            { id: "leaderboard", label: "🏆 Academy Leaderboard" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-[#0B4398] text-white font-extrabold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        {/* 1. DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Student Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0B4398] via-[#0052CC] to-[#E11D48] rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-white/30">
                  <Layers className="w-3.5 h-3.5" /> Assigned Batch: {studentProfile.batch}
                </span>
                <h1 className="text-3xl font-black">Welcome Back, {studentProfile.name}! 👋</h1>
                <p className="text-sm text-blue-100 max-w-md">
                  You have access to {accessiblePuzzles.length} tactical puzzles assigned to your batch!
                </p>
              </div>

              <button
                onClick={() => setActiveTab("arena")}
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
              >
                ⚔️ Open Grandmaster Arena ({accessiblePuzzles.length} Puzzles)
              </button>
            </div>

            {/* 1A. IF NO FOLDER SELECTED: SHOW FOLDERS LIST */}
            {!selectedFolder ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FolderIcon className="w-5 h-5 text-amber-400" /> Puzzles Library Folder ({studentProfile.batch})
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">Select a folder to begin solving</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accessibleFolders.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFolder(f)}
                      className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 cursor-pointer transition-all flex items-center justify-between gap-4 group shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                          <FolderIcon className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="font-black text-white text-sm tracking-wide">{f.name}</h4>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                              {f.puzzlesCount} Puzzles
                            </span>
                            <span className="text-[10px] text-amber-400 font-extrabold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
                              {f.solvedCount || 0} Solved
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* 1B. IF FOLDER SELECTED: SHOW PUZZLES WITHIN FOLDER */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Library
                    </button>
                    <span className="text-slate-600">/</span>
                    <span className="text-blue-400">📂 {selectedFolder.name}</span>
                  </div>
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Back to Library Folders
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accessiblePuzzles.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 font-extrabold rounded-md border border-emerald-500/30">
                          {p.level}
                        </span>
                        <span className="text-[11px] text-blue-400 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">
                          {p.assignedBatch || "All Batches"}
                        </span>
                      </div>

                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-extrabold text-white text-base flex-1">{p.title}</h4>
                        {solvedPuzzleIds.includes(p.id) && (
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                            Solved ✓
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPuzzleIdx(idx);
                          setActiveTab("arena");
                        }}
                        className={`w-full py-2.5 font-bold text-xs rounded-xl border transition-colors ${
                          solvedPuzzleIds.includes(p.id)
                            ? "bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/30"
                            : "bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                        }`}
                      >
                        {solvedPuzzleIds.includes(p.id) ? "Solved ✓ (Review)" : `Solve Puzzle #${idx + 1}`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Student Attendance Section */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                📅 Academy Attendance History
              </h3>
              {attendanceLogs.length === 0 ? (
                <p className="text-xs text-slate-500">No attendance logs recorded yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {attendanceLogs.map((log) => {
                    const dateFormatted = new Date(log.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const isPresent = log.status === "PRESENT";
                    const isAbsent = log.status === "ABSENT";
                    return (
                      <div
                        key={log.id}
                        className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                          isPresent
                            ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                            : isAbsent
                            ? "bg-rose-950/40 border-rose-500/30 text-rose-300"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-black block tracking-wider">
                          {log.status}
                        </span>
                        <span className="text-xs font-bold text-white block">{dateFormatted}</span>
                        {log.notes && (
                          <span className="text-[9px] text-slate-400 block italic truncate" title={log.notes}>
                            "{log.notes}"
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. GRANDMASTER PUZZLE ARENA TAB */}
        {activeTab === "arena" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Interactive Digital Grandmaster Chessboard */}
            <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5 shadow-2xl">
              {/* Piece Color Legend Bar (Clear Distinction) */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white border border-slate-900 shadow-md inline-block" />
                    <span className="font-extrabold text-white">White Pieces (YOUR SIDE)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-100 shadow-md inline-block" />
                    <span className="font-bold text-slate-400">Black Pieces (Opponent)</span>
                  </div>
                </div>

                {/* Theme Selector Dropdown */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] text-slate-400 font-bold">Theme:</span>
                  <select
                    value={boardTheme}
                    onChange={(e: any) => setBoardTheme(e.target.value)}
                    className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
                  >
                    <option value="emerald" className="bg-slate-900">
                      Emerald Tournament
                    </option>
                    <option value="wood" className="bg-slate-900">
                      Classic Wood
                    </option>
                    <option value="midnight" className="bg-slate-900">
                      Midnight Slate
                    </option>
                  </select>
                </div>
              </div>

              {/* Objective Banner */}
              <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 p-4 rounded-2xl border border-blue-500/30 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider rounded border border-emerald-500/40">
                      YOUR TURN • {puzzleTurn === "black" ? "Black" : "White"} to Move
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Puzzle #{currentPuzzleIdx + 1}</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{currentPuzzle.title}</h2>
                  <p className="text-xs text-blue-200 mt-1 font-medium">
                    👉 Drag and drop your pieces to solve this tactical puzzle.
                  </p>
                </div>
              </div>

              {/* 8x8 Board Container using react-chessboard */}
              <div className="relative max-w-lg mx-auto p-4 rounded-3xl bg-slate-950 border-4 border-slate-800 shadow-2xl">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner border border-slate-700">
                  <Chessboard
                    position={fen}
                    onPieceDrop={onPieceDrop}
                    boardWidth={440}
                    boardOrientation={puzzleTurn}
                    customDarkSquareStyle={{ backgroundColor: getCustomBoardColors().dark }}
                    customLightSquareStyle={{ backgroundColor: getCustomBoardColors().light }}
                  />
                </div>
              </div>

              {/* Feedback Banner */}
              {moveFeedback && (
                <div
                  className={`p-4 rounded-2xl text-xs font-extrabold text-center flex items-center justify-center gap-2 ${
                    moveFeedback.includes("EXCELLENT")
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30 shadow-lg"
                      : "bg-amber-950 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {moveFeedback.includes("EXCELLENT") ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  )}
                  <span>{moveFeedback}</span>
                </div>
              )}

              {/* Control Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-2.5 bg-amber-950 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 hover:bg-amber-900/60 transition-colors flex items-center gap-1.5"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  {showHint ? "Hide Hint" : "Get Hint"}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetBoard}
                    className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Board
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPuzzleIdx((prev) => (prev + 1) % accessiblePuzzles.length);
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    Next Puzzle <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-amber-300 font-medium leading-relaxed">
                  💡 <strong>Coach Hint:</strong>{" "}
                  {currentPuzzle.hint ||
                    currentPuzzle.solutionHint ||
                    "Look for deflection or checkmate moves!"}
                </div>
              )}
            </div>

            {/* Right Sidebar: Batch PGN Puzzle Selector & Moves Log */}
            <div className="lg:col-span-5 space-y-6">
              {/* Piece Color Legend Box */}
              <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-3 shadow-xl text-xs">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" /> Piece Identification Guide
                </h3>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                      <ChessPieceSvg type="n" color="w" className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white block">White Side</span>
                      <span className="text-[10px] text-emerald-400 font-bold">YOUR PIECES</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
                      <ChessPieceSvg type="k" color="b" className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-300 block">Black Side</span>
                      <span className="text-[10px] text-slate-500 font-bold">OPPONENT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Played Moves History Log Box */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  📜 Played Moves History
                </h3>
                {playedMoves.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs text-amber-300">
                    {playedMoves.map((mv, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-950 rounded-xl border border-slate-800">
                        {i + 1}. {mv}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Make your first move to begin recording your solution.</p>
                )}
              </div>

              {/* Batch Puzzle Selection Roster */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-white text-base">Batch Puzzle Roster</h3>
                  <span className="text-xs text-blue-400 font-mono font-bold bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-500/30">
                    {studentProfile.batch}
                  </span>
                </div>

                <div className="flex flex-col gap-2 pb-3 border-b border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Select Library Folder</span>
                  <select
                    value={selectedFolder?.id || (accessibleFolders[0]?.id || "")}
                    onChange={(e) => {
                      const f = accessibleFolders.find(x => x.id === e.target.value);
                      if (f) {
                        setSelectedFolder(f);
                        setCurrentPuzzleIdx(0);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {accessibleFolders.map((f) => (
                      <option key={f.id} value={f.id} className="bg-slate-900">
                        📂 {f.name} ({f.puzzlesCount} Puzzles)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                  {accessiblePuzzles.map((p, idx) => (
                    <button
                      key={p.id || idx}
                      onClick={() => setCurrentPuzzleIdx(idx)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between gap-3 ${
                        currentPuzzleIdx === idx
                          ? "bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-blue-500 text-white font-bold shadow-lg"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-extrabold uppercase text-amber-400 block">
                          Puzzle #{idx + 1} • {p.level}
                        </span>
                        <span className="text-xs font-bold text-white block truncate max-w-[180px]">
                          {p.title}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400 shrink-0">
                        {solvedPuzzleIds.includes(p.id) ? (
                          <span className="text-emerald-400 font-extrabold flex items-center gap-1">✓ Solved</span>
                        ) : currentPuzzleIdx === idx ? (
                          "Active ♟"
                        ) : (
                          "Solve ▶"
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. ACADEMY LEADERBOARD TAB */}
        {activeTab === "leaderboard" && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400 animate-bounce" /> Grandmaster Student Leaderboard
              </h2>
              <p className="text-xs text-slate-400">Rankings based on student FIDE rating and solved academy puzzles.</p>
            </div>

            {leaderboardLoading ? (
              <div className="text-slate-400 text-center py-8">Loading leaderboard rankings...</div>
            ) : leaderboardEntries.length === 0 ? (
              <div className="text-slate-500 text-center py-8">No students found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-black tracking-wider">
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Training Batch</th>
                      <th className="py-3 px-4 text-right">Solved Puzzles</th>
                      <th className="py-3 px-4 text-right">FIDE Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leaderboardEntries.map((student, idx) => {
                      const isSelf = student.id === studentProfile.id;
                      return (
                        <tr
                          key={student.id}
                          className={`hover:bg-slate-800 transition-colors ${
                            isSelf ? "bg-blue-950/40 font-bold border-l-4 border-blue-500" : ""
                          }`}
                        >
                          <td className="py-4 px-4 flex items-center gap-2">
                            {idx === 0 ? (
                              <span className="text-xl">🥇</span>
                            ) : idx === 1 ? (
                              <span className="text-xl">🥈</span>
                            ) : idx === 2 ? (
                              <span className="text-xl">🥉</span>
                            ) : (
                              <span className="w-5 text-center text-slate-400">{idx + 1}</span>
                            )}
                          </td>
                          <td className="py-4 px-4 font-extrabold text-white flex items-center gap-2">
                            {student.name}
                            {isSelf && (
                              <span className="px-2 py-0.5 bg-blue-500 text-white text-[9px] font-black uppercase rounded">
                                You
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-slate-300">{student.batch}</td>
                          <td className="py-4 px-4 text-right text-emerald-400 font-extrabold">
                            {student.solvedPuzzles?.length || 0}
                          </td>
                          <td className="py-4 px-4 text-right text-amber-400 font-black">
                            ⭐ {student.rating}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
