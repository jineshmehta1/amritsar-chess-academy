"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Trophy, Target, Brain, Search, BookOpen, 
  ChevronRight, Calendar, Users, LineChart, 
  CheckCircle2, Clock, Swords, Sparkles, 
  ArrowRight, ShieldCheck, Medal, Quote
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import BookDemoModal from "@/components/BookDemoModal"
import CurriculumHero from "@/components/curriculumBanner"
import AchievementSection from "@/components/ach"

const navy = "#12123D"
const orange = "#FF6B00"

const levels = [
  {
    id: "beginner",
    level: "Beginner",
    title: "The Foundation Stage",
    color: "#10B981",
    desc: "We turn curiosity into understanding. At this stage, students learn the 'Language of Chess' and build the cognitive habits required for play.",
    curriculum: [
      "Board Geometry & Notation",
      "Piece Movement & Values",
      "Basic Rules (Castling, En Passant)",
      "Fundamental Checkmating Patterns",
      "Introduction to Tactical Motifs"
    ],
    outcome: "Can play full, legal games with basic strategic intent.",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "intermediate",
    level: "Intermediate",
    title: "Strategic Skill Building",
    color: "#3B82F6",
    desc: "The transition from playing moves to creating plans. Students start understanding the 'Why' behind every piece placement.",
    curriculum: [
      "Advanced Tactical Combinations",
      "Opening Principles & Theory",
      "Middlegame Planning",
      "Pawn Structure Basics",
      "Endgame Fundamentals"
    ],
    outcome: "Reduced blunders and improved calculation depth.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "advanced",
    level: "Advanced",
    title: "Competitive Mastery",
    color: "#EF4444",
    desc: "Refining the skills of a tournament player. We focus on deep calculation, prophylactic thinking, and psychological toughness.",
    curriculum: [
      "Deep Opening Preparation",
      "Complex Endgame Technique",
      "Positional Sacrifice & Play",
      "Time Management Skills",
      "Tournament Mindset & Prep"
    ],
    outcome: "Ready for FIDE Rated and State Level Tournaments.",
    image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=800&auto=format&fit=crop"
  }
]

export default function CurriculumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeLevel, setActiveLevel] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <CurriculumHero/>

      {/* 2. THE ROADMAP SELECTOR */}
      <section className="py-24 bg-slate-50 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Nav */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-4xl font-black tracking-tighter text-[#12123D]">The Learning <br/> <span className="text-orange-500">Stages.</span></h2>
              <div className="space-y-4">
                {levels.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveLevel(i)}
                    className={`w-full flex items-center justify-between p-8 rounded-[2rem] transition-all border-l-8 text-left ${
                      activeLevel === i ? "bg-white shadow-xl translate-x-4 border-l-orange-500" : "bg-transparent opacity-40 grayscale border-l-transparent"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400">Level 0{i+1}</span>
                      <h4 className="text-xl font-black text-[#12123D]">{item.level}</h4>
                    </div>
                    <ChevronRight className={activeLevel === i ? "text-orange-500" : "text-slate-300"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLevel}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100"
                >
                  <div className="h-64 md:h-80 relative overflow-hidden">
                    <img src={levels[activeLevel].image} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                  <div className="p-10 md:p-14 space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <h3 className="text-3xl md:text-5xl font-black text-[#12123D] tracking-tight">
                        {levels[activeLevel].title}
                      </h3>
                      <div className="px-4 py-2 rounded-xl bg-orange-50 text-orange-600 font-black text-[10px] uppercase tracking-widest w-fit">
                        {levels[activeLevel].level} Phase
                      </div>
                    </div>

                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                      {levels[activeLevel].desc}
                    </p>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <BookOpen size={14} className="text-orange-500" /> Syllabus Highlights
                        </p>
                        <ul className="space-y-3">
                          {levels[activeLevel].curriculum.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                              <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#12123D] p-8 rounded-[2rem] text-white space-y-4">
                         <div className="flex items-center gap-2 text-orange-500">
                            <Trophy size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Expected Outcome</span>
                         </div>
                         <p className="text-lg font-serif italic leading-relaxed text-slate-200">
                           "{levels[activeLevel].outcome}"
                         </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TOURNAMENT PREP (Premium Overlay Style) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#12123D] rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border-b-[12px] border-orange-500">
             <div className="lg:w-1/2 p-12 md:p-20 space-y-8">
                <div className="flex items-center gap-3">
                   <Swords className="text-orange-500" />
                   <span className="text-xs font-black uppercase tracking-widest text-slate-400">The Arena Program</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                   Tournament <br /> <span className="text-orange-500">Preparation.</span>
                </h2>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">
                  Winning is a habit. Our tournament-rated training goes beyond the board to include pressure management, clock handling, and opening repertoire construction.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {[
                     { label: "Mock Events", icon: Clock },
                     { label: "Elite Sparring", icon: Users },
                     { label: "Mindset Coaching", icon: Brain },
                     { label: "FIDE Prep", icon: ShieldCheck }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                        <item.icon size={18} className="text-orange-500" /> {item.label}
                     </div>
                   ))}
                </div>
             </div>
             <div className="lg:w-1/2 relative h-[400px] lg:h-auto">
                <img src="/chess2.jpeg" className="w-full h-full object-cover" alt="Tournament" />
                <div className="absolute inset-0 bg-[#12123D]/20" />
             </div>
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY & TRACKING */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#12123D]">
                 The Science of <span className="text-orange-500">Strategy.</span>
              </h2>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Methodology */}
              <div className="space-y-4">
                 {[
                   { icon: Brain, title: "Tactics-First Approach", desc: "Using 1000+ specialized puzzles to build automatic pattern recognition." },
                   { icon: Search, title: "Self-Game Analysis", desc: "Digital review of student games to detect and eliminate recurring blunders." },
                   { icon: LineChart, title: "Strategy Reports", desc: "Monthly performance tracking for parents to monitor rating growth." }
                 ].map((item, i) => (
                   <div key={i} className="p-8 bg-white rounded-3xl flex items-start gap-6 shadow-sm border border-slate-100">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                         <item.icon size={24} />
                      </div>
                      <div>
                         <h4 className="text-lg font-black text-[#12123D] mb-1">{item.title}</h4>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Class Info Card */}
              <div className="bg-[#12123D] p-12 rounded-[3.5rem] text-white flex flex-col justify-between">
                 <div className="space-y-6">
                    <h3 className="text-3xl font-black">Class Structure</h3>
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Duration</p>
                          <p className="text-2xl font-black">60 Mins</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Frequency</p>
                          <p className="text-2xl font-black">2-3 / Week</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Batch Size</p>
                          <p className="text-2xl font-black">1 : 6 Ratio</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Modes</p>
                          <p className="text-2xl font-black">Online / Offline</p>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(true)} className="mt-12 bg-orange-500 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                    Inquire About Batches <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>
      </section>

      <AchievementSection/>

      {/* 6. FINAL CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-[#12123D] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-[12px] border-orange-500">
           <img src="/king1.png" className="absolute -bottom-10 -right-10 w-64 opacity-10 pointer-events-none" />
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
            Start Your Strategic <br /> <span style={{ color: orange }}>Journey Today.</span>
           </h2>
           <p className="text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
             Don't leave your child's chess growth to chance. Follow our FIDE-certified blueprint to mastery.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg">
                Book Free Trial Session
              </button>
              <Link href="/coaches">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all border border-white/20">
                  View Coaches
                </button>
              </Link>
           </div>
        </div>
      </section>

      <Footer />
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}