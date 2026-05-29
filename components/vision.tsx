"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Eye, Rocket } from "lucide-react"

const navy = "#12123D"
const orange = "#FF6B00"

export default function MissionVision() {
  return (
    <section className="py-16 md:py-24 bg-white px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
              The Foundation
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-serif italic text-slate-900 leading-tight">
            Our Purpose & <span style={{ color: orange }}>Promise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* MISSION CARD (Navy) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden shadow-2xl flex flex-col h-full"
            style={{ backgroundColor: navy }}
          >
            {/* Background Decorative Icon - Fixed TS Error with className */}
            <Target 
              className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700 w-48 h-48 md:w-80 md:h-80" 
            />

            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 md:mb-8 border border-white/20">
                <Target className="w-7 h-7 md:w-8 md:h-8" style={{ color: orange }} />
              </div>

              <h3 className="text-2xl md:text-3xl font-serif italic mb-4 md:mb-6">Our Mission</h3>
              
              <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed mb-6 md:mb-8">
                To provide a <span className="text-white font-medium">world-class strategic ecosystem</span> in Amritsar where students master the board through logic, discipline, and passion. We are dedicated to providing a structured roadmap from the first move to the international stage.
              </p>

              <ul className="space-y-3 md:space-y-4">
                {[
                  "Structured FIDE-based curriculum",
                  "Personalized mentorship for all ages",
                  "Building resilience through competition"
                ].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-3 text-xs md:text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 md:mt-0 flex-shrink-0" style={{ backgroundColor: orange }} />
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
            className="relative group p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden shadow-2xl flex flex-col h-full"
            style={{ backgroundColor: orange }}
          >
            {/* Background Decorative Icon */}
            <Eye 
              className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700 w-48 h-48 md:w-80 md:h-80" 
            />

            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black/10 flex items-center justify-center mb-6 md:mb-8 border border-black/10">
                <Eye className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>

              <h3 className="text-2xl md:text-3xl font-serif italic mb-4 md:mb-6">Our Vision</h3>
              
              <p className="text-base md:text-lg text-white/90 font-light leading-relaxed mb-6 md:mb-8">
                To establish Amritsar as a <span className="text-white font-medium">global hub for chess excellence</span>. We envision a future where our students carry mental toughness into every facet of life—producing not just Grandmasters, but the next generation of visionary leaders.
              </p>

              <ul className="space-y-3 md:space-y-4">
                {[
                  "Creating 100+ International Rated players",
                  "Fostering a lifelong love for strategy",
                  "Produce national & global champions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-3 text-xs md:text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 md:mt-0 bg-white flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM TAGLINE */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 md:gap-4 p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100">
             <Rocket className="w-5 h-5" style={{ color: orange }} />
             <p className="text-[10px] sm:text-sm font-black text-slate-600 tracking-widest uppercase text-center">
               Your Move to Greatness Starts Here.
             </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}