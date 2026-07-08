"use client"

import React from "react"
import { motion } from "framer-motion"
import { ChevronRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function AboutHero() {

  return (
    <section className="relative h-[85vh] min-h-[100vh] w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=2070&auto=format&fit=crop')`, // Professional dark chess background
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Deep Overlay: Darker at the top and bottom for text clarity */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-transparent to-black/70" />
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
              Amritsar Chess Club • Est. 2010
            </span>
            <span className="w-8 h-[1px] bg-[#2b5292]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-[1.1]">
            From the Golden City <br />
            <span className="font-sans not-italic font-light tracking-wide text-zinc-200">
              To the Global Stage.
            </span>
          </h1>

          {/* Refined Body Text */}
          <p className="max-w-3xl mx-auto text-sm md:text-lg text-zinc-400 font-light tracking-wide leading-relaxed">
            Amritsar's premier destination for strategic mastery. We don't just teach 
            the game of kings; we nurture the intellectual leaders and 
            grandmasters of tomorrow through discipline, logic, and passion.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
            {/* Primary Action */}
            <Link href="/curriculum">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2b5292] hover:bg-[#1e3a6d] text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-2xl"
            >
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Explore Our Programs
              </span>
              <ChevronRight size={18} />
            </motion.button>
            </Link>

            <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300"
            >
              <MessageCircle size={18} className="text-green-400" />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Contact Coach
              </span>
            </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  )
}