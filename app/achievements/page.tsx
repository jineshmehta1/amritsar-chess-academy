"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Trophy, Medal, Star, TrendingUp, Users, 
  Target, Award, Quote, Calendar, ChevronRight, 
  ArrowUpRight, Sparkles, ShieldCheck
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useBookDemo } from "@/components/BookDemoProvider"
import AchievementHero from "@/components/achBanner"
import AchievementSection from "@/components/ach"
import TestimonialSection from "@/components/review"

const navy = "#12123D"
const orange = "#FF6B00"

const hallOfFame = [
  {
    name: "Manvendra Pratap",
    title: "Asian Youth Gold Medalist",
    event: "Asian Youth Championship 2024",
    growth: "ELO 1200 → 1850",
    image: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Vihaan Kapoor",
    title: "State U-14 Champion",
    event: "Punjab State Open 2023",
    growth: "ELO 800 → 1420",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Ananya Sharma",
    title: "National Women's Qualifier",
    event: "AICF Nationals 2024",
    growth: "ELO 950 → 1380",
    image: "https://images.unsplash.com/photo-1580894732230-2838963bc3c3?q=80&w=800&auto=format&fit=crop"
  }
]

export default function AchievementPage() {
  const { openBookDemoModal } = useBookDemo()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <AchievementHero/>

      <AchievementSection/>


      {/* 4. RATING IMPROVEMENT STORIES (Visual Data) */}
      <section className="py-24 bg-[#12123D] text-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                   The Rating <br /> <span className="text-orange-500">Rocket.</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                   We track every point. Our structured training consistently helps students bridge the gap between "Beginner" and "Competitive Rated Player" in record time.
                </p>
                <div className="space-y-10">
                   {[
                     { name: "6-Month Sprint", points: "500 → 1200", percent: 85 },
                     { name: "Tournament Prep", points: "800 → 1350", percent: 70 },
                     { name: "Junior Mastery", points: "400 → 1050", percent: 90 },
                   ].map((item, i) => (
                     <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                           <span className="text-xl font-black">{item.name}</span>
                           <span className="text-orange-500 font-bold">{item.points}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.percent}%` }} transition={{ duration: 1 }} className="h-full bg-orange-500" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="relative">
                <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 text-center">
                   <TrendingUp size={80} className="text-orange-500 mx-auto mb-8" />
                   <h3 className="text-3xl font-black mb-4">98% Success Rate</h3>
                   <p className="text-slate-400 font-medium">Of our regular students show a significant rating jump within the first 3 months of FIDE-based training.</p>
                </div>
                <img src="/king1.png" className="absolute -top-10 -left-10 w-32 opacity-20" />
             </div>
          </div>
        </div>
      </section>

      {/* 5. TOURNAMENT PARTICIPATION (Timeline) */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tighter" style={{ color: navy }}>
                 Battleground <span style={{ color: orange }}>Milestones.</span>
              </h2>
           </div>
           <div className="space-y-12">
              {[
                { level: "National Level", wins: "Qualified for Nationals in 2022, 2023 & 2024", color: navy },
                { level: "State Level", wins: "15 Gold Medals in Punjab State School & Open Championships", color: orange },
                { level: "District Level", wins: "Dominant 1st Ranks in Amritsar District U-11 to U-17", color: navy },
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 items-start p-10 bg-slate-50 rounded-[2.5rem] border-l-8" style={{ borderLeftColor: item.color }}>
                   <div className="text-2xl font-black uppercase tracking-tighter shrink-0 md:w-48" style={{ color: item.color }}>{item.level}</div>
                   <div className="text-lg font-bold text-slate-600">{item.wins}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. COACH ACHIEVEMENTS */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="rounded-[3.5rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Coach" />
           </div>
           <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tighter text-[#12123D]">
                 Mastery from the <span style={{ color: orange }}>Source.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: "FIDE Rated Player", desc: "Our coaches carry active international ratings, ensuring real-game wisdom." },
                  { title: "Certified Trainers", desc: "Recognized certifications for elite-level chess instruction." },
                  { title: "Open Tournament Wins", desc: "Multiple victories in open grandmaster-level tournaments across India." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                     <ShieldCheck className="text-orange-500 shrink-0" size={28} />
                     <div>
                        <h4 className="font-black text-[#12123D] uppercase text-sm tracking-wide">{item.title}</h4>
                        <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      <TestimonialSection/>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-[#12123D] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-[12px] border-orange-500">
           <img src="/king1.png" className="absolute -bottom-10 -right-10 w-64 opacity-10 pointer-events-none" />
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
            Be Our Next <span style={{ color: orange }}>Success Story.</span>
           </h2>
           <p className="text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
             The board is set, the legacy is waiting. Join the winning club and move your future forward today.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={openBookDemoModal} className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg">
                Book Free Trial
              </button>
              <Link href="/curriculum">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all border border-white/20">
                  View Curriculum
                </button>
              </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}