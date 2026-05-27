"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Trophy, 
  Users, 
  Medal, 
  Smile, 
  Target, 
  Lightbulb, 
  ChevronRight,
  TrendingUp
} from "lucide-react"

const navy = "#12123D"
const gold = "#B8860B" // More sophisticated gold like the image

export default function AboutUsSection() {
  const journey = [
    { year: "2018", text: "A small beginning with big dreams." },
    { year: "2020", text: "Grew into a trusted club with 100+ students." },
    { year: "2022", text: "Our students started winning at district & state levels." },
    { year: "2024", text: "Continuing to build champions and confident thinkers." },
  ]

  const stats = [
    { icon: Users, value: "500+", label: "Students Trained and Growing" },
    { icon: Trophy, value: "100+", label: "Tournaments Participated" },
    { icon: Medal, value: "50+", label: "Winners & Champions" },
    { icon: Smile, value: "100%", label: "Focused on Building Better Minds" },
  ]

  return (
    <section className="py-20 bg-white overflow-hidden px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: HEADING & CURVED IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-amber-600">
              <TrendingUp size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Our Story</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-slate-900">
              A Passion That <br />
              Became a <span style={{ color: gold }}>Purpose</span>
            </h2>

            <div className="w-20 h-1 bg-amber-600 rounded-full" />

            <div className="space-y-4 text-slate-600 leading-relaxed font-light max-w-lg">
              <p>
                Amritsar Chess Club was born out of a simple belief – 
                that every child has the potential to think, create and lead. 
                Chess is more than a game; it's a teacher for life.
              </p>
              <p>
                We started this journey with a handful of students and a big dream – 
                to build a strong chess culture in Amritsar and shape young minds 
                into confident, focused and future-ready individuals.
              </p>
            </div>
          </motion.div>

          {/* Large Curved Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-tl-[100px] rounded-br-[100px] rounded-tr-[40px] rounded-bl-[40px] overflow-hidden border-[12px] border-slate-50 shadow-2xl aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop" 
                alt="Coach with Student"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Gold Circle behind */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-50 rounded-full -z-0" />
          </motion.div>
        </div>

        {/* MIDDLE SECTION: JOURNEY & PROBLEM/SOLUTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Journey Card (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-slate-50 p-10 rounded-[2rem] relative overflow-hidden shadow-sm"
          >
             <div className="flex items-center gap-2 mb-8">
               <Target className="text-amber-600" size={20} />
               <h4 className="text-sm font-black uppercase tracking-widest text-amber-800">Our Journey</h4>
             </div>

             <div className="space-y-8 relative z-10">
               {journey.map((item, i) => (
                 <div key={i} className="flex gap-6 items-start">
                   <div className="flex flex-col items-center">
                     <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                     {i !== journey.length - 1 && <div className="w-[1px] h-12 bg-amber-200 mt-2" />}
                   </div>
                   <div>
                     <div className="font-black text-slate-900 mb-1">{item.year}</div>
                     <div className="text-sm text-slate-500 font-medium">{item.text}</div>
                   </div>
                 </div>
               ))}
             </div>

             {/* Faded background mountain/chess illustration hint */}
             <div className="absolute bottom-4 right-4 opacity-10">
               <Trophy size={150} strokeWidth={1} />
             </div>
          </motion.div>

          {/* Problem & Solution (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
             {/* Problem */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="flex gap-6"
             >
               <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                 <span className="text-orange-600 font-bold text-xl">!</span>
               </div>
               <div>
                 <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">The Problem We Saw</h4>
                 <p className="text-slate-500 font-medium max-w-md">
                   Kids today are surrounded by distractions – screens, games and short-term pleasures. 
                   We saw brilliant minds wasting time, lacking focus and real direction.
                 </p>
               </div>
             </motion.div>

             {/* Solution */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-amber-50 p-8 rounded-2xl flex gap-6 border-l-4 border-amber-500"
             >
               <div className="w-12 h-12 flex items-center justify-center shrink-0">
                 <Lightbulb className="text-amber-600" size={32} />
               </div>
               <div>
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-700 mb-2">Our Solution</h4>
                 <p className="text-slate-700 font-medium italic">
                   "We use chess to channel their energy, improve focus, build discipline 
                   and develop skills that last a lifetime."
                 </p>
               </div>
             </motion.div>
          </div>
        </div>


      </div>
    </section>
  )
}