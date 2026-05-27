"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Brain, Scale, Lightbulb } from "lucide-react"

const benefits = [
  {
    title: "Improves Concentration",
    desc: "Enhances focus and attention span through deep calculation.",
    icon: Target,
    color: "#8B5CF6", // Purple
    image: "/benefits/brain-3d.png" // Use 3D assets if available or Lucide
  },
  {
    title: "Boosts IQ & Memory",
    desc: "Strengthens memory and significantly improves cognitive IQ levels.",
    icon: Brain,
    color: "#F59E0B", // Amber/Orange
    image: "/benefits/iq-3d.png"
  },
  {
    title: "Strategic Thinking",
    desc: "Encourages planning, foresight, and smart thinking in daily life.",
    icon: Lightbulb, // Representing ideas/strategy
    color: "#10B981", // Green
    image: "/benefits/strategy-3d.png"
  },
  {
    title: "Better Decision Making",
    desc: "Helps in making calm, logical and confident decisions under pressure.",
    icon: Scale,
    color: "#3B82F6", // Blue
    image: "/benefits/scales-3d.png"
  }
]

export default function BenefitsSection() {
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-orange-500" />
            <span className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: orange }}>
              Benefits Of
            </span>
            <div className="h-px w-12 bg-orange-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tighter mb-6"
          >
            <span style={{ color: navy }}>LEARNING</span> <span style={{ color: orange }}>CHESS</span>
          </motion.h2>

          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 font-medium text-lg max-w-xl mx-auto"
          >
            Chess is more than a game – it builds a stronger mind for life.
          </motion.p>
        </div>

       {/* BENEFIT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              // overflow-visible is essential so the badge can hang off the top
              className="relative group h-full overflow-visible mt-8"
            >
              {/* THE CARD CONTAINER */}
              <div className="relative bg-white rounded-[40px] p-8 pt-16 h-full flex flex-col items-center text-center border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
                
                {/* 1. THE TOP ACCENT LINE (Follows card curve) */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2.5 rounded-t-[40px] z-10" 
                  style={{ backgroundColor: benefit.color }}
                />

                {/* 2. THE HALF-ICON BADGE (The cutout effect) */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-20 shadow-lg border-[6px] border-white transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: benefit.color }}
                >
                  <benefit.icon className="text-white w-6 h-6" strokeWidth={3} />
                </div>

                {/* 3. LARGE FADED ILLUSTRATION (Centered) */}
                <div className={`mb-8 w-28 h-28 flex items-center justify-center rounded-full transition-all duration-700 ${benefit.bgColor}`}>
                  <benefit.icon 
                    className="w-14 h-14 transition-transform duration-700 group-hover:scale-110" 
                    style={{ color: benefit.color, opacity: 0.95 }} 
                  />
                </div>

                {/* 4. TEXT CONTENT */}
                <h3 className="text-xl md:text-2xl font-black mb-4 tracking-tight text-[#12123D]">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

       {/* BOTTOM CHESS PIECES VISUAL - FIXED CLIPPING */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full -mt-30 flex justify-center items-end overflow-visible"
        >
          {/* 
              - Removed fixed h-96 
              - Changed to object-contain to prevent cutting the King's crown
              - Added max-h to keep it reasonable
          */}
          <img 
            src="/top.png" 
            alt="Amritsar Chess Club Pieces" 
            className="w-full max-w-2xl h-auto max-h-[500px] object-contain object-bottom transition-all duration-700"
          />
          
        </motion.div>
      </div>
    </section>
  )
}