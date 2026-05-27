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
    description: "A step-by-step learning path designed for all levels — from beginner to advanced. Concepts are easy to understand and build strong foundations.",
    icon: ClipboardList,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Puzzle-Based Learning",
    description: "Daily puzzles, tactical challenges and brain teasers to improve pattern recognition, calculation and decision making skills.",
    icon: Puzzle,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Game Analysis",
    description: "In-depth analysis of games to identify mistakes, strengths and improvement areas. We help students understand the 'why' behind every move.",
    icon: Search,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Personalized Feedback",
    description: "1-on-1 feedback and guidance tailored to each student's unique playing style, strengths and goals for faster progress.",
    icon: UserCheck,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=500&auto=format&fit=crop"
  }
]

export default function TeachingMethodology() {
  return (
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT COLUMN: TEXT & CIRCULAR DIAGRAM */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <Sparkles size={18} style={{ color: orange }} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: orange }}>Our Teaching Methodology</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#12123D] leading-tight">
                How We Turn <br /> Learners into <span style={{ color: orange }}>Thinkers</span>
              </h2>
              <p className="mt-6 text-slate-500 font-medium">
                Our unique methodology is built to make learning chess engaging, effective and result-driven.
              </p>
            </div>

            {/* Circular Diagram Container */}
            <div className="relative w-full aspect-square max-w-[400px] mx-auto py-10">
              {/* Central King/Logo */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                 <div className="w-32 h-32 rounded-full bg-white shadow-2xl flex items-center justify-center p-6 border border-slate-50">
                    <img src="/king1.png" alt="Chess King" className="w-full h-auto opacity-90" />
                 </div>
              </div>

              {/* Orbit Path */}
              <div className="absolute inset-0 border-2 border-dashed border-slate-100 rounded-full" />
              
              {/* Process Nodes */}
              {[
                { label: "Learn", sub: "Strong concepts", icon: BookOpen, pos: "top-0 left-0", color: "text-blue-600" },
                { label: "Practice", sub: "Regular puzzles", icon: Puzzle, pos: "top-0 right-0", color: "text-emerald-600" },
                { label: "Improve", sub: "Feedback loop", icon: Trophy, pos: "bottom-0 left-0", color: "text-orange-500" },
                { label: "Analyze", sub: "Understand games", icon: Search, pos: "bottom-0 right-0", color: "text-purple-600" }
              ].map((node, i) => (
                <div key={i} className={`absolute ${node.pos} flex flex-col items-center group`}>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white shadow-lg border border-slate-50 flex items-center justify-center transition-all duration-300"
                  >
                    <node.icon className={node.color} size={28} />
                  </motion.div>
                  <div className="mt-3 text-center">
                    <p className="text-[10px] font-black text-[#12123D] uppercase tracking-wider">{node.label}</p>
                    <p className="text-[9px] text-slate-400 font-bold">{node.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-slate-50 p-10 rounded-[2.5rem] relative"
            >
              <Quote className="absolute top-6 left-6 opacity-10" style={{ color: orange }} size={60} />
              <p className="relative z-10 text-xl font-serif italic text-slate-700 leading-relaxed">
                "We don't just teach chess moves, we build minds that can win in life."
              </p>
            </motion.div>
          </div>

          {/* MIDDLE COLUMN: STEP NUMBERS */}
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
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                style={{ borderBottom: i === 3 ? `6px solid ${orange}` : "none" }}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Icon & Text */}
                  <div className="flex-1 flex gap-6">
                    <div className={`w-16 h-16 shrink-0 rounded-[1.25rem] ${step.iconBg} flex items-center justify-center`}>
                      <step.icon className={step.iconColor} size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-[#12123D] mb-2">{step.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {/* Image side */}
                  <div className="w-full md:w-40 h-40 rounded-3xl overflow-hidden shrink-0 border-4 border-slate-50">
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
        <div className="mt-20 bg-[#12123D] rounded-[3rem] p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Student-Centric Approach", color: "text-blue-400" },
              { icon: Target, label: "Focus on Concepts Not Just Moves", color: "text-emerald-400" },
              { icon: Trophy, label: "Real Results Proven by Performance", color: "text-purple-400" },
              { icon: Sparkles, label: "Fun, Engaging & Interactive Learning", color: "text-orange-400" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-r border-white/10 last:border-none">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shadow-sm">
                  <item.icon className={item.color} size={22} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
        </div>

      </div>
    </section>
  )
}