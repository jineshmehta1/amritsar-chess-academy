"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Cpu, Brain, Sparkles, Zap, BarChart3, Target, Trophy } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamic import to avoid SSR issues with chess board
const AnalysisBoard = dynamic(() => import("@/components/AnalysisBoard"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">
        <div className="flex gap-3 justify-center lg:justify-start">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-8 rounded-full bg-slate-800/50 animate-pulse" style={{ height: "560px" }} />
          </div>
          <div
            className="bg-slate-800/50 rounded-2xl animate-pulse"
            style={{ width: "min(70vw, 560px)", height: "min(70vw, 560px)" }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-20 bg-slate-800/50 rounded-2xl animate-pulse" />
          <div className="h-64 bg-slate-800/50 rounded-2xl animate-pulse" />
          <div className="h-24 bg-slate-800/50 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  ),
})

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative w-full pt-28 md:pt-36 pb-16 overflow-hidden bg-[#12123D]">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6B00]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 mb-6"
          >
            <div className="flex items-center gap-1 bg-[#FF6B00] rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
              <Zap className="w-3 h-3" />
              Free
            </div>
            <span className="text-white/70 text-xs font-bold">Powered by Stockfish 16 Engine</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tighter"
          >
            Analysis{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9F4A]">
              Board
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed"
          >
            Analyze your chess games with one of the world&apos;s strongest engines.
            Get real-time evaluation, best move suggestions, and deep analysis — all running in your browser.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Cpu, label: "Stockfish 16 WASM" },
              { icon: Brain, label: "Depth 30 Analysis" },
              { icon: BarChart3, label: "Multi-Line PV" },
              { icon: Target, label: "Import PGN/FEN" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
              >
                <feature.icon className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-white/70 text-xs font-bold">{feature.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 25C672 30 768 30 864 25C960 20 1056 10 1152 12.5C1248 15 1344 30 1392 37.5L1440 45V60H0Z" fill="#0A0A2E" />
          </svg>
        </div>
      </section>

      {/* ANALYSIS BOARD SECTION */}
      <section className="w-full bg-[#0A0A2E] py-12 md:py-16">
        <AnalysisBoard />
      </section>

      {/* HOW TO USE SECTION */}
      <section className="w-full bg-[#0A0A2E] pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.3em] mb-3">How It Works</p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Analyze Like a Grandmaster
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Play or Import",
                desc: "Make moves on the board, or import a PGN/FEN from any chess platform like Chess.com or Lichess.",
                step: "01",
              },
              {
                icon: Cpu,
                title: "Activate Engine",
                desc: "Click 'Analyze' to run Stockfish 16 — the world's strongest chess engine — directly in your browser.",
                step: "02",
              },
              {
                icon: Trophy,
                title: "Understand & Improve",
                desc: "Review the evaluation bar, best move arrows, and multi-line analysis to find your mistakes and improve.",
                step: "03",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors group"
              >
                <div className="absolute top-4 right-4 text-white/5 text-5xl font-black">{item.step}</div>
                <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FF6B00]/20 transition-colors">
                  <item.icon className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-white text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition to white footer */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />

      <Footer />
    </div>
  )
}
