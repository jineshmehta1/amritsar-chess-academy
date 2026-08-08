"use client";

import React from "react";
import { Trash2, Plus, Minus, Target, RefreshCw } from "lucide-react";

type Tool = null | "TRASH" | "PLUS" | "MINUS" | "TARGET" | { type: string; color: string };

interface BoardSetupPaletteProps {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  onClear: () => void;
  onReset: () => void;
  onClearArrows?: () => void;
  showSpecialTools?: boolean;
}

export function BoardSetupPalette({
  selectedTool,
  setSelectedTool,
  onClear,
  onReset,
  showSpecialTools = true,
}: BoardSetupPaletteProps) {
  const pieces = [
    { type: "p", color: "w", label: "♙" },
    { type: "n", color: "w", label: "♘" },
    { type: "b", color: "w", label: "♗" },
    { type: "r", color: "w", label: "♖" },
    { type: "q", color: "w", label: "♕" },
    { type: "k", color: "w", label: "♔" },
    { type: "p", color: "b", label: "♟" },
    { type: "n", color: "b", label: "♞" },
    { type: "b", color: "b", label: "♝" },
    { type: "r", color: "b", label: "♜" },
    { type: "q", color: "b", label: "♛" },
    { type: "k", color: "b", label: "♚" },
  ];

  const isPieceSelected = (type: string, color: string) => {
    return (
      typeof selectedTool === "object" &&
      selectedTool !== null &&
      selectedTool.type === type &&
      selectedTool.color === color
    );
  };

  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
      {/* Pieces grid */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Place Pieces
        </span>
        <div className="grid grid-cols-6 gap-2">
          {pieces.map((piece) => (
            <button
              key={`${piece.color}-${piece.type}`}
              type="button"
              onClick={() => setSelectedTool({ type: piece.type, color: piece.color })}
              className={`h-11 rounded-xl text-2xl flex items-center justify-center transition-all ${
                isPieceSelected(piece.type, piece.color)
                  ? "bg-[#FF6B00] text-white scale-105 border border-orange-400"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-850"
              }`}
            >
              {piece.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editing Tools */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-900">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSelectedTool("TRASH")}
            className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              selectedTool === "TRASH"
                ? "bg-rose-600 text-white"
                : "bg-slate-900 text-rose-450 hover:bg-slate-800 border border-slate-855"
            }`}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>

          {showSpecialTools && (
            <>
              <button
                type="button"
                onClick={() => setSelectedTool("PLUS")}
                className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                  selectedTool === "PLUS"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-slate-850"
                }`}
              >
                <Plus className="w-4 h-4" /> Plus Sign
              </button>

              <button
                type="button"
                onClick={() => setSelectedTool("MINUS")}
                className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                  selectedTool === "MINUS"
                    ? "bg-rose-600 text-white"
                    : "bg-slate-900 text-rose-450 hover:bg-slate-800 border border-slate-855"
                }`}
              >
                <Minus className="w-4 h-4" /> Minus Sign
              </button>

              <button
                type="button"
                onClick={() => setSelectedTool("TARGET")}
                className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                  selectedTool === "TARGET"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-blue-455 hover:bg-slate-800 border border-slate-855"
                }`}
              >
                <Target className="w-4 h-4" /> Target Sq
              </button>
            </>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClear}
            className="px-3 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-xl border border-slate-850 transition-colors"
          >
            Clear Board
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-xl border border-slate-850 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset Layout
          </button>
        </div>
      </div>
    </div>
  );
}
