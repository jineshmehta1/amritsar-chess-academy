"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Zap, ShieldCheck, Flame, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookDemo } from "@/components/BookDemoProvider"

const programs = [
  {
    tag: "Foundation",
    title: "Junior Strategist",
    rating: "ELO 0 — 600",
    desc: "A specialized immersion program for young minds to develop spatial awareness and logical reasoning.",
    features: ["Piece Coordination", "Basic Endgames", "Puzzle Rush Level 1"],
    icon: Zap,
    color: "#FF6B00", // Orange
    image: "/beg.jpg"
  },
  {
    tag: "Intermediate",
    title: "Tactical Mastery",
    rating: "ELO 600 — 1400",
    desc: "Transition from basic rules to complex tactical motifs, pattern recognition, and opening theory.",
    features: ["Pattern Recognition", "Positional Basics", "Opening Repertoire"],
    icon: Flame,
    color: "#7C3AED", // Purple
    image: "/inter.webp"
  },
  {
    tag: "Competitive",
    title: "Elite Championship",
    rating: "ELO 1400 — 2200",
    desc: "Rigorous training for tournament players focusing on deep calculation and analysis.",
    features: ["Stockfish Analysis", "Grandmaster Games", "Pro Tournament Prep"],
    icon: ShieldCheck,
    color: "#12123D", // Navy
    image: "/ad.webp"
  },
  {
    tag: "Professional",
    title: "GM Mentorship",
    rating: "ELO 2200+",
    desc: "Personalized 1-on-1 sessions with Grandmasters to refine your unique style and professional career.",
    features: ["Psychological Prep", "Novelty Development", "Career Management"],
    icon: Crown,
    color: "#FF6B00", // Orange
    image: "/adv.webp"
  }
]

export default function AdvancedPrograms() {
  const { openBookDemoModal } = useBookDemo()
  const navy = "#12123D"
  const orange = "#FF6B00"
  const purple = "#7C3AED"

  return (
    <section className="py-28 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* CENTERED HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            <SparkleIcon /> Elite Learning Path
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-8"
            style={{ color: navy }}
          >
            Mastering the {" "}
            <span style={{ color: orange }}>64 Squares</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-lg font-medium"
          >
            Our structured ecosystem takes you from your first move to a professional FIDE rating with globally certified masters.
          </motion.p>
        </div>

        {/* ADVANCED CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-slate-50/50 rounded-[2.5rem] p-3 border border-slate-100 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_40px_80px_-20px_rgba(18,18,61,0.15)] group-hover:-translate-y-2">
                
                {/* Image Section */}
                <div className="relative h-56 w-full rounded-[2rem] overflow-hidden mb-6">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={item.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12123D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xl">
                    <span className="text-[10px] font-black tracking-wider" style={{ color: navy }}>{item.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-white shadow-sm">
                      <item.icon size={16} style={{ color: item.color }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.tag}</span>
                  </div>

                  <h3 className="text-2xl font-black mb-3 transition-colors" style={{ color: navy }}>
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                    {item.desc}
                  </p>

                  <div className="space-y-3 mb-8">
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} style={{ color: item.color }} />
                        <span className="text-xs font-bold text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={openBookDemoModal}
                    className="w-full h-14 rounded-2xl font-black text-[11px] tracking-[0.15em] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-slate-200 group-hover:shadow-indigo-200"
                    style={{ backgroundColor: item.color, color: '#fff' }}
                  >
                    ENROLL NOW <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}