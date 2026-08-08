"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Puzzle as PuzzleIcon,
  Trash2,
  Filter,
  Edit3,
  Folder as FolderIcon,
  FolderPlus,
  ArrowLeft,
  ArrowRight,
  Layers,
} from "lucide-react";
import { PuzzleCreator } from "@/components/PuzzleCreator";

interface Puzzle {
  id: string;
  title: string;
  pgn: string;
  fen?: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  assignedBatch: string;
  solutionHint?: string;
  description?: string;
  folderId?: string;
}

interface Batch {
  id: string;
  name: string;
}

interface PuzzleFolder {
  id: string;
  name: string;
  _count?: {
    puzzles: number;
  };
}

export default function AdminPuzzlesPage() {
  const [folders, setFolders] = useState<PuzzleFolder[]>([]);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(false);

  // Folder navigation state
  const [selectedFolder, setSelectedFolder] = useState<PuzzleFolder | null>(null);

  // Folder creation state
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Filters
  const [puzzleFilter, setPuzzleFilter] = useState<"ALL" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED">("ALL");
  const [batchFilter, setBatchFilter] = useState<string>("ALL");

  // Puzzle Creator State
  const [creatorMode, setCreatorMode] = useState<"NONE" | "CREATE" | "EDIT">("NONE");
  const [editingPuzzle, setEditingPuzzle] = useState<Puzzle | null>(null);

  useEffect(() => {
    fetchFolders();
    fetchBatches();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      fetchPuzzlesForFolder(selectedFolder.id);
    } else {
      setPuzzles([]);
    }
  }, [selectedFolder]);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/puzzles/folders");
      if (res.ok) setFolders(await res.json());
    } catch (e) {
      console.error("Error fetching folders:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch("/api/batches");
      if (res.ok) setBatches(await res.json());
    } catch (e) {
      console.error("Error fetching batches:", e);
    }
  };

  const fetchPuzzlesForFolder = async (folderId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/puzzles?folderId=${folderId}`);
      if (res.ok) setPuzzles(await res.json());
    } catch (e) {
      console.error("Error fetching folder puzzles:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      const res = await fetch("/api/puzzles/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFolderName.trim() }),
      });
      if (res.ok) {
        setNewFolderName("");
        setShowCreateFolder(false);
        fetchFolders();
      } else {
        alert("Failed to create folder");
      }
    } catch (e) {
      alert("Error creating folder");
    }
  };

  const handleDeleteFolder = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete folder "${name}"? This will delete all puzzles inside.`)) return;

    try {
      const res = await fetch(`/api/puzzles/folders?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchFolders();
        if (selectedFolder?.id === id) {
          setSelectedFolder(null);
        }
      } else {
        alert("Failed to delete folder");
      }
    } catch (e) {
      alert("Error deleting folder");
    }
  };

  const handleDeletePuzzle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete puzzle "${title}"?`)) return;
    try {
      const res = await fetch(`/api/puzzles?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedFolder) fetchPuzzlesForFolder(selectedFolder.id);
        fetchFolders();
      } else {
        alert("Failed to delete puzzle");
      }
    } catch (e) {
      alert("Error deleting puzzle");
    }
  };

  const filteredPuzzles = useMemo(() => {
    return puzzles.filter((p) => {
      const matchTier = puzzleFilter === "ALL" ? true : p.level === puzzleFilter;
      const matchBatch =
        batchFilter === "ALL"
          ? true
          : (p.assignedBatch || "All Batches").toLowerCase() === batchFilter.toLowerCase();
      return matchTier && matchBatch;
    });
  }, [puzzles, puzzleFilter, batchFilter]);

  if (creatorMode !== "NONE") {
    return (
      <div className="max-w-7xl w-full mx-auto">
        <PuzzleCreator
          folderId={selectedFolder?.id}
          existingPuzzle={editingPuzzle}
          batches={batches}
          onBack={() => {
            setCreatorMode("NONE");
            setEditingPuzzle(null);
            if (selectedFolder) {
              fetchPuzzlesForFolder(selectedFolder.id);
            }
            fetchFolders();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <PuzzleIcon className="w-6 h-6 text-[#FF6B00]" /> Tactical Puzzle Folders
          </h2>
          <div className="flex items-center gap-2 text-xs text-blue-300/80 mt-1 font-semibold">
            <button
              onClick={() => setSelectedFolder(null)}
              className="hover:text-white transition-colors"
            >
              📁 Library
            </button>
            {selectedFolder && (
              <>
                <span className="text-slate-500">/</span>
                <span className="text-[#FF6B00]">📂 {selectedFolder.name}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedFolder ? (
            <>
              <button
                onClick={() => setSelectedFolder(null)}
                className="px-4 py-2.5 bg-[#1E1E4F]/80 hover:bg-[#252561] text-white border border-slate-800 flex items-center gap-2 font-bold text-xs rounded-xl transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Library
              </button>
              <button
                onClick={() => {
                  setEditingPuzzle(null);
                  setCreatorMode("CREATE");
                }}
                className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/10 flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" /> Create PGN Puzzle
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowCreateFolder(!showCreateFolder)}
              className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/10 flex items-center gap-2 transition-all"
            >
              <FolderPlus className="w-4 h-4" /> Create Folder
            </button>
          )}
        </div>
      </div>

      {!selectedFolder ? (
        <div className="space-y-6">
          {showCreateFolder && (
            <form
              onSubmit={handleCreateFolder}
              className="bg-[#1E1E4F]/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center gap-4 animate-in fade-in duration-200 shadow-sm"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter new folder name (e.g. Checkmate Patterns, Endgame Tactics)..."
                  className="w-full bg-[#0B0B26] border border-slate-800 focus:border-[#FF6B00] rounded-xl p-3.5 text-xs text-white font-bold outline-none transition-colors"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3.5 bg-[#FF6B00] hover:bg-[#E66000] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
              >
                Save Folder
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateFolder(false);
                  setNewFolderName("");
                }}
                className="px-4 py-3.5 bg-slate-900/60 hover:bg-slate-800 text-slate-350 border border-slate-800 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
            </form>
          )}

          {loading ? (
            <div className="text-center p-12 bg-[#1E1E4F]/20 rounded-2xl border border-slate-800 text-slate-450 font-bold text-xs">
              Loading libraries...
            </div>
          ) : folders.length === 0 ? (
            <div className="p-12 text-center bg-[#1E1E4F]/40 backdrop-blur-md rounded-3xl border border-slate-800 space-y-4 shadow-sm">
              <FolderIcon className="w-16 h-16 text-slate-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-extrabold text-white text-base">Your Chess Library is Empty</h3>
                <p className="text-xs text-slate-400 font-bold">Create a folder to begin organizing checkmate or endgame puzzles.</p>
              </div>
              <button
                onClick={() => setShowCreateFolder(true)}
                className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                Create First Folder
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder)}
                  className="bg-[#1E1E4F]/40 hover:bg-[#1E1E4F]/70 p-6 rounded-2xl border border-slate-800/85 hover:border-[#FF6B00]/40 hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-4 group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-xl flex items-center justify-center border border-[#FF6B00]/20 group-hover:scale-105 transition-transform">
                      <FolderIcon className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-sm tracking-wide">{folder.name}</h4>
                      <span className="text-[10px] text-emerald-400 font-extrabold bg-[#0B0B26]/60 px-2 py-0.5 rounded border border-slate-800/40 inline-block mt-1">
                        {folder._count?.puzzles || 0} Puzzles
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteFolder(folder.id, folder.name, e)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-950/40 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      title="Delete Folder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-slate-450 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filters */}
          <div className="bg-[#1E1E4F]/40 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setPuzzleFilter(tier)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    puzzleFilter === tier
                      ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/10 font-extrabold"
                      : "bg-[#0B0B26] text-slate-450 hover:text-white border border-slate-800"
                  }`}
                >
                  {tier === "ALL" ? "All Tiers" : tier}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-[#0B0B26] px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400 font-bold">Filter Batch:</span>
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Batches</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full p-8 text-center bg-[#1E1E4F]/40 rounded-2xl border border-slate-800 text-slate-450 font-bold text-xs shadow-sm">
                Loading Puzzles...
              </div>
            ) : filteredPuzzles.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-[#1E1E4F]/40 rounded-2xl border border-slate-800 text-slate-450 font-bold text-xs shadow-sm">
                No puzzles match the selected difficulty or batch.
              </div>
            ) : (
              filteredPuzzles.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#1E1E4F]/40 backdrop-blur-md rounded-2xl p-6 border border-slate-800/80 space-y-4 relative flex flex-col justify-between hover:border-[#FF6B00]/40 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                          p.level === "BEGINNER"
                            ? "bg-emerald-950/80 text-emerald-450 border border-emerald-500/30"
                            : p.level === "INTERMEDIATE"
                            ? "bg-amber-950/80 text-amber-450 border border-amber-500/30"
                            : "bg-purple-950/80 text-purple-450 border border-purple-500/30"
                        }`}
                      >
                        {p.level}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-blue-300 font-bold bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-900/40 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-blue-500" />
                          {p.assignedBatch || "All Batches"}
                        </span>
                        <button
                          onClick={() => {
                            setEditingPuzzle(p);
                            setCreatorMode("EDIT");
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-900/60 rounded-lg transition-all"
                          title="Edit Puzzle"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePuzzle(p.id, p.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-950/40 rounded-lg transition-all"
                          title="Delete Puzzle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-white text-base leading-snug">{p.title}</h3>
                    {p.solutionHint && (
                      <p className="mt-3 text-xs text-amber-450 font-medium">
                        💡 Hint: {p.solutionHint}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
