"use client"

import React from "react"
import { motion } from "framer-motion"
import { Award, Quote, Linkedin, Instagram, ExternalLink, ShieldCheck } from "lucide-react"

const navy = "#12123D"
const orange = "#FF6B00"

export default function FoundersSection() {
  return (
    <section className="py-24 bg-white px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* IMAGE SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            {/* The Main Image with Curved Corners matching the About style */}
            <div className="relative z-10 rounded-tr-[100px] rounded-bl-[100px] overflow-hidden border-[16px] border-white shadow-2xl aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                alt="Founder of Amritsar Chess Club"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Orange Decorative Block behind image */}
            <div 
              className="absolute -bottom-6 -right-6 w-full h-full rounded-tr-[100px] rounded-bl-[100px] -z-0 opacity-10"
              style={{ backgroundColor: orange }}
            />

            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -left-4 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border-b-4"
              style={{ borderBottomColor: orange }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: navy }}>
                <Award size={24} />
              </div>
              <div>
                <div className="text-2xl font-black" style={{ color: navy }}>14+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Years of Coaching</div>
              </div>
            </motion.div>
          </motion.div>

          {/* TEXT SIDE */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[2px] w-8" style={{ backgroundColor: orange }} />
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">The Visionary</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight" style={{ color: navy }}>
                Meet Our <span style={{ color: orange }}>Founder.</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg"
            >
              <p>
                Driven by a lifelong passion for strategy and logic, our founder established the 
                <span className="text-slate-900 font-bold"> Amritsar Chess Club </span> 
                with a singular mission: to bring professional, world-class chess mentorship to the heart of Punjab.
              </p>
              <p>
                As a FIDE-rated player and certified coach, he has mentored over 1,000+ students, 
                turning curious beginners into state and national champions. His philosophy focuses 
                not just on "winning games," but on building the mental resilience required for life.
              </p>
            </motion.div>

            {/* Quote Plate */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-50 p-8 rounded-[2rem] border-l-8 relative group"
              style={{ borderLeftColor: orange }}
            >
              <Quote className="absolute top-4 right-4 opacity-10 group-hover:rotate-12 transition-transform" style={{ color: orange }} size={40} />
              <p className="text-xl font-serif italic text-slate-800 leading-relaxed relative z-10">
                "In chess, as in life, the best moves are those born from patience, 
                foresight, and the courage to take a calculated risk. We aren't just 
                moving pieces; we are moving futures."
              </p>
              <div className="mt-4 font-black uppercase tracking-widest text-xs" style={{ color: navy }}>
                — Chief Coach & Director
              </div>
            </motion.div>

            {/* Socials & Credentials */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <ShieldCheck style={{ color: orange }} size={20} />
                <span className="text-xs font-black uppercase tracking-widest text-slate-900">FIDE Certified Master</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-4">
                {[Linkedin, Instagram, ExternalLink].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3, color: orange }}
                    className="text-slate-400 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}