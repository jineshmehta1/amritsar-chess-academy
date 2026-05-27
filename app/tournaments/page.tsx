"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Swords, Trophy, Clock, Brain, Target, 
  Users, Medal, ShieldCheck, Zap, 
  ArrowRight, Quote, Camera, CheckCircle2,
  Timer, History, GraduationCap, Search
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import BookDemoModal from "@/components/BookDemoModal"
import AchievementHero from "@/components/achBanner"
import AchievementSection from "@/components/ach"

const navy = "#12123D"
const orange = "#FF6B00"

export default function TournamentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

     <AchievementHero/>

      {/* 2. TOURNAMENT PREPARATION (How We Train) */}
      <section id="prep" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <div className="flex items-center gap-2">
                   <Target className="text-orange-500" size={20} />
                   <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Elite Preparation</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter" style={{ color: navy }}>
                   Beyond the <span style={{ color: orange }}>Board.</span>
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                   Tournament play is 50% technical skill and 50% psychological endurance. Our preparation program covers every variable.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {[
                     { icon: Timer, title: "Clock Management", desc: "Training for Blitz (3m), Rapid (15m), and Classical time controls." },
                     { icon: Brain, title: "Mindset Coaching", desc: "Techniques to handle pressure, blunder recovery, and long sessions." },
                     { icon: Search, title: "Repertoire Building", desc: "Deep opening preparation tailored to exploit opponent weaknesses." },
                     { icon: History, title: "Post-Game Review", desc: "Engine-aided analysis of every match to eliminate recurring patterns." }
                   ].map((item, i) => (
                     <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-[#12123D] transition-all">
                        <item.icon className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
                        <h4 className="font-black text-[#12123D] group-hover:text-white mb-2 text-sm uppercase tracking-wide">{item.title}</h4>
                        <p className="text-xs text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
             <div className="relative">
                <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-slate-50">
                   <img src="/g1.jpeg" alt="Chess Tournament Hall" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border-b-8 border-orange-500">
                   <Swords size={40} className="text-orange-500" />
                   <div className="mt-2">
                      <div className="text-xl font-black" style={{ color: navy }}>Rated Play</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mock Tournaments Weekly</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. PRIZES & REWARDS (Visual Motivation) */}
      <section className="py-24 bg-[#12123D] text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                Rewarding <span className="text-orange-500">Excellence.</span>
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: Trophy, title: "Championship Trophies", desc: "High-quality custom trophies for top-tier podium finishes." },
               { icon: Zap, title: "Cash Prizes", desc: "Competitive cash rewards for Open category winners." },
               { icon: Medal, title: "Certified Recognition", desc: "Participation certificates and official ELO reports." }
             ].map((reward, i) => (
               <div key={i} className="p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center hover:bg-orange-500 transition-all group">
                  <reward.icon size={48} className="mx-auto mb-8 text-orange-500 group-hover:text-white transition-colors" />
                  <h4 className="text-xl font-black uppercase mb-4 tracking-tight">{reward.title}</h4>
                  <p className="text-slate-400 group-hover:text-white/80 font-medium">{reward.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <AchievementSection/>

      {/* 4. PAST HIGHLIGHTS & RESULTS */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             <div className="lg:col-span-5 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: navy }}>
                   Battlefield <span style={{ color: orange }}>Chronicles.</span>
                </h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                   Capturing the silence, the intensity, and the triumph of our previous events.
                </p>
                <div className="space-y-6">
                   {[
                     { event: "Amritsar Junior Open", winner: "Aryan Singh", pos: "1st Place" },
                     { event: "Weekend Rapid League", winner: "Mehak K.", pos: "Runner Up" },
                     { event: "Club Blitz Cup", winner: "Vihaan R.", pos: "Top Scorer" }
                   ].map((res, i) => (
                     <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border-l-4 border-orange-500">
                        <div>
                           <div className="text-[10px] font-black uppercase text-slate-400">{res.event}</div>
                           <div className="text-lg font-black" style={{ color: navy }}>{res.winner}</div>
                        </div>
                        <div className="text-orange-500 font-black text-sm">{res.pos}</div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                   <div className="rounded-3xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                   <div className="rounded-3xl overflow-hidden h-40"><img src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                </div>
                <div className="space-y-4 pt-12">
                   <div className="rounded-3xl overflow-hidden h-40"><img src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                   <div className="rounded-3xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. WHY PARTICIPATE */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
           <h2 className="text-4xl font-black tracking-tighter" style={{ color: navy }}>
              Why Step into the <span style={{ color: orange }}>Arena?</span>
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                { title: "Confidence Under Fire", desc: "Playing at home is easy; playing with a clock and an opponent staring at you builds real-world confidence." },
                { icon: ShieldCheck, title: "Official ELO Growth", desc: "Our rated tournaments contribute to your official skill ranking and progress tracking." },
                { icon: Users, title: "Strategic Networking", desc: "Meet players across different age groups and styles to broaden your defensive repertoire." },
                { icon: Trophy, title: "Psychological Resilience", desc: "Learn the art of losing gracefully and winning professionally—the marks of a champion." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                   <CheckCircle2 className="text-orange-500 shrink-0" size={24} />
                   <div>
                      <h4 className="font-black text-[#12123D] text-sm uppercase mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. RULES & ETHICS (The Standard) */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto bg-[#12123D] rounded-[4rem] p-12 md:p-20 text-white flex flex-col lg:flex-row gap-16">
           <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-black tracking-tighter leading-tight">
                 Tournament <br /> <span className="text-orange-500">Guidelines.</span>
              </h2>
              <div className="space-y-6">
                 {[
                   "Touch-Move Rule: If you touch a piece, you must move it.",
                   "No Outside Assistance: No coaching or mobile devices during play.",
                   "Strict Reporting Time: Players must be at the board 10 mins before round start.",
                   "Swiss System Pairing: Standard international fair-matching protocols."
                 ].map((rule, i) => (
                   <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-orange-500 font-black">0{i+1}</span>
                      <p className="text-sm font-bold text-slate-300">{rule}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="flex-1 bg-white/5 rounded-[3rem] p-12 flex flex-col justify-center text-center space-y-6">
              <ShieldCheck size={64} className="mx-auto text-orange-500" />
              <h3 className="text-2xl font-black italic">The ACA Standard</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                We uphold the highest FIDE ethics. Every tournament is a reflection of the player's integrity and the club's discipline.
              </p>
           </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-slate-50 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border-b-[12px] border-orange-500 shadow-2xl">
           <Quote size={100} className="absolute -top-6 -left-6 text-orange-100 opacity-50" />
           <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight" style={{ color: navy }}>
            Ready to Rule <br /> <span style={{ color: orange }}>The Board?</span>
           </h2>
           <p className="text-slate-500 font-medium mb-12 max-w-2xl mx-auto pt-6">
             Start your competitive journey today. Book a trial session and let us prepare you for your first championship.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg">
                Book Trial Session
              </button>
              <Link href="/contact">
                <button className="bg-[#12123D] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg">
                  Contact Club
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