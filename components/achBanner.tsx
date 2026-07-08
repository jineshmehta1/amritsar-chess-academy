"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, Trophy, Medal, Star } from "lucide-react"
import { useBookDemo } from "@/components/BookDemoProvider"

export default function AchievementHero() {
  const { openBookDemoModal } = useBookDemo()

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 pb-12 md:pt-20 md:pb-0">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/achbg.avif')`, 
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Deep Overlay */}
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6 md:space-y-8"
        >
          {/* Top Label */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-4 md:w-8 h-[1px] bg-[#2b5292]" />
            <span className="text-[8px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-zinc-300">
              Amritsar Chess Club • Legacy of Triumph
            </span>
            <span className="w-4 md:w-8 h-[1px] bg-[#2b5292]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-[1.2] md:leading-[1.1] px-2">
            Celebrating Milestones, <br className="hidden sm:block" />
            <span className="font-sans not-italic font-light tracking-wide text-zinc-200">
              Defining Excellence.
            </span>
          </h1>

          {/* Refined Body Text */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-lg text-zinc-400 font-light tracking-wide leading-relaxed px-4">
            From local tournaments to national championships, our wall of fame 
            tells the story of dedication. Since 2010, 
            we have nurtured over 500+ players into recognized champions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 pt-4 md:pt-6 w-full sm:w-auto px-6 sm:px-0">
            {/* Primary Action */}
            <motion.button
              onClick={() => document.getElementById('achievements-grid')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#2b5292] hover:bg-[#1e3a6d] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl"
            >
              <Trophy className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase">
                View Hall of Fame
              </span>
            </motion.button>

            {/* WhatsApp Integration */}
            <motion.button
              onClick={openBookDemoModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              <span className="text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase">
                Start Your Journey
              </span>
            </motion.button>
          </div>

          {/* Achievement Quick Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-10 pt-10 md:pt-12 border-t border-white/10 w-full max-w-3xl">
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <Medal className="text-[#2b5292] w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold font-serif">50+</span>
                <span className="text-[7px] md:text-[9px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-zinc-400 font-bold leading-none">State Titles</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-2 border-x border-white/5 md:border-none px-2">
              <Star className="text-[#2b5292] w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold font-serif">14+</span>
                <span className="text-[7px] md:text-[9px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-zinc-400 font-bold leading-none">Years Legacy</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <Trophy className="text-[#2b5292] w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold font-serif">200+</span>
                <span className="text-[7px] md:text-[9px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-zinc-400 font-bold leading-none">Trophies</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-60" />
    </section>
  )
}