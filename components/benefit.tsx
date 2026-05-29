"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Brain, Scale, Lightbulb } from "lucide-react"

const benefits = [
  {
    title: "Improves Concentration",
    desc: "Enhances focus and attention span through deep calculation.",
    icon: Target,
    color: "#8B5CF6", 
    bgColor: "bg-purple-50",
  },
  {
    title: "Boosts IQ & Memory",
    desc: "Strengthens memory and significantly improves cognitive IQ levels.",
    icon: Brain,
    color: "#F59E0B", 
    bgColor: "bg-amber-50",
  },
  {
    title: "Strategic Thinking",
    desc: "Encourages planning, foresight, and smart thinking in daily life.",
    icon: Lightbulb, 
    color: "#10B981", 
    bgColor: "bg-emerald-50",
  },
  {
    title: "Better Decision Making",
    desc: "Helps in making calm, logical and confident decisions under pressure.",
    icon: Scale,
    color: "#3B82F6", 
    bgColor: "bg-blue-50",
  }
]

export default function BenefitsSection() {
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <section className="py-16 md:py-24 bg-white px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 md:gap-4 mb-4"
          >
            <div className="h-px w-8 md:w-12 bg-orange-500" />
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em]" style={{ color: orange }}>
              Benefits Of
            </span>
            <div className="h-px w-8 md:w-12 bg-orange-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tighter mb-4 md:mb-6"
          >
            <span style={{ color: navy }}>LEARNING</span> <span style={{ color: orange }}>CHESS</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium text-base md:text-lg max-w-xl mx-auto px-4"
          >
            Chess is more than a game – it builds a stronger mind for life.
          </motion.p>
        </div>

       {/* BENEFIT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-6 md:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group h-full overflow-visible mt-4 md:mt-8"
            >
              {/* THE CARD CONTAINER */}
              <div className="relative bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 pt-16 h-full flex flex-col items-center text-center border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
                
                {/* 1. THE TOP ACCENT LINE */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2 rounded-t-[32px] md:rounded-t-[40px] z-10" 
                  style={{ backgroundColor: benefit.color }}
                />

                {/* 2. THE HALF-ICON BADGE */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-20 shadow-lg border-[4px] md:border-[6px] border-white transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: benefit.color }}
                >
                  <benefit.icon className="text-white w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                </div>

                {/* 3. LARGE FADED ILLUSTRATION */}
                <div className={`mb-6 md:mb-8 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full transition-all duration-700 ${benefit.bgColor}`}>
                  <benefit.icon 
                    className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-700 group-hover:scale-110" 
                    style={{ color: benefit.color, opacity: 0.95 }} 
                  />
                </div>

                {/* 4. TEXT CONTENT */}
                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight text-[#12123D]">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-500 text-sm font-medium leading-relaxed px-1">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

       {/* BOTTOM CHESS PIECES VISUAL */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full mt-12 md:mt-20 flex justify-center items-end"
        >
          <img 
            src="/top.png" 
            alt="Amritsar Chess Club Pieces" 
            className="w-full max-w-lg md:max-w-2xl h-auto max-h-[300px] md:max-h-[500px] object-contain object-bottom"
          />
        </motion.div>
      </div>
    </section>
  )
}