"use client";

import React, { useState, useEffect, useTransition, useMemo } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ArrowLeft, Lightbulb, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface Puzzle {
  id: string;
  title: string;
  pgn: string;
  fen?: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  solutionHint?: string;
  description?: string;
}

interface PuzzlePlayerProps {
  puzzle: Puzzle;
  studentId: string;
  onBack: (solved: boolean) => void;
}

export function PuzzlePlayer({ puzzle, studentId, onBack }: PuzzlePlayerProps) {
  const [game, setGame] = useState(new Chess());
  const [targetMoves, setTargetMoves] = useState<any[]>([]);
  const [currentMoveIdx, setCurrentMoveIdx] = useState(0);
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  
  const [status, setStatus] = useState<"PLAYING" | "SOLVED" | "FAILED">("PLAYING");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const startingFen = puzzle.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const tempGame = new Chess(startingFen);
    
    // Parse target PGN moves
    const targetGame = new Chess(startingFen);
    try {
      targetGame.loadPgn(puzzle.pgn);
    } catch (e) {
      console.error("Failed to parse target PGN:", e);
    }

    const moves = targetGame.history({ verbose: true });
    setTargetMoves(moves);
    setGame(tempGame);
    setCurrentMoveIdx(0);
    setStatus("PLAYING");
    setFeedback("");
    setShowHint(false);

    // Set board orientation based on the active color of the first move
    if (moves.length > 0) {
      setBoardOrientation(moves[0].color === "w" ? "white" : "black");
    }
  }, [puzzle]);

  // Handle computer's turn if opponent plays first or next
  useEffect(() => {
    if (status !== "PLAYING" || targetMoves.length === 0) return;

    const currentTargetMove = targetMoves[currentMoveIdx];
    if (!currentTargetMove) return;

    // Check if the current move color is opposite to student's color (orientation)
    const isOpponentMove = 
      (boardOrientation === "white" && currentTargetMove.color === "b") ||
      (boardOrientation === "black" && currentTargetMove.color === "w");

    if (isOpponentMove) {
      const timer = setTimeout(() => {
        try {
          game.move({
            from: currentTargetMove.from,
            to: currentTargetMove.to,
            promotion: currentTargetMove.promotion,
          });
          setGame(new Chess(game.fen()));
          
          if (currentMoveIdx + 1 >= targetMoves.length) {
            handlePuzzleSolved();
          } else {
            setCurrentMoveIdx((prev) => prev + 1);
          }
        } catch (err) {
          console.error("Opponent move execution error:", err);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentMoveIdx, targetMoves, boardOrientation, status]);

  const handlePuzzleSolved = async () => {
    setStatus("SOLVED");
    setFeedback("Amazing job! You solved the puzzle! 🎉");
    
    // Log attempt in the background
    try {
      await fetch("/api/puzzles/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          puzzleId: puzzle.id,
          solved: true,
        }),
      });
    } catch (e) {
      console.error("Error logging attempt:", e);
    }
  };

  const handleMove = (sourceSquare: string, targetSquare: string, piece: string) => {
    if (status !== "PLAYING") return false;

    const currentTargetMove = targetMoves[currentMoveIdx];
    if (!currentTargetMove) return false;

    // Check if it is opponent's turn to play
    const isOpponentMove = 
      (boardOrientation === "white" && currentTargetMove.color === "b") ||
      (boardOrientation === "black" && currentTargetMove.color === "w");

    if (isOpponentMove) return false;

    // Validate if played move matches the target PGN move
    const promotion = piece.toLowerCase().endsWith("p") ? undefined : piece[1]?.toLowerCase();
    const isCorrect = 
      sourceSquare === currentTargetMove.from && 
      targetSquare === currentTargetMove.to &&
      (!currentTargetMove.promotion || promotion === currentTargetMove.promotion);

    if (isCorrect) {
      try {
        game.move({
          from: sourceSquare as Square,
          to: targetSquare as Square,
          promotion: promotion as any,
        });
        setGame(new Chess(game.fen()));
        setFeedback("Good move! Keep going...");
        
        if (currentMoveIdx + 1 >= targetMoves.length) {
          handlePuzzleSolved();
        } else {
          setCurrentMoveIdx((prev) => prev + 1);
        }
        return true;
      } catch (e) {
        console.error(e);
      }
    } else {
      setFeedback("Incorrect move. Try another setup!");
      return false;
    }
    return false;
  };

  const handleRetry = () => {
    const startingFen = puzzle.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    setGame(new Chess(startingFen));
    setCurrentMoveIdx(0);
    setStatus("PLAYING");
    setFeedback("");
    setShowHint(false);
  };

  return (
    <div className="bg-[#1E1E4F]/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 max-w-4xl mx-auto shadow-2xl font-sans text-white animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => onBack(status === "SOLVED")}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <span
          className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
            puzzle.level === "BEGINNER"
              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
              : puzzle.level === "INTERMEDIATE"
              ? "bg-amber-950/80 text-amber-300 border border-amber-500/30"
              : "bg-purple-950/80 text-purple-300 border border-purple-500/30"
          }`}
        >
          {puzzle.level}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Interactive Chess Board */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-[360px] h-[360px] mx-auto overflow-hidden rounded-xl">
            <Chessboard
              position={game.fen()}
              onPieceDrop={handleMove}
              boardOrientation={boardOrientation}
              boardWidth={360}
              customDarkSquareStyle={{ backgroundColor: "#769656" }}
              customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
            />
          </div>

          <div className="flex gap-4 w-full max-w-[380px]">
            <button
              onClick={handleRetry}
              className="flex-1 py-2.5 px-4 bg-slate-900/60 hover:bg-[#1E1E4F]/60 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> Restart
            </button>
            {puzzle.solutionHint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex-1 py-2.5 px-4 bg-[#FF6B00]/15 hover:bg-[#FF6B00]/25 text-[#FF6B00] font-bold text-xs rounded-xl border border-[#FF6B00]/20 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Lightbulb className="w-4 h-4" /> {showHint ? "Hide Hint" : "Reveal Hint"}
              </button>
            )}
          </div>
        </div>

        {/* Right: Info and Interactive feedback */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white leading-tight">
              {puzzle.title}
            </h2>
            {puzzle.description && (
              <p className="text-xs text-blue-300/80 font-bold leading-relaxed">
                {puzzle.description}
              </p>
            )}
          </div>

          {feedback && (
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-bold ${
                status === "SOLVED"
                  ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
                  : feedback.includes("Incorrect")
                  ? "bg-rose-950/60 border-rose-500/30 text-rose-300"
                  : "bg-slate-950 border-slate-850 text-slate-300"
              }`}
            >
              {status === "SOLVED" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertCircle className={`w-5 h-5 flex-shrink-0 ${feedback.includes("Incorrect") ? "text-rose-450" : "text-blue-400"}`} />
              )}
              <span>{feedback}</span>
            </div>
          )}

          {showHint && puzzle.solutionHint && (
            <div className="p-4 bg-amber-950/40 border border-amber-500/20 text-amber-300 text-xs font-semibold rounded-xl leading-relaxed animate-in fade-in duration-200">
              💡 Hint: {puzzle.solutionHint}
            </div>
          )}

          <div className="bg-[#0B0B26] p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
              Solve Progress
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold">Moves Completed:</span>
              <span className="font-extrabold text-white">
                {Math.ceil(currentMoveIdx / 2)} / {Math.ceil(targetMoves.length / 2)}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FF6B00] to-orange-500 h-full transition-all duration-300"
                style={{
                  width: `${
                    targetMoves.length > 0 ? (currentMoveIdx / targetMoves.length) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
