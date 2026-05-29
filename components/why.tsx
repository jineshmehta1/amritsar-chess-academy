"use client"

import React from "react"
import { motion } from "framer-motion"

const reasons = [
  {
    title: "Expert Masters",
    image: "/master.gif", 
    description: "Our trainers are FIDE-rated professionals who specialize in child psychology and elite strategy."
  },
  {
    title: "Progress Reports",
    image: "/report.gif",
    description: "Detailed monthly performance tracking so parents can see the growth in logic and IQ."
  },
  {
    title: "Safe Environment",
    image: "/memory.gif",
    description: "A premium, focused, and secure sanctuary designed to foster deep concentration and joy."
  },
  {
    title: "Life Skills",
    image: "/focus.gif",
    description: "Beyond the board, we teach patience, discipline, and how to handle pressure with grace."
  },
  {
    title: "Global Standards",
    image: "/global.gif",
    description: "Following an international curriculum that prepares students for national and global arenas."
  },
  {
    title: "Time Flexibility",
    image: "/time.gif",
    description: "Convenient timing for school-goers, ensuring passion and academics go hand in hand."
  }
]

export default function WhyParentsChooseUs() {
  const navy = "#12123D"
  const orange = "#FF6B00"
  const elitePurple = "#7C3AED"

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-50 border border-purple-100 text-[#7C3AED] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]"
          >
            Club Excellence
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter leading-tight px-2"
          >
            <span style={{ color: navy }}>Why Parents Choose</span>{" "}
            <br className="hidden sm:block md:hidden" />
            <span style={{ color: orange }}> Amritsar Chess?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto px-4"
          >
            We provide a world-class foundation for young minds to excel both on and off the board.
          </motion.p>
        </div>

        {/* RESPONSIVE GRID: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_10px_40px_rgba(18,18,61,0.03)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.1)] transition-all duration-500 group flex flex-col items-center text-center"
            >
              {/* IMAGE BOX */}
              <div className="relative w-full aspect-square max-w-[100px] sm:max-w-[120px] md:max-w-[160px] mb-6 md:mb-8">
                {/* Decorative background circle */}
                <div 
                  className="absolute inset-0 rounded-full scale-90 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"
                  style={{ backgroundColor: elitePurple }}
                />
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="relative z-10 w-full h-full object-contain transform-gpu transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                />
              </div>

              {/* HEADING */}
              <h3 
                className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight"
                style={{ color: elitePurple }}
              >
                {item.title}
              </h3>
              
              {/* DESCRIPTION */}
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium px-2">
                {item.description}
              </p>

              {/* SUBTLE INDICATOR */}
              <div 
                className="w-8 h-1 mt-6 rounded-full opacity-20 transition-all duration-500 group-hover:w-16 group-hover:opacity-100"
                style={{ backgroundColor: elitePurple }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}