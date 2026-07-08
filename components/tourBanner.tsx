"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, Trophy, Swords, Calendar } from "lucide-react"

export default function TournamentHero() {
  const whatsappNumber = "919592004076"

  return (
    <section className="relative h-[85vh] min-h-[100vh] w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=80&w=2070&auto=format&fit=crop')`, // Background showing chess board/clock focus
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Deep Overlay */}
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black/90 via-transparent to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8"
        >
          {/* Top Label */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#2b5292]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-zinc-300">
              Amritsar Chess Club • Competitive Arena
            </span>
            <span className="w-8 h-[1px] bg-[#2b5292]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-[1.1]">
            Master the Arena, <br />
            <span className="font-sans not-italic font-light tracking-wide text-zinc-200">
              Rule the Board.
            </span>
          </h1>

          {/* Refined Body Text */}
          <p className="max-w-3xl mx-auto text-sm md:text-lg text-zinc-400 font-light tracking-wide leading-relaxed">
            The ultimate test of skill, nerves, and strategy. Join the most prestigious 
            tournaments in Amritsar and challenge yourself against the best minds. 
            From local championships to FIDE-rated events, your path to glory starts here.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
            {/* Primary Action */}
            <motion.button
              onClick={() => document.getElementById('upcoming-tournaments')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2b5292] hover:bg-[#1e3a6d] text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-2xl"
            >
              <Swords size={18} />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                View Schedule
              </span>
            </motion.button>

            {/* WhatsApp Integration */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300"
            >
              <MessageCircle size={18} className="text-green-400" />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Register via WhatsApp
              </span>
            </motion.a>
          </div>

          {/* Tournament Highlights */}
          <div className="flex flex-wrap justify-center gap-8 pt-10 border-t border-white/10 w-full max-w-2xl">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-[#2b5292]" />
              <span className="text-[10px] md:text-xs tracking-widest uppercase text-zinc-300">Monthly Rapid Events</span>
            </div>
            <div className="flex items-center gap-3">
              <Trophy size={16} className="text-[#2b5292]" />
              <span className="text-[10px] md:text-xs tracking-widest uppercase text-zinc-300">Cash Prizes & Ratings</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-40" />
    </section>
  )
}