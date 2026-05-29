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
    title: "Foundation Stage",
    color: "#10B981",
    desc: "We turn curiosity into understanding. Students learn the 'Language of Chess' and build the cognitive habits required for play.",
    curriculum: [
      "Board Geometry & Notation",
      "Piece Movement & Values",
      "Basic Rules (Castling, En Passant)",
      "Checkmating Patterns",
      "Intro to Tactics"
    ],
    outcome: "Can play full, legal games with strategic intent.",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "intermediate",
    level: "Intermediate",
    title: "Strategic Building",
    color: "#3B82F6",
    desc: "The transition from playing moves to creating plans. Students start understanding the 'Why' behind every piece placement.",
    curriculum: [
      "Advanced Tactical Combos",
      "Opening Principles",
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
      "Opening Preparation",
      "Complex Endgame Technique",
      "Positional Sacrifice",
      "Time Management Skills",
      "Tournament Mindset"
    ],
    outcome: "Ready for FIDE Rated and State Level Events.",
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
      <section className="py-16 md:py-24 bg-slate-50 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Left Nav */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#12123D] text-center lg:text-left">
                The Learning <br className="hidden lg:block" /> <span className="text-orange-500">Stages.</span>
              </h2>
              
              {/* Horizontal scroll on mobile, vertical list on desktop */}
              <div className="flex lg:flex-col gap-3 md:gap-4 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible scrollbar-hide">
                {levels.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveLevel(i)}
                    className={`flex-shrink-0 lg:w-full flex items-center justify-between p-5 md:p-8 rounded-2xl md:rounded-[2rem] transition-all border-l-4 md:border-l-8 text-left ${
                      activeLevel === i 
                        ? "bg-white shadow-xl lg:translate-x-4 border-l-orange-500" 
                        : "bg-white/50 lg:bg-transparent opacity-60 border-l-transparent"
                    }`}
                  >
                    <div>
                      <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">Phase 0{i+1}</span>
                      <h4 className="text-base md:text-xl font-black text-[#12123D]">{item.level}</h4>
                    </div>
                    <ChevronRight className={`hidden md:block w-5 h-5 ${activeLevel === i ? "text-orange-500" : "text-slate-300"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLevel}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 h-full"
                >
                  <div className="h-48 md:h-80 relative overflow-hidden">
                    <img src={levels[activeLevel].image} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6 md:p-14 space-y-8 md:space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="text-2xl md:text-5xl font-black text-[#12123D] tracking-tight">
                        {levels[activeLevel].title}
                      </h3>
                      <div className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest w-fit">
                        {levels[activeLevel].level} Phase
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed">
                      {levels[activeLevel].desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <BookOpen className="w-4 h-4 text-orange-500" /> Syllabus Highlights
                        </p>
                        <ul className="space-y-3">
                          {levels[activeLevel].curriculum.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-bold text-slate-700">
                              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-orange-500 shrink-0 mt-0.5" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-[#12123D] p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-white space-y-4">
                         <div className="flex items-center gap-2 text-orange-500">
                            <Trophy className="w-5 h-5" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Expected Outcome</span>
                         </div>
                         <p className="text-base md:text-lg font-serif italic leading-relaxed text-slate-200">
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

      {/* 3. TOURNAMENT PREP */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#12123D] rounded-[2rem] md:rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border-b-[8px] md:border-b-[12px] border-orange-500">
             <div className="lg:w-1/2 p-8 md:p-20 space-y-6 md:space-y-8">
                <div className="flex items-center gap-3">
                   <Swords className="text-orange-500 w-5 h-5" />
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">The Arena Program</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                   Tournament <br className="hidden md:block" /> <span className="text-orange-500">Preparation.</span>
                </h2>
                <p className="text-slate-400 font-medium text-sm md:text-lg leading-relaxed">
                  Winning is a habit. Our tournament-rated training goes beyond the board to include pressure management, clock handling, and repertoire construction.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                   {[
                     { label: "Mock Events", icon: Clock },
                     { label: "Elite Sparring", icon: Users },
                     { label: "Mindset Prep", icon: Brain },
                     { label: "FIDE Prep", icon: ShieldCheck }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-2 md:gap-3 text-white font-bold text-[10px] md:text-sm">
                        <item.icon className="w-4 h-4 text-orange-500" /> {item.label}
                     </div>
                   ))}
                </div>
             </div>
             <div className="lg:w-1/2 relative h-64 sm:h-[400px] lg:h-auto">
                <img src="/chess2.jpeg" className="w-full h-full object-cover" alt="Tournament" />
                <div className="absolute inset-0 bg-[#12123D]/20" />
             </div>
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY & TRACKING */}
      <section className="py-16 md:py-24 bg-slate-50 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#12123D]">
                 The Science of <span className="text-orange-500">Strategy.</span>
              </h2>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                 {[
                   { icon: Brain, title: "Tactics-First Approach", desc: "Using specialized puzzles to build automatic pattern recognition." },
                   { icon: Search, title: "Self-Game Analysis", desc: "Digital review of student games to detect and eliminate blunders." },
                   { icon: LineChart, title: "Strategy Reports", desc: "Monthly performance tracking for parents to monitor growth." }
                 ].map((item, i) => (
                   <div key={i} className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl flex items-start gap-4 md:gap-6 shadow-sm border border-slate-100">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                         <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-base md:text-lg font-black text-[#12123D] mb-1">{item.title}</h4>
                         <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="bg-[#12123D] p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] text-white flex flex-col justify-between">
                 <div className="space-y-8 md:space-y-10">
                    <h3 className="text-2xl md:text-3xl font-black">Class Structure</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                       <div>
                          <p className="text-[9px] md:text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Duration</p>
                          <p className="text-xl md:text-2xl font-black">60 Mins</p>
                       </div>
                       <div>
                          <p className="text-[9px] md:text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Frequency</p>
                          <p className="text-xl md:text-2xl font-black">2-3 / Week</p>
                       </div>
                       <div>
                          <p className="text-[9px] md:text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Batch Size</p>
                          <p className="text-xl md:text-2xl font-black">1 : 6 Ratio</p>
                       </div>
                       <div>
                          <p className="text-[9px] md:text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Modes</p>
                          <p className="text-xl md:text-2xl font-black">Hybrid</p>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(true)} className="mt-10 md:mt-12 bg-orange-500 py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-transform">
                    Inquire About Batches <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </section>

      <AchievementSection/>

      {/* 6. FINAL CTA SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto bg-[#12123D] rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-[8px] md:border-b-[12px] border-orange-500">
           <img src="/king1.png" className="absolute -bottom-10 -right-10 w-48 md:w-64 opacity-10 pointer-events-none" alt="" />
           <h2 className="text-2xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight relative z-10">
            Start Your Strategic <br /> <span style={{ color: orange }}>Journey Today.</span>
           </h2>
           <p className="text-xs md:text-base text-slate-400 font-medium mb-10 md:mb-12 max-w-2xl mx-auto relative z-10">
             Don't leave your child's chess growth to chance. Follow our FIDE-certified blueprint to mastery.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
              <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-lg">
                Book Free Trial
              </button>
              <Link href="/coaches" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all border border-white/20 active:scale-95">
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