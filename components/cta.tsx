"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Calendar, Phone, User, Baby, Send } from "lucide-react"

export default function DemoCTA() {
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* THE COMPACT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(18,18,61,0.2)]"
          style={{ backgroundColor: navy }}
        >
          
          {/* MODERN DOT GRID OVERLAY */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '24px 24px' 
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12 p-8 md:p-16">
            
            {/* LEFT: CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Sparkles className="w-3.5 h-3.5" style={{ color: orange }} />
                Limited Slots Available
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
                Book Your <span style={{ color: orange }}>Free Demo</span> <br /> 
                Class Today
              </h2>
              
              <p className="text-slate-400 font-medium mb-8 max-w-sm">
                Join Amritsar's most prestigious chess community. Start your journey with a 1-on-1 evaluation session.
              </p>

              <div className="flex items-center gap-4 text-white/60 text-sm font-bold">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#12123D] bg-slate-400 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="student" />
                      </div>
                    ))}
                 </div>
                 <span>Joined by 500+ students</span>
              </div>
            </div>

            {/* RIGHT: COMPACT FORM */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                
                {/* NAME FIELD */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Student Name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* PHONE FIELD */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="tel" 
                      placeholder="Phone"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none"
                    />
                  </div>

                  {/* AGE FIELD */}
                  <div className="relative">
                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="number" 
                      placeholder="Age"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <Button 
                  className="w-full py-8 rounded-xl font-black text-xs tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                  style={{ backgroundColor: orange, color: '#fff' }}
                >
                  SCHEDULE NOW <Send className="w-4 h-4" />
                </Button>

                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
                  No credit card required • Instant confirmation
                </p>
              </form>
            </div>

          </div>

          {/* BACKGROUND DECOR */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" style={{ backgroundColor: `${orange}20` }} />

        </motion.div>
      </div>
    </section>
  )
}