"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Puzzle, 
  Search, 
  UserCheck, 
  ClipboardList, 
  Target, 
  Trophy, 
  Sparkles,
  Quote,
  Users
} from "lucide-react"

const navy = "#12123D"
const orange = "#FF6B00"

const steps = [
  {
    id: "01",
    title: "Structured Curriculum",
    description: "A step-by-step learning path designed for all levels — from beginner to advanced. Concepts are easy to understand.",
    icon: ClipboardList,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Puzzle-Based Learning",
    description: "Daily puzzles, tactical challenges and brain teasers to improve pattern recognition and decision making skills.",
    icon: Puzzle,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Game Analysis",
    description: "In-depth analysis of games to identify mistakes and strengths. We help students understand the 'why' behind every move.",
    icon: Search,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Personalized Feedback",
    description: "1-on-1 feedback and guidance tailored to each student's unique playing style and goals for faster progress.",
    icon: UserCheck,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=500&auto=format&fit=crop"
  }
]

export default function TeachingMethodology() {
  return (
    <section className="py-16 md:py-24 bg-white px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: TEXT & CIRCULAR DIAGRAM */}
          <div className="lg:col-span-5 flex flex-col space-y-10 md:space-y-12">
            <div className="text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-4"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" style={{ color: orange }} />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: orange }}>Our Teaching Methodology</span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#12123D] leading-tight px-2 md:px-0">
                How We Turn <br className="hidden md:block" /> Learners into <span style={{ color: orange }}>Thinkers</span>
              </h2>
              <p className="mt-4 md:mt-6 text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto lg:mx-0">
                Our unique methodology is built to make learning chess engaging, effective and result-driven.
              </p>
            </div>

            {/* Circular Diagram Container - Scaled for mobile */}
            <div className="relative w-full aspect-square max-w-[300px] md:max-w-[400px] mx-auto py-8 md:py-10">
              {/* Central King/Logo */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-2xl flex items-center justify-center p-4 md:p-6 border border-slate-50">
                    <img src="/king1.png" alt="Chess King" className="w-full h-auto opacity-90" />
                 </div>
              </div>

              {/* Orbit Path */}
              <div className="absolute inset-0 border-2 border-dashed border-slate-100 rounded-full" />
              
              {/* Process Nodes */}
              {[
                { label: "Learn", sub: "Concepts", icon: BookOpen, pos: "top-0 left-0", color: "text-blue-600" },
                { label: "Practice", sub: "Puzzles", icon: Puzzle, pos: "top-0 right-0", color: "text-emerald-600" },
                { label: "Improve", sub: "Feedback", icon: Trophy, pos: "bottom-0 left-0", color: "text-orange-500" },
                { label: "Analyze", sub: "Games", icon: Search, pos: "bottom-0 right-0", color: "text-purple-600" }
              ].map((node, i) => (
                <div key={i} className={`absolute ${node.pos} flex flex-col items-center group`}>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg border border-slate-50 flex items-center justify-center transition-all duration-300"
                  >
                    <node.icon className={`${node.color} w-5 h-5 md:w-7 md:h-7`} />
                  </motion.div>
                  <div className="mt-2 md:mt-3 text-center">
                    <p className="text-[8px] md:text-[10px] font-black text-[#12123D] uppercase tracking-wider">{node.label}</p>
                    <p className="text-[7px] md:text-[9px] text-slate-400 font-bold">{node.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative mx-2"
            >
              <Quote className="absolute top-4 left-4 md:top-6 md:left-6 opacity-10 w-10 h-10 md:w-14 md:h-14" style={{ color: orange }} />
              <p className="relative z-10 text-lg md:text-xl font-serif italic text-slate-700 leading-relaxed text-center md:text-left">
                "We don't just teach chess moves, we build minds that can win in life."
              </p>
            </motion.div>
          </div>

          {/* MIDDLE COLUMN: STEP NUMBERS (Hidden on small screens) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center relative">
             <div className="absolute top-0 bottom-0 w-[2px] border-l-2 border-dashed border-slate-200" />
             <div className="flex flex-col justify-between h-full py-14 relative z-10">
               {steps.map((step) => (
                 <div key={step.id} className="w-12 h-12 rounded-full bg-[#12123D] text-white flex items-center justify-center font-black text-sm border-4 border-white shadow-xl">
                   {step.id}
                 </div>
               ))}
             </div>
          </div>

          {/* RIGHT COLUMN: STEP CARDS */}
          <div className="lg:col-span-6 space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                style={{ borderBottom: i === 3 ? `6px solid ${orange}` : "none" }}
              >
                {/* Mobile Step ID Badge */}
                <div className="lg:hidden w-8 h-8 rounded-full bg-[#12123D] text-white flex items-center justify-center text-[10px] font-black mb-4">
                    {step.id}
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">
                  {/* Icon & Text */}
                  <div className="flex-1 flex flex-col sm:flex-row gap-4 md:gap-6 text-center sm:text-left items-center sm:items-start">
                    <div className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-[1.25rem] ${step.iconBg} flex items-center justify-center`}>
                      <step.icon className={`${step.iconColor} w-7 h-7 md:w-8 md:h-8`} />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black text-[#12123D] mb-2">{step.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {/* Image side */}
                  <div className="w-full sm:w-32 md:w-40 h-40 rounded-2xl md:rounded-3xl overflow-hidden shrink-0 border-4 border-slate-50">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM HORIZONTAL BAR */}
        <div className="mt-12 md:mt-20 bg-[#12123D] rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Users, label: "Student-Centric Approach", color: "text-blue-400" },
              { icon: Target, label: "Focus on Concepts", color: "text-emerald-400" },
              { icon: Trophy, label: "Real Performance", color: "text-purple-400" },
              { icon: Sparkles, label: "Fun & Interactive", color: "text-orange-400" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-white/10 last:border-none pb-4 lg:pb-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center shadow-sm flex-shrink-0">
                  <item.icon className={`${item.color} w-5 h-5 md:w-6 md:h-6`} />
                </div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
        </div>

      </div>
    </section>
  )
}