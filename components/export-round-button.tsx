"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ExportRoundButton({ round, tournamentName }: { round: any, tournamentName: string }) {
  const exportRoundResults = () => {
    if (!round || !round.pairings) return;

    const headers = ["Board", "White", "Result", "Black"];
    const csvContent = [
      headers.join(","),
      ...round.pairings.map((p: any, i: number) => 
        [
          i + 1, 
          `"${p.p1?.name || ''}"`, 
          p.p2 === null ? "BYE" : (p.result || "Pending"),
          p.p2 ? `"${p.p2.name}"` : ""
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${tournamentName.replace(/\s+/g, '_')}_round_${round.roundNumber}_results.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="ghost" size="sm" onClick={exportRoundResults} className="h-8 text-slate-500 hover:text-[#FF6B00]">
      <Download className="w-4 h-4 mr-1" />
      Export
    </Button>
  );
}
