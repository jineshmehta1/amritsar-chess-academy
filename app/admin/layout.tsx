"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Puzzle as PuzzleIcon, Users, Layers, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

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

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin" || pathname.startsWith("/admin/puzzles");
    }
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#0B0B26] text-white flex flex-col font-sans p-6 md:p-10">
      <div className="max-w-7xl w-full mx-auto space-y-8">
        {/* Header bar */}
        <div className="flex flex-wrap justify-between items-center bg-[#1E1E4F]/40 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 gap-4 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-3xl font-black bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">
              Admin Control Panel
            </h1>
            <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">
              Amritsar Chess Club
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-[#0B0B26]/60 p-1 rounded-2xl border border-slate-800/60">
              <Link
                href="/admin"
                className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive("/admin")
                    ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <PuzzleIcon className="w-4 h-4" /> Puzzles
              </Link>
              <Link
                href="/admin/students"
                className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive("/admin/students")
                    ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" /> Students
              </Link>
              <Link
                href="/admin/batches"
                className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive("/admin/batches")
                    ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4" /> Batches
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="p-2.5 bg-slate-900/65 border border-slate-800 hover:bg-[#1E1E4F]/60 text-rose-450 hover:text-rose-400 rounded-2xl flex items-center gap-2 text-xs font-extrabold transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Child Pages */}
        <div>{children}</div>
      </div>
    </div>
  );
}
