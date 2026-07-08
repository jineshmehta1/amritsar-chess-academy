"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Trophy, Users, Award, Star, Brain, Search, 
  Target, Rocket, Play, 
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { useBookDemo } from "@/components/BookDemoProvider"
import CoachesHero from "@/components/coachesBanner"
import AchievementSection from "@/components/ach"
import TestimonialSection from "@/components/review"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const navy = "#12123D"
const orange = "#FF6B00"

const coaches = [
  {
    name: "Coach XYZ",
    title: "Chief Coach & Founder",
    rating: "FIDE Rated: 2150",
    exp: "14+ Years",
    specialization: "Tournament Prep & Endgame Mastery",
    achievements: "Coached 10+ National Medalists, FIDE Certified Trainer",
    bio: "With over a decade of mentorship, Coach XYZ focuses on the psychological edge and deep calculation needed for elite competition.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Vikram Singh",
    title: "Senior Tactical Trainer",
    rating: "FIDE Rated: 1980",
    exp: "8+ Years",
    specialization: "Puzzle-Based Tactics & Middle Game",
    achievements: "3-time State Champion, Expert in Modern Openings",
    bio: "Vikram specializes in sharpening a student's tactical vision, ensuring they spot winning combinations in seconds.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
  }
]

export default function CoachesPage() {
  const { openBookDemoModal } = useBookDemo()

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      
      {/* 1. HERO SECTION */}
      <CoachesHero/>

      {/* 2. WHY OUR COACHES ARE DIFFERENT */}
      <section className="py-16 md:py-24 bg-slate-50 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-center lg:text-left" style={{ color: navy }}>
                Why Our Mentorship <br /> <span style={{ color: orange }}>Works.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Brain, title: "Thinking over Moves", desc: "We focus on cognitive patterns and decision-making logic." },
                  { icon: Target, title: "Personal Attention", desc: "Small batches ensure every student's mistakes are caught." },
                  { icon: Users, title: "Proven Growth", desc: "Avg student rating increases by 300+ points in 6 months." },
                  { icon: Rocket, title: "FIDE Standards", desc: "Curriculum designed around international rating standards." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl md:rounded-3xl shadow-sm border-b-4 border-slate-100 hover:border-orange-500 transition-all group">
                    <item.icon size={28} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black text-[#12123D] mb-2 text-xs md:text-sm uppercase tracking-wide">{item.title}</h4>
                    <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl">
                <img src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop" alt="Mentorship" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl flex items-center gap-3 md:gap-4 border border-slate-50">
                 <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                 <div>
                   <div className="text-xl md:text-2xl font-black" style={{ color: navy }}>500+</div>
                   <div className="text-[8px] md:text-[10px] font-black uppercase text-slate-400">Futures Shaped</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COACH PROFILES */}
      <section id="profiles" className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter" style={{ color: navy }}>
              The <span style={{ color: orange }}>Grandmasters</span> Behind ACA
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {coaches.map((coach, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col lg:flex-row group"
                style={{ borderBottom: `8px solid ${i % 2 === 0 ? navy : orange}` }}
              >
                {/* Image side */}
                <div className="lg:w-5/12 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                  <img src={coach.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={coach.name} />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                    {coach.exp} Experience
                  </div>
                </div>

                {/* Content side */}
                <div className="lg:w-7/12 p-6 md:p-12 space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black mb-1" style={{ color: navy }}>{coach.name}</h3>
                    <p className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{coach.title}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl">
                      <div className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">Rating</div>
                      <div className="text-xs md:text-sm font-bold text-[#12123D]">{coach.rating}</div>
                    </div>
                    <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl">
                      <div className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">Focus</div>
                      <div className="text-[10px] md:text-xs font-bold text-[#12123D] leading-tight mt-1">{coach.specialization}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-black text-[#12123D] uppercase">
                       <Award size={16} className="text-orange-500" /> Key Achievement
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 font-medium italic">"{coach.achievements}"</p>
                  </div>

                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">{coach.bio}</p>

                  <button onClick={openBookDemoModal} className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-colors">
                    Book Session with {coach.name.split(' ')[0]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY (Premium Cards) */}
      <section className="py-16 md:py-24 bg-[#12123D] text-white px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 leading-tight">
              How We <span style={{ color: orange }}>Forge</span> Champions.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Brain, title: "Tactics Training", desc: "Pattern recognition drills ensuring combinations are etched in memory." },
              { icon: Search, title: "Game Analysis", desc: "Engine-aided breakdown of personal student games for mistake correction." },
              { icon: Target, title: "Opening Theory", desc: "Structured repertoire building based on a student's style." },
              { icon: Award, title: "Progress Plans", desc: "Monthly benchmarks & roadmap based on tournament performance." }
            ].map((item, i) => (
              <div key={i} className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-orange-500 mx-auto mb-6 md:mb-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h4 className="text-base md:text-lg font-black uppercase tracking-tight mb-3 md:mb-4">{item.title}</h4>
                <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <img src="/king1.png" className="absolute top-0 left-0 w-48 md:w-80 opacity-5 pointer-events-none -rotate-45" alt="decoration" />
      </section>

      {/* 5. TITLES & BADGES */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-100 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-3">
             <Trophy className="w-8 h-8 md:w-10 md:h-10 text-[#12123D]" />
             <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">State Rated Events</span>
          </div>
          <div className="flex items-center gap-3">
             <Award className="w-8 h-8 md:w-10 md:h-10 text-[#12123D]" />
             <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">FIDE Certified Hub</span>
          </div>
          <div className="flex items-center gap-3">
             <Star className="w-8 h-8 md:w-10 md:h-10 text-[#12123D]" />
             <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Top Rated Club</span>
          </div>
        </div>
      </section>

      <AchievementSection/>
      <TestimonialSection/>

      {/* 8. COACHES IN ACTION */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:h-[500px]">
             <div className="h-64 md:h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Action" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange-500 flex items-center justify-center text-white"><Play size={24} /></div>
                </div>
             </div>
             <div className="md:col-span-2 h-64 md:h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-[6px] md:border-[12px] border-slate-50 shadow-sm">
                <img src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover" alt="Large Action" />
             </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto bg-[#12123D] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-[8px] md:border-b-[12px] border-orange-500">
           <img src="/king1.png" className="absolute -bottom-10 -right-10 w-48 md:w-64 opacity-10 pointer-events-none" alt="deco" />
           <h2 className="text-2xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight relative z-10">
            Start Your Chess <br /> <span style={{ color: orange }}>Journey Today.</span>
           </h2>
           <p className="text-xs md:text-base text-slate-400 font-medium mb-8 md:mb-12 max-w-2xl mx-auto relative z-10">
             Whether you're a curious beginner or a tournament-ready player, our master coaches are here to help you rule the board.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
              <button onClick={openBookDemoModal} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-lg active:scale-95">
                Book Free Trial
              </button>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all border border-white/20 active:scale-95">
                  Contact Us
                </button>
              </Link>
           </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}