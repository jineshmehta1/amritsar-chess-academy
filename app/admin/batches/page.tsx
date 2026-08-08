"use client";

import React, { useState, useEffect } from "react";
import { Plus, Layers, Trash2 } from "lucide-react";

interface Batch {
  id: string;
  name: string;
  _count?: {
    students: number;
    puzzles: number;
  };
}

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [newBatchName, setNewBatchName] = useState("");
  const [batchError, setBatchError] = useState("");

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const res = await fetch("/api/batches");
      if (res.ok) setBatches(await res.json());
    } catch (e) {
      console.error("Error fetching batches:", e);
    }
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setBatchError("");

    if (!newBatchName.trim()) return;

    try {
      const res = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBatchName.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setNewBatchName("");
        fetchBatches();
      } else {
        setBatchError(data.error || "Failed to create batch");
      }
    } catch (e) {
      setBatchError("Failed to create batch");
    }
  };

  const handleDeleteBatch = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete batch "${name}"?`)) return;
    try {
      const res = await fetch(`/api/batches?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchBatches();
      } else {
        alert("Failed to delete batch");
      }
    } catch (e) {
      alert("Error deleting batch");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Create Batch Form */}
      <div className="bg-[#1E1E4F]/40 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 h-fit space-y-4 shadow-sm">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#FF6B00]" /> Create New Batch
        </h3>

        {batchError && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/30 text-rose-350 text-xs font-bold rounded-xl text-center">
            {batchError}
          </div>
        )}

        <form onSubmit={handleCreateBatch} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Batch Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Master Class B"
              value={newBatchName}
              onChange={(e) => setNewBatchName(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FF6B00] hover:bg-[#E66000] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
          >
            Create Batch
          </button>
        </form>
      </div>

      {/* Batches List */}
      <div className="lg:col-span-2 bg-[#1E1E4F]/40 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 space-y-4 shadow-sm">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#FF6B00]" /> Study Batches
        </h3>

        {batches.length === 0 ? (
          <div className="p-8 text-center text-slate-450 text-xs font-bold border border-slate-800 rounded-2xl bg-[#0B0B26]/30">
            No study groups created yet.
          </div>
        ) : (
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0B0B26]/60 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1E1E4F]/60 border-b border-slate-800 text-slate-305 font-bold uppercase tracking-wider">
                  <th className="p-4">Batch Name</th>
                  <th className="p-4 text-center">Total Students</th>
                  <th className="p-4 text-center">Assigned Puzzles</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-semibold text-slate-200">
                {batches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-[#1E1E4F]/30 transition-colors">
                    <td className="p-4 text-white font-bold">{batch.name}</td>
                    <td className="p-4 text-center text-slate-450 font-semibold">
                      {batch._count?.students || 0}
                    </td>
                    <td className="p-4 text-center text-slate-450 font-semibold">
                      {batch._count?.puzzles || 0}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteBatch(batch.id, batch.name)}
                        className="p-1.5 text-slate-450 hover:text-rose-500 hover:bg-rose-950/40 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
