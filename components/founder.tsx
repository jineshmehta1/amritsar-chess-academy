"use client"

import React from "react"
import { motion } from "framer-motion"
import { Award, Quote, Instagram, Globe, ShieldCheck, Target, GraduationCap, Users } from "lucide-react"

const navy = "#12123D"
const orange = "#FF6B00"

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white px-4 md:px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-slate-50/50 -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- FOUNDER SECTION (SHUBHAM TRIKHA) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center mb-24">
          
          {/* IMAGE SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative px-4 md:px-0"
          >
            <div className="relative z-10 rounded-tr-[60px] md:rounded-tr-[100px] rounded-bl-[60px] md:rounded-bl-[100px] overflow-hidden border-[8px] md:border-[16px] border-white shadow-2xl aspect-[4/5]">
              <img 
                src="/shubham.jpeg" 
                alt="Shubham Trikha - Founder"
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 w-full h-full rounded-tr-[60px] md:rounded-tr-[100px] rounded-bl-[60px] md:rounded-bl-[100px] -z-0 opacity-10"
              style={{ backgroundColor: orange }}
            />

            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -left-2 md:-bottom-4 md:-left-4 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl z-20 flex items-center gap-3 md:gap-4 border-b-4"
              style={{ borderBottomColor: orange }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: navy }}>
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="text-sm md:text-base font-black uppercase leading-tight" style={{ color: navy }}>FIDE Certified</div>
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">Developmental Instructor</div>
              </div>
            </motion.div>
          </motion.div>

          {/* TEXT SIDE */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                <span className="h-[2px] w-8" style={{ backgroundColor: orange }} />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Founder & Head Coach</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-center lg:text-left" style={{ color: navy }}>
                Shubham <span style={{ color: orange }}>Trikha.</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 text-slate-600 font-medium leading-relaxed text-base md:text-lg text-center lg:text-left px-2 md:px-0"
            >
              <p>
                As the Founder of <span className="text-slate-900 font-bold">Amritsar Chess Club</span>, Shubham is a FIDE-rated player and a certified 
                <span style={{ color: navy }} className="font-bold"> FIDE Developmental Instructor</span> by the FIDE Trainers' Commission.
              </p>
              <p>
                His coaching philosophy focuses on building strong fundamentals, improving calculation skills, and developing strategic thinking, while ensuring chess remains an engaging tool for academic and personal growth.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-l-[6px] md:border-l-8 relative group mx-2 md:mx-0"
              style={{ borderLeftColor: orange }}
            >
              <Quote className="absolute top-4 right-4 opacity-10 group-hover:rotate-12 transition-transform w-8 h-8 md:w-10 md:h-10" style={{ color: orange }} />
              <p className="text-lg md:text-xl font-serif italic text-slate-800 leading-relaxed relative z-10">
                "We don't just teach moves; we cultivate the discipline, patience, and 
                strategic foresight required for life beyond the 64 squares."
              </p>
            </motion.div>
          </div>
        </div>

        {/* --- COACHES SECTION (YOGESH & KUNAL) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* COACH CARD 1: YOGESH */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row bg-[#fafafa] rounded-[2rem] overflow-hidden border border-slate-100 group hover:shadow-2xl transition-all duration-500"
          >
            <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden">
              <img 
                src="/yogesh.jpeg" 
                alt="Yogesh Sharma"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="sm:w-3/5 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: navy }}>Yogesh Sharma</h3>
                  <Target size={20} style={{ color: orange }} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: orange }}>Chess Coach</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Expert in opening principles and tactical patterns. Yogesh works closely with students to strengthen analytical thinking and competitive mindset.
                </p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-tighter text-slate-400 border-t pt-4">
                <span className="flex items-center gap-1"><GraduationCap size={14} /> Positional Play</span>
                <span className="flex items-center gap-1"><Award size={14} /> Endgame Tech</span>
              </div>
            </div>
          </motion.div>

          {/* COACH CARD 2: KUNAL */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row bg-[#fafafa] rounded-[2rem] overflow-hidden border border-slate-100 group hover:shadow-2xl transition-all duration-500"
          >
            <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden">
              <img 
                src="/kunal.jpeg" 
                alt="Kunal Sharma"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="sm:w-3/5 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: navy }}>Kunal Sharma</h3>
                  <Users size={20} style={{ color: orange }} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: orange }}>Chess Coach</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Dedicated to young learners and aspiring players. Kunal focuses on developing board vision, calculation, and practical problem-solving skills.
                </p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-tighter text-slate-400 border-t pt-4">
                <span className="flex items-center gap-1"><Target size={14} /> Calculation</span>
                <span className="flex items-center gap-1"><Globe size={14} /> Decision Making</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default TeamSection;