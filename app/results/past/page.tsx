"use client"

import React, { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Trophy, Calendar, ArrowLeft, Search, Target, Zap, Medal } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface WinnerProps {
  name: string
  prize: string
  image: string
  initials: string
  place: "1st" | "2nd" | "3rd"
  division: string
}

function WinnerCard({ name, prize, image, initials, place, division }: WinnerProps) {
  const [imgError, setImgError] = useState(false)

  const prizeLabel = {
    "1st": "CHAMPION",
    "2nd": "RUNNER UP",
    "3rd": "3RD PLACE",
  }[place]

  const IconComponent = {
    "1st": Target,
    "2nd": Zap,
    "3rd": Medal,
  }[place]

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative bg-[#12123D] rounded-[2.5rem] pt-8 pb-10 px-6 shadow-2xl flex flex-col items-center border border-slate-800 overflow-hidden"
    >
      {/* Decorative Background Trophy Watermark */}
      <Trophy className="absolute top-8 left-6 w-20 h-20 text-white/5 pointer-events-none" />

      {/* Image Container with White Border */}
      <div className="relative w-full max-w-[220px] aspect-[4/5] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl bg-[#1b1b57] flex items-center justify-center text-white/20 font-black text-4xl shrink-0 z-10">
        {!imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="uppercase text-slate-500/50">{initials}</span>
        )}
      </div>

      {/* Text Content */}
      <div className="mt-8 text-center flex flex-col items-center space-y-4 w-full z-10">
        <div className="space-y-1">
          <h4 className="text-xl md:text-2xl font-black text-white leading-tight tracking-wide uppercase px-2">
            {name}
          </h4>
          <p className="text-[#FF6B00] text-xs font-black uppercase tracking-[0.2em]">
            {division}
          </p>
        </div>

        <div className="w-16 h-px bg-white/10" />

        <div className="flex flex-col items-center gap-2">
          <IconComponent className="w-7 h-7 text-[#FF6B00]" />
          <h3 className="text-white text-2xl font-black uppercase tracking-wider leading-none">
            {prizeLabel}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

export default function PastResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const tournaments = [
    {
      id: "u11-july-2026",
      name: "Amritsar Chess Club Under 11 Tournament",
      date: "19 July 2026",
      location: "Amritsar Chess Club Main Arena",
      division: "Under 11",
      description: "Championship for players under 11 years of age, featuring chess tactics and blitz match-ups.",
      winners: [
        {
          name: "Krishaang Gupta",
          prize: "First Prize Winner",
          image: "/111.jpeg",
          initials: "KG",
          place: "1st" as const,
          division: "Under 11",
        },
        {
          name: "Puranjot Singh",
          prize: "Second Prize Winner",
          image: "/112.jpeg",
          initials: "PS",
          place: "2nd" as const,
          division: "Under 11",
        },
        {
          name: "Devarsh",
          prize: "Third Prize Winner",
          image: "/113.jpeg",
          initials: "D",
          place: "3rd" as const,
          division: "Under 11",
        },
      ],
    },
    {
      id: "u17-july-2026",
      name: "Amritsar Chess Club Under 17 Tournament",
      date: "19 July 2026",
      location: "Amritsar Chess Club Main Arena",
      division: "Under 17",
      description: "Elite tournament for teenage players under 17 to display mastery, depth of plan, and endurance.",
      winners: [
        {
          name: "Manraj Singh",
          prize: "First Prize Winner",
          image: "/171.jpeg",
          initials: "MS",
          place: "1st" as const,
          division: "Under 17",
        },
        {
          name: "Prabnoor Singh",
          prize: "Second Prize Winner",
          image: "/172.jpeg",
          initials: "PS",
          place: "2nd" as const,
          division: "Under 17",
        },
        {
          name: "Jaskaran Singh & Devgya",
          prize: "Third Prize Winner (Shared)",
          image: "/173.jpeg",
          initials: "JD",
          place: "3rd" as const,
          division: "Under 17",
        },
      ],
    },
  ]

  const filteredTournaments = tournaments.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.division.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-12">
          {/* Header & Back Button */}
          <div className="space-y-4">
            <Link
              href="/results"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#FF6B00] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Live Results
            </Link>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-[#FF6B00] rounded-full px-4 py-1.5 text-sm font-bold mb-2">
                <Trophy className="w-4 h-4" />
                Past Championship Standings
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#12123D] tracking-tight">
                Tournament Hall of Fame
              </h1>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Celebrating the victories and honoring the champions of the Amritsar Chess Club.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all bg-white font-medium text-slate-700 shadow-sm"
            />
          </div>

          {/* Tournaments List */}
          <div className="space-y-16">
            {filteredTournaments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 font-bold">No past tournaments matched your search.</p>
              </div>
            ) : (
              filteredTournaments.map((tourney) => (
                <section
                  key={tourney.id}
                  className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 space-y-8 animate-fadeIn"
                >
                  {/* Title & Banner Info */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-100 text-[#FF6B00] text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                          {tourney.division}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold">Location: {tourney.location}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-[#12123D]">{tourney.name}</h2>
                    </div>

                    <div className="flex items-center gap-2 bg-[#12123D] text-white px-4 py-2 rounded-full font-bold text-xs shadow-md">
                      <Calendar className="w-4 h-4 text-[#FF6B00]" />
                      <span>{tourney.date}</span>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tourney.winners.map((winner, idx) => (
                      <WinnerCard key={idx} {...winner} />
                    ))}
                  </div>

                  {/* Group Photo */}
                  <div className="pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                      <h4 className="font-black text-[#12123D] text-xs uppercase tracking-wider">Tournament Group Photo</h4>
                    </div>
                    <div className="rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-sm bg-slate-50 max-h-[500px]">
                      <img
                        src={tourney.id === "u11-july-2026" ? "/g11.jpeg" : "/g17.jpeg"}
                        alt={`${tourney.name} Group Photo`}
                        className="w-full h-auto object-cover max-h-[500px] hover:scale-[1.01] transition-transform duration-500"
                      />
                    </div>
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
