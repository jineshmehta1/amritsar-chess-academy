"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Eye, Rocket, ShieldCheck, Star, Users, Lightbulb, TrendingUp, Heart } from "lucide-react"

const navy = "#12123D"
const orange = "#FF6B00"

export default function MissionVision() {
  const coreValues = [
    { icon: Star, title: "Excellence", desc: "In Chess Education" },
    { icon: ShieldCheck, title: "Integrity", desc: "And Fair Play" },
    { icon: Users, title: "Student-Centered", desc: "Individualized Learning" },
    { icon: TrendingUp, title: "Discipline", desc: "Continuous Improvement" },
    { icon: Heart, title: "Inclusivity", desc: "Equal Opportunities" },
    { icon: Lightbulb, title: "Community", desc: "Building Through Chess" },
  ]

  return (
    <section className="py-16 md:py-24 bg-white px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
              Our Foundations
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight uppercase">
            Mission & <span style={{ color: orange }}>Vision</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
          
          {/* MISSION CARD (Navy) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden shadow-2xl flex flex-col justify-between"
            style={{ backgroundColor: navy }}
          >
            <Target className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700 w-48 h-48 md:w-80 md:h-80" />

            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/20">
                <Target className="w-7 h-7 md:w-8 md:h-8" style={{ color: orange }} />
              </div>

              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">Our Mission</h3>
              
              <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed mb-8">
                To make <span className="text-white">high-quality chess education accessible</span> to every enthusiast in Punjab. We nurture intelligent, confident individuals by using chess as a tool for critical thinking, memory, and decision-making.
              </p>

              <ul className="space-y-4">
                {[
                  "Experienced Professional Coaches",
                  "Modern Teaching Methodologies",
                  "Beginner to Competitive Training"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-wide text-slate-400">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: orange }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* VISION CARD (Orange) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden shadow-2xl flex flex-col justify-between"
            style={{ backgroundColor: orange }}
          >
            <Eye className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700 w-48 h-48 md:w-80 md:h-80" />

            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black/10 flex items-center justify-center mb-8 border border-black/10">
                <Eye className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">Our Vision</h3>
              
              <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed mb-8">
                To establish <span className="text-white">Amritsar as a leading hub for chess excellence</span> in India. We strive to build a vibrant community that inspires success in state, national, and international competitions.
              </p>

              <ul className="space-y-4">
                {[
                  "District, State & National Success",
                  "Vibrant Chess Community Building",
                  "Regular Tournaments & Workshops"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-wide text-white/80">
                    <div className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CORE VALUES SECTION */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Our Foundation</h4>
            <div className="text-2xl font-black text-slate-900 uppercase">Core Values</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-6 rounded-2xl text-center group hover:bg-[#12123D] transition-colors duration-300"
              >
                <val.icon className="w-6 h-6 mx-auto mb-3 group-hover:text-[#FF6B00] transition-colors" style={{ color: navy }} />
                <div className="text-[10px] font-black uppercase tracking-wider mb-1 group-hover:text-white" style={{ color: navy }}>{val.title}</div>
                <div className="text-[9px] font-bold text-slate-400 group-hover:text-slate-500 uppercase">{val.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* OUR PROMISE / BOTTOM TAGLINE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative inline-block max-w-3xl">
             <div className="absolute inset-0 bg-orange-500/5 blur-3xl rounded-full" />
             <div className="relative p-8 md:p-12 bg-slate-50 rounded-[2.5rem] border border-slate-100">
               <div className="flex items-center justify-center gap-3 mb-6">
                 <Rocket className="w-6 h-6" style={{ color: orange }} />
                 <span className="text-sm font-black uppercase tracking-[0.2em] text-[#12123D]">Our Promise</span>
               </div>
               <p className="text-lg md:text-2xl font-serif italic text-slate-800 leading-relaxed">
                 "Every student who joins Amritsar Chess Club receives personalized guidance, a supportive learning environment, and the opportunity to unlock their full potential—both on the chessboard and in life."
               </p>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}