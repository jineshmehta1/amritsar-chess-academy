"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Swords, Trophy, Clock, Brain, Target, 
  Users, Medal, ShieldCheck, Zap, 
  CheckCircle2, Timer, History, Quote
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

      {/* 2. TOURNAMENT PREPARATION */}
      <section id="prep" className="py-16 md:py-24 bg-white px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                   <Target className="text-orange-500 w-5 h-5" />
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-400">Elite Preparation</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight" style={{ color: navy }}>
                   Beyond the <span style={{ color: orange }}>Board.</span>
                </h2>
                <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                   Tournament play is 50% technical skill and 50% psychological endurance. Our preparation program covers every variable.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-left">
                   {[
                     { icon: Timer, title: "Clock Management", desc: "Training for Blitz (3m), Rapid (15m), and Classical time controls." },
                     { icon: Brain, title: "Mindset Coaching", desc: "Techniques to handle pressure, blunder recovery, and long sessions." },
                     { icon: Search, title: "Repertoire Building", desc: "Deep opening preparation tailored to exploit opponent weaknesses." },
                     { icon: History, title: "Post-Game Review", desc: "Engine-aided analysis of every match to eliminate recurring patterns." }
                   ].map((item, i) => (
                     <div key={i} className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-[#12123D] transition-all">
                        <item.icon className="text-orange-500 mb-4 group-hover:scale-110 transition-transform w-6 h-6 md:w-7 md:h-7" />
                        <h4 className="font-black text-[#12123D] group-hover:text-white mb-2 text-xs md:text-sm uppercase tracking-wide">{item.title}</h4>
                        <p className="text-[11px] md:text-xs text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="relative mt-8 lg:mt-0 px-4 lg:px-0">
                <div className="rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-slate-50">
                   <img src="/g1.jpeg" alt="Tournament Hall" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-6 -left-2 md:-bottom-8 md:-left-8 bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border-b-4 md:border-b-8 border-orange-500">
                   <Swords className="text-orange-500 w-8 h-8 md:w-10 md:h-10" />
                   <div className="mt-2">
                      <div className="text-lg md:text-xl font-black" style={{ color: navy }}>Rated Play</div>
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mock Tournaments Weekly</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. PRIZES & REWARDS */}
      <section className="py-16 md:py-24 bg-[#12123D] text-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                Rewarding <span className="text-orange-500">Excellence.</span>
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             {[
               { icon: Trophy, title: "Championship Trophies", desc: "High-quality custom trophies for top-tier podium finishes." },
               { icon: Zap, title: "Cash Prizes", desc: "Competitive cash rewards for Open category winners." },
               { icon: Medal, title: "Certified Recognition", desc: "Participation certificates and official ELO reports." }
             ].map((reward, i) => (
               <div key={i} className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 text-center hover:bg-orange-500 transition-all group">
                  <reward.icon className="mx-auto mb-6 md:mb-8 text-orange-500 group-hover:text-white transition-colors w-10 h-10 md:w-12 md:h-12" />
                  <h4 className="text-lg md:text-xl font-black uppercase mb-3 md:mb-4 tracking-tight">{reward.title}</h4>
                  <p className="text-xs md:text-sm text-slate-400 group-hover:text-white/80 font-medium">{reward.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <AchievementSection/>

      {/* 4. PAST HIGHLIGHTS */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
             <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight" style={{ color: navy }}>
                   Battlefield <span style={{ color: orange }}>Chronicles.</span>
                </h2>
                <p className="text-slate-500 font-medium text-sm md:text-lg leading-relaxed px-4 lg:px-0">
                   Capturing the silence, the intensity, and the triumph of our previous events.
                </p>
                <div className="space-y-4 md:space-y-6 text-left">
                   {[
                     { event: "Amritsar Junior Open", winner: "Aryan Singh", pos: "1st Place" },
                     { event: "Weekend Rapid League", winner: "Mehak K.", pos: "Runner Up" },
                     { event: "Club Blitz Cup", winner: "Vihaan R.", pos: "Top Scorer" }
                   ].map((res, i) => (
                     <div key={i} className="flex justify-between items-center p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border-l-4 border-orange-500">
                        <div>
                           <div className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">{res.event}</div>
                           <div className="text-base md:text-lg font-black" style={{ color: navy }}>{res.winner}</div>
                        </div>
                        <div className="text-orange-500 font-black text-xs md:text-sm">{res.pos}</div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4 px-2 md:px-0">
                <div className="space-y-3 md:space-y-4">
                   <div className="rounded-2xl md:rounded-3xl overflow-hidden h-48 md:h-64"><img src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                   <div className="rounded-2xl md:rounded-3xl overflow-hidden h-32 md:h-40"><img src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                </div>
                <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
                   <div className="rounded-2xl md:rounded-3xl overflow-hidden h-32 md:h-40"><img src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                   <div className="rounded-2xl md:rounded-3xl overflow-hidden h-48 md:h-64"><img src="https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" /></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. WHY PARTICIPATE */}
      <section className="py-16 md:py-24 bg-slate-50 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-12">
           <h2 className="text-3xl md:text-4xl font-black tracking-tighter" style={{ color: navy }}>
              Why Step into the <span style={{ color: orange }}>Arena?</span>
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
              {[
                { title: "Confidence Under Fire", desc: "Playing with a clock and an opponent staring at you builds real-world confidence." },
                { title: "Official ELO Growth", desc: "Our rated tournaments contribute to your official skill ranking and progress tracking." },
                { title: "Strategic Networking", desc: "Meet players across different age groups to broaden your repertoire." },
                { title: "Psychological Resilience", desc: "Learn the art of losing gracefully and winning professionally." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-2">
                   <CheckCircle2 className="text-orange-500 shrink-0 w-5 h-5 md:w-6 md:h-6" />
                   <div>
                      <h4 className="font-black text-[#12123D] text-[10px] md:text-xs uppercase mb-1">{item.title}</h4>
                      <p className="text-[10px] md:text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. RULES & ETHICS */}
      <section className="py-16 md:py-24 bg-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-[#12123D] rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 text-white flex flex-col lg:flex-row gap-10 lg:gap-16">
           <div className="flex-1 space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight text-center lg:text-left">
                 Tournament <br /> <span className="text-orange-500">Guidelines.</span>
              </h2>
              <div className="space-y-4 md:space-y-6">
                 {[
                   "Touch-Move Rule: If you touch a piece, you must move it.",
                   "No Outside Assistance: No coaching or mobile devices during play.",
                   "Reporting Time: Players must be at the board 10 mins before start.",
                   "Swiss System Pairing: Standard international fair-matching protocols."
                 ].map((rule, i) => (
                   <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
                      <span className="text-orange-500 font-black text-sm md:text-base">0{i+1}</span>
                      <p className="text-[11px] md:text-sm font-bold text-slate-300">{rule}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="flex-1 bg-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-center text-center space-y-4 md:space-y-6 border border-white/5">
              <ShieldCheck className="mx-auto text-orange-500 w-12 h-12 md:w-16 md:h-16" />
              <h3 className="text-xl md:text-2xl font-black italic">The ACA Standard</h3>
              <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                We uphold the highest FIDE ethics. Every tournament is a reflection of the player's integrity and the club's discipline.
              </p>
           </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto bg-slate-50 rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 text-center relative overflow-hidden border-b-[8px] md:border-b-[12px] border-orange-500 shadow-xl">
           <Quote className="absolute -top-4 -left-4 md:-top-6 md:-left-6 text-orange-100 opacity-50 w-20 h-20 md:w-32 md:h-32" />
           <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight relative z-10" style={{ color: navy }}>
            Ready to Rule <br /> <span style={{ color: orange }}>The Board?</span>
           </h2>
           <p className="text-slate-500 font-medium text-sm md:text-base mb-10 md:mb-12 max-w-2xl mx-auto pt-4 md:pt-6 relative z-10 px-4">
             Start your competitive journey today. Book a trial session and let us prepare you for your first championship.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20 px-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all hover:scale-105 active:scale-95 shadow-lg">
                Book Trial Session
              </button>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-[#12123D] text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all hover:scale-105 active:scale-95 shadow-lg">
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

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}